import unittest

import torch

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
        collocations = torch.Tensor([
            [3, 3],
            [3, 4],
            [3, 5],
            [3, 6],
        ])
        self.assertEqual(
            tree.find_path(collocations).tolist(),
            [
                [0, 1, 3],
                [0, 1, 4],
                [0, 2, 5],
                [0, 2, 6],
            ]
        )
        tree = BinaryTree(
            V=list(range(8)),
            n_dims=1
        )
        collocations = torch.Tensor([
            [8, 7],
            [8, 8],
            [8, 9],
            [8, 10],
        ])
        self.assertEqual(
            tree.find_path(collocations).tolist(),
            [
                [0, 1, 3, 7],
                [0, 1, 3, 8],
                [0, 1, 4, 9],
                [0, 1, 4, 10],
            ]
        )

    def test_hierarchical_softmax_forward(self):
        tree = BinaryTree(
            V=list(range(8)),
            n_dims=1
        )

        self.assertGreaterEqual(tree(torch.Tensor([[0, 3]])), 0)
        self.assertLessEqual(tree(torch.Tensor([[0, 3]])), 1)

    def test_forward_minibathed_collocations(self):
        tree = BinaryTree(
            V=list(range(4)),
            n_dims=1
        )
        collocations = [
            [1, 0],
            [1, 2],
            [1, 3],
            [3, 2],
            [3, 1],
        ]
        minibatched_collocations = torch.Tensor(collocations)
        minibatched_probs = tree(minibatched_collocations)
        self.assertTrue(minibatched_probs.shape, torch.Size([3]))

    def test_backward_minibathed_collocations(self):
        tree = BinaryTree(
            V=list(range(4)),
            n_dims=1
        )
        collocations = [
            [1, 0],
            [1, 2],
            [1, 3],
            [3, 2],
            [3, 0],
        ]
        minibatched_collocations = torch.Tensor(collocations)
        minibatched_probs = tree(minibatched_collocations)
        loss = minibatched_probs.log().neg().mean()
        loss.backward()

        for i, node in enumerate(tree.nodes):
            if i in [0, 1, 2, 3, 5, 6]:
                self.assertIsInstance(node[0].weight.grad, torch.Tensor)
            else:
                self.assertTrue(node[0].weight.grad == None)
