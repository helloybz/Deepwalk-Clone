class RandomWalker(object):
    def __init__(self, graph):
        self.graph = graph
        self.traces = list()

    def walk(self, source_idx, num_steps):
        current_node_idx = source_idx
        trace = [current_node_idx]
        for step_count in range(1, num_steps+1):
            current_node_idx = self.graph.get_random_neighbor(current_node_idx)
            if current_node_idx == -1:  # Reaches to an end node.
                break
            trace.append(current_node_idx)

        return trace

    def process(self, walks_per_node, steps_per_walk):
        for node_idx, node_id in enumerate(self.graph.nodes):
            for i in range(walks_per_node):
                trace = self.walk(node_idx, steps_per_walk)
                self.traces.append(trace)
