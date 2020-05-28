import torch
import torch.nn as nn


class BinaryTree(nn.Module):
    def __init__(self, num_nodes_in_graphs, num_dimensions):
        super(BinaryTree, self).__init__()
        self.num_nodes_in_graphs = num_nodes_in_graphs
        self.size = 0
        self.depth = 0
        while True:
            num_children = 2 ** self.depth
            self.size += num_children
            if num_children >= num_nodes_in_graphs:
                break
            self.depth += 1
        self.tree = nn.ModuleList(
            [nn.Linear(num_dimensions, 1, bias=False) for i in range(self.size)])

    def forward(self, collocation):
        center_idx, window_idx = collocation
        path = self.find_path(window_idx)

        center_tree_idx, window_tree_idx = self.convert_into_tree_idx(
            collocation)
        center_embedding = self.tree[center_tree_idx].weight.data

        probability_collocation = 1
        tree_idx = 0
        for direction, d in zip(path, range(self.depth)):
            probability = self.tree[tree_idx](center_embedding).sigmoid()
            probability_collocation = probability.mul(probability_collocation)
            tree_idx = 2 * tree_idx + direction
        return probability_collocation

    def convert_into_tree_idx(self, collocation):
        return [self.graph_node_head + idx for idx in collocation]

    def find_path(self, dst_idx):
        dst_idx += 1
        path = list()
        for d in range(self.depth, 0, -1):
            direction = 1  # choose left child
            if (2 ** (d-1) < dst_idx):
                direction = 2  # No, choose right child
                dst_idx -= (2 ** (d-1))
            path.append(direction)
        return path

    @property
    def graph_node_head(self):
        return sum([2 ** d for d in range(self.depth)])

    def get_node_embeddings(self):
        target_modules = self.tree[self.graph_node_head: self.graph_node_head +
                                   self.num_nodes_in_graphs]
        return torch.stack([module.weight.data.squeeze().cpu() for module in target_modules]).numpy()
