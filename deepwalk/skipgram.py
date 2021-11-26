import numpy as np
import torch
from torch import random
from torch.nn import BCELoss
from torch.optim import SGD
from torch.utils.data import DataLoader
from tqdm import tqdm

from deepwalk.binary_tree import BinaryTree
from deepwalk.random_walker import RandomWalker


class SkipGram(object):
    def __init__(
        self,
        binary_tree:    BinaryTree,
        random_walker:  RandomWalker,
        window_size:    int,
        lr:             float,
        device:         torch.device,
    ) -> None:
        self.binary_tree = binary_tree
        self.criterion = BCELoss()
        self.optimizer = SGD(
            params=self.binary_tree.parameters(),
            lr=lr,
        )
        self.device = device

        self.dataloader = DataLoader(
            dataset=random_walker,
            batch_size=1,
            shuffle=True,
            pin_memory=True,
        )
        self.window_size = window_size
        self.losses = {}

    def train(self):
        self.binary_tree.train()
        self.binary_tree.to(self.device)

        epoch = len(self.losses.keys())
        self.losses[epoch] = list()

        for walk in tqdm(self.dataloader, desc=f'Epoch {epoch:3d} '):
            collocations = self._make_collocations(walk)
            for v_j, u_k in collocations:
                self.optimizer.zero_grad()
                prob_collocation = self.binary_tree(v_j, u_k)
                loss = prob_collocation.add(1e-7).log().neg()
                loss.backward()
                self.optimizer.step()

                self.losses[epoch].append(loss)
        print(f'Epoch {epoch:3d} : Average loss: {(sum(self.losses[epoch])/len(self.losses[epoch])).item():7.3f}')

    def _make_collocations(self, random_walk):
        collocations = list()
        for idx_in_walk, v_j in enumerate(random_walk):
            windowed_vertices = \
                random_walk[max(idx_in_walk-self.window_size, 0): idx_in_walk] + \
                random_walk[idx_in_walk+1:min((idx_in_walk+self.window_size)+1, len(random_walk)-1)]
            for u_k in windowed_vertices:
                collocations.append([v_j, u_k])
        return collocations

    @property
    def loss_history(self):
        result = {}
        for epoch in self.losses.keys():
            result[epoch] = []
            for loss in self.losses[epoch]:
                result[epoch].append(loss.item())
        return result
