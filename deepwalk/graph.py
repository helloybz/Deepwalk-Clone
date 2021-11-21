from pathlib import Path

import torch
from torch.utils.data import Dataset


class Vertex(object):
    def __init__(
        self,
        id_: str or int,
        idx: int,
    ) -> None:
        self.id_ = id_
        self.idx = idx

    def __repr__(self):
        return f'Vertex_{self.id_}'


class Edge(object):
    def __init__(
        self,
        src: Vertex,
        dst: Vertex,
    ) -> None:
        self.src, self.dst = src, dst


class Graph(Dataset):
    def __init__(
        self,
        data_root: Path,
    ) -> None:
        super(Graph, self).__init__()

        try:
            with open(data_root.joinpath("V"), "r") as io:
                self.vertex_ids = io.read().split('\n')
        except FileNotFoundError:
            raise

        # A set of the vertices, V
        self.V = [
            Vertex(
                id_=vertex_id,
                idx=idx,
            )
            for idx, vertex_id
            in enumerate(self.vertex_ids)
        ]

        # A set of the edges, E
        try:
            with open(data_root.joinpath("E"), "r") as io:
                edges = io.read().split("\n")
        except FileNotFoundError:
            raise

        self.E = []
        for edge in edges:
            src_id, dst_id = edge.split(" ")
            self.E.append(
                Edge(
                    src=self.V[self.vertex_ids.index(src_id)],
                    dst=self.V[self.vertex_ids.index(dst_id)],
                )
            )

    def __len__(self):
        return len(self.V)

    def __getitem__(
            self,
            idx: int
    ) -> Vertex:
        return self.V[idx]

    def get_neighbors(
        self,
        v: Vertex,
    ) -> list[Vertex]:
        return [edge.dst for edge in self.E if edge.src == v]
