from pathlib import Path
import unittest

import torch

from deepwalk.binary_tree import BinaryTree
from deepwalk.skipgram import SkipGram
from deepwalk.graph import Graph
from deepwalk.random_walker import RandomWalker


class TestSkipgram(unittest.TestCase):
    def setUp(self):
        self.g = Graph(data_root=Path('./tests/test_dataset'))
        random_walker = RandomWalker(
            graph=self.g,
            steps_per_walk=4
        )
        tree = BinaryTree(
            V=self.g.V,
            n_dims=16
        )
        self.skipgram = SkipGram(
            binary_tree=tree,
            random_walker=random_walker,
            window_size=1,
            lr=0.025,
            device=torch.device('cpu'),
        )

    def test_tracking_loss(self):
        num_epochs = 2
        for epoch in range(num_epochs):
            self.skipgram.train()

        self.assertTrue(hasattr(self.skipgram, "loss_history"))
        self.assertEqual(list(self.skipgram.loss_history.keys()), list(range(num_epochs)))
