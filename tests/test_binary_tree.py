import unittest
from deepwalk import binary_tree
from pathlib import Path

from deepwalk.binary_tree import BinaryTree


class TestBinaryTree(unittest.TestCase):
    def test_build_tree(self):
        test_cases = [
            # (n, depth, size)
            # (1, 0, 1),
            (2, 1, 3),
            (3, 2, 7),
            (4, 2, 7),
            (5, 3, 15),
            (6, 3, 15),
            (7, 3, 15),
            (8, 3, 15),
            (9, 4, 31),
            (16, 4, 31),
        ]

        for n, depth, size in test_cases:
            tree = BinaryTree(
                V=list(range(n)),
                n_dims=1,
            )
            self.assertEqual(tree.depth, depth)
            self.assertEqual(tree.size, size)

    def test_find_path(self):
        tree = BinaryTree(
            V=list(range(4)),
            n_dims=1
        )
        self.assertEqual(tree.find_path_from_root(3), [0, 1, 3])
        self.assertEqual(tree.find_path_from_root(4), [0, 1, 4])
        self.assertEqual(tree.find_path_from_root(5), [0, 2, 5])
        self.assertEqual(tree.find_path_from_root(6), [0, 2, 6])

        tree = BinaryTree(
            V=list(range(8)),
            n_dims=1
        )
        self.assertEqual(tree.find_path_from_root(7), [0, 1, 3, 7])
        self.assertEqual(tree.find_path_from_root(8), [0, 1, 3, 8])
        self.assertEqual(tree.find_path_from_root(9), [0, 1, 4, 9])
        self.assertEqual(tree.find_path_from_root(10), [0, 1, 4, 10])

    def test_hierarchical_softmax_forward(self):
        tree = BinaryTree(
            V=list(range(8)),
            n_dims=1
        )

        self.assertGreaterEqual(tree(0, 3), 0)
        self.assertLessEqual(tree(0, 3), 1)
