import unittest
from pathlib import Path

from deepwalk import Graph, RandomWalker


class TestRandomWalker(unittest.TestCase):
    def setUp(self):
        self.data_root = Path('./tests/test_dataset')

        self.graph = Graph(
            data_root=self.data_root,
        )
        self.random_walker = RandomWalker(
            graph=self.graph,
            steps_per_walk=10,
        )

    def test_generate_a_random_walk_from_end_node(self):
        self.assertEqual(len(self.random_walker[0]), 1)
        self.assertEqual(self.random_walker[0][0], self.graph.V[0].idx)
