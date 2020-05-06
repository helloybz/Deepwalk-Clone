import os
import random

import numpy as np


class Graph(object):
    def __init__(self, config):
        self.nodes = self._make_node_entry(config.input_dir)
        self.A = self._make_adjacency_matrix(self.nodes, config)

    def get_neighbors(self, idx):
        return self.A[1, self.A[0] == idx].tolist()

    def get_random_neighbor(self, idx):
        neighbors = self.get_neighbors(idx)
        how_many = 1
        try:
            return random.sample(neighbors, how_many)[0]
        except ValueError:
            return -1

    @staticmethod
    def _make_node_entry(input_dir):
        node_id_path = os.path.join(input_dir, 'node_ids')

        node_ids = list()

        node_ids_io = open(node_id_path, 'r')
        while True:
            line = node_ids_io.readline()
            if not line:
                break

            node_ids.append(line.strip())
        node_ids_io.close()
        return node_ids

    @staticmethod
    def _make_adjacency_matrix(nodes, config):
        edge_list_path = os.path.join(config.input_dir, 'edgelist')

        A = list()

        with open(edge_list_path) as edge_list_io:
            while True:
                edge = edge_list_io.readline()
                if not edge:
                    break
                src, dst = edge.split()
                A.append([nodes.index(src), nodes.index(dst)])
                if config.undirected:
                    A.append([nodes.index(dst), nodes.index(src)])
        A = np.array(A)
        A = np.ndarray(shape=A.shape, dtype=int, buffer=A).transpose()

        return A
