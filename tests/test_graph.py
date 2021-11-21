import unittest
from pathlib import Path

from deepwalk import Graph
from deepwalk.types import Vertex


class TestGraph(unittest.TestCase):
    def setUp(self):
        self.data_root = Path('./tests/test_dataset')

        self.graph = Graph(
            data_root=self.data_root,
        )

    def test_make_graph_from_data_root(self):

        self.assertTrue(hasattr(self.graph, 'V'))
        self.assertEqual(len(self.graph.V), 34)

        self.assertTrue(hasattr(self.graph, 'E'))
        self.assertEqual(len(self.graph.E), 78)

    def test_graph_getitem(self):
        self.assertTrue(isinstance(self.graph[0], Vertex))
