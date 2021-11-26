import torch
import torch.nn as nn

from .types import VertexSet


class BinaryTree(nn.Module):
    def __init__(
        self,
        V: VertexSet,
        n_dims: int,
    ):
        super(BinaryTree, self).__init__()
        self.num_vertices = len(V)
        self.depth = len(bin(len(V)-1)) - 2
        self.size = (1 << (self.depth+1)) - 1
        self.nodes = nn.ModuleList([
            nn.Sequential(
                nn.Linear(n_dims, 1, bias=False),
                nn.Sigmoid(),
            )
            for i in range(self.size)
        ])

    def forward(
        self,
        collocation:    torch.Tensor
    ):
        offset = (1 << self.depth) - 1
        collocation = collocation.add(offset)
        paths = self.find_path(collocation)
        v_j_idx_in_tree = collocation[:, 0].int()

        x = torch.stack([
            self.nodes[v_j][0].weight.data.clone()
            for v_j in v_j_idx_in_tree
        ])

        probs = []
        for z_v_j, path in zip(x, paths):
            prob = 1
            for j in path:
                prob = prob * self.nodes[j](z_v_j)
            probs.append(prob)

        return torch.stack(probs).squeeze()

    def find_path(
        self,
        collocation: torch.Tensor
    ) -> torch.Tensor:
        '''
        Find a path from the root node to the given target node which is a leaf node of the tree.
        As the tree is supposed to be a perfect tree, preorder search is unnecessary to find the path.
        args:
            tgt_idx: Index of the target node.
        return:
            path: Series of the indices of the nodes in the path.

        '''
        path = collocation.new_zeros([collocation.size(0), 1]).int()
        mask = 2**torch.arange(self.depth+1, device=path.device)
        binary = collocation[:, 1].add(1).unsqueeze(-1).int().bitwise_and(mask).ne(0).int().flip(-1)
        path = torch.cat([path, binary[:, 1:]], dim=-1)
        for i in range(path.size(-1)):
            if i == 0:
                continue
            path[:, i] = (path[:, i-1] << 1) + (path[:, i] + 1)
        return path

    def get_node_embeddings(self):
        embeddings = [
            node[0].weight.data
            for node
            in self.nodes[(1 << self.depth)-1: (1 << self.depth)-1 + self.num_vertices]
        ]
        embeddings = torch.stack(embeddings)
        return embeddings
