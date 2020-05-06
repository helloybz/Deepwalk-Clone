import numpy as np
import torch
from torch.nn import NLLLoss
from torch.optim import SGD
from torch.utils.data import DataLoader


class SkipGram(object):
    def __init__(self, binary_tree, random_walks, window_size, config):
        self.binary_tree = binary_tree
        self.collocations = self.make_collocations(random_walks, window_size)
        self.criterion = NLLLoss()
        self.optimizer = SGD(
            params=self.binary_tree,
            lr=config.lr,
        )

    def train(self):
        self.loader = DataLoader(
            self.collocations,
            shuffle=True,
        )

        for collocation in self.loader:
            prop_collocation = self.binary_tree(collocation)
            loss = criterion(prop_collocation, 1)
            loss.backward()
            optimizer.step()

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
