import numpy as np
import torch
from torch.nn import BCELoss
from torch.optim import SGD
from torch.utils.data import DataLoader


class SkipGram(object):
    def __init__(self, binary_tree, random_walks, window_size, config):
        self.binary_tree = binary_tree
        self.collocations = self.make_collocations(random_walks, window_size)
        self.criterion = BCELoss()
        self.optimizer = SGD(
            params=self.binary_tree.parameters(),
            lr=config.lr,
        )
        self.device = torch.device(f"cuda:{config.gpu}" if config.gpu else 'cpu')

    def train(self):
        self.loader = DataLoader(
            self.collocations,
            shuffle=True,
            pin_memory=True,
        )
        self.binary_tree.to(self.device)
        for collocation in self.loader:
            self.optimizer.zero_grad()
            collocation = [idx.to(self.device, non_blocking=True) for idx in collocation]
            prop_collocation = self.binary_tree(collocation)
            loss = self.criterion(prop_collocation, prop_collocation.new_ones(prop_collocation.shape))
            loss.backward()
            self.optimizer.step()

    @staticmethod
    def make_collocations(random_walks, window_size):
        collocations = list()
        for random_walk in random_walks:
            for i in range(len(random_walk)):
                center_node = random_walk[i]
                nodes_in_window = \
                    random_walk[max(i-window_size, 0): i] + \
                    random_walk[i+1:min((i+window_size)+1, len(random_walk)-1)]
                for node_in_window in nodes_in_window:
                    collocations.append([center_node, node_in_window])
        return collocations
