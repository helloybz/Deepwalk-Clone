import numpy as np
import torch
from torch import random
from torch.nn import BCELoss
from torch.optim import SGD
from torch.utils.data import DataLoader

from deepwalk.binary_tree import BinaryTree
from deepwalk.random_walker import RandomWalker


class SkipGram(object):
    def __init__(
        self,
        binary_tree:    BinaryTree,
        random_walker:  RandomWalker,
        window_size:    int,
        lr:             float,
        batch_size:     int,
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

    def train(self):
        self.binary_tree.train()
        self.binary_tree.to(self.device)

        for walk in self.dataloader:
            collocations = self._make_collocations(walk)
            for v_j, u_k in collocations:
                self.optimizer.zero_grad()
                prob_collocation = self.binary_tree(v_j.idx, u_k.idx)
                loss = prob_collocation.add(1e-4).log().neg()
                loss.backward()
                self.optimizer.step()

    def _make_collocations(self, random_walks):
        collocations = list()
        for random_walk in random_walks:
            for i in range(len(random_walk)):
                v_j = random_walk[i]
                windowed_vertices = \
                    random_walk[max(i-self.window_size, 0): i] + \
                    random_walk[i+1:min((i+self.window_size)+1, len(random_walk)-1)]
                for u_k in windowed_vertices:
                    collocations.append([v_j, u_k])
        return collocations
