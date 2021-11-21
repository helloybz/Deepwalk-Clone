import torch

from .graph import Graph
from .types import Walk, Vertex


class RandomWalker(torch.utils.data.Dataset):
    def __init__(
        self,
        graph: Graph,
        steps_per_walk: int,
        **kwargs
    ) -> None:
        super(RandomWalker, self).__init__()
        self.graph = graph
        self.steps_per_walk = steps_per_walk

    def __getitem__(
            self,
            idx: int
    ) -> Walk:
        root_node = self.graph[idx]
        walk = [root_node]
        for _ in range(self.steps_per_walk):
            u = self._get_random_neighbor(walk[-1])
            if u is None:
                break
            walk.append(self._get_random_neighbor(walk[-1]))
        return [vertex.idx for vertex in walk]

    def __len__(self):
        return len(self.graph)

    def _get_random_neighbor(
            self,
            v: Vertex,
    ) -> Vertex or None:
        U = self.graph.get_neighbors(v)
        if len(U) == 0:
            return None
        random_idx = torch.randint(high=len(U), size=(1,))
        return U[random_idx]
