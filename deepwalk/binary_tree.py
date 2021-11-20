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
        self.depth = len(bin(len(V)-1)) - 2
        self.size = (1 << (self.depth+1)) - 1
        self.nodes = nn.ModuleList([
            nn.Linear(n_dims, 1, bias=False)
            for i in range(self.size)
        ])

    def forward(self, v_j_idx, u_k_idx):
        v_j_idx_in_tree = v_j_idx + (1 << self.depth) - 1
        u_k_idx_in_tree = u_k_idx + (1 << self.depth) - 1
        path = self.find_path_from_root(u_k_idx_in_tree)

        x = self.nodes[v_j_idx_in_tree].weight.clone().data

        prob_of_collocation = 1
        for node_idx in path:
            prob = self.nodes[node_idx](x).sigmoid()
            prob_of_collocation = prob.mul(prob_of_collocation)

        return prob_of_collocation

    def find_path_from_root(
        self,
        tgt_idx: int
    ) -> list[int]:
        '''
        Find a path from the root node to the given target node which is a leaf node of the tree.
        As the tree is supposed to be a perfect tree, preorder search is unnecessary to find the path.
        args:
            tgt_idx: Index of the target node.
        return:
            path: Series of the indices of the nodes in the path.

        '''
        path = [0]
        for direction in bin(tgt_idx+1)[3:]:
            path.append((path[-1] << 1) + (1 if direction == '0' else 2))
        return path


def get_node_embeddings(self):
    target_modules = self.tree[self.graph_node_head: self.graph_node_head +
                               self.num_nodes_in_graphs]
    return torch.stack([module.weight.data.squeeze().cpu() for module in target_modules]).numpy()
