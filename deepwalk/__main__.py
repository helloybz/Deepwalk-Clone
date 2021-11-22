import argparse
from pathlib import Path

import numpy as np
import torch
import yaml

from .binary_tree import BinaryTree
from .graph import Graph
from .random_walker import RandomWalker
from .skipgram import SkipGram


def run(args):

    if args.config_file.absolute().exists():
        with open(args.config_file.absolute(), 'r') as config_io:
            hparams = yaml.load(config_io, Loader=yaml.FullLoader)
    else:
        raise FileNotFoundError(f"Config file not found. {args.config_file.absolute()}")

    graph = Graph(
        data_root=args.data_root,
    )
    random_walker = RandomWalker(
        graph=graph,
        **hparams["random_walker"],
    )

    binary_tree = BinaryTree(
        V=graph.V,
        n_dims=hparams["n_dims"]
    )

    device = torch.device('cuda') if args.gpu else torch.device('cpu')

    skipgram = SkipGram(
        binary_tree=binary_tree,
        random_walker=random_walker,
        device=device,
        ** hparams["skipgram"],
    )

    for epoch in range(hparams["random_walker"]["walks_per_node"]):
        skipgram.train()

    embeddings = binary_tree.get_node_embeddings()
    if not args.output_root.exists():
        args.output_root.mkdir()
    np.save(Path(args.output_root).joinpath('Z.npy'), embeddings.cpu().numpy())


def get_parser():
    parser = argparse.ArgumentParser(
        prog="DeepWalk-Clone"
    )
    parser.add_argument(
        "--data_root", type=Path,
        help="Path to the data root directory."
    )
    parser.add_argument(
        "--config_file", type=Path,
        help="Path to the config file."
    )
    parser.add_argument(
        "--output_root", type=Path,
        help="Path to the output root directory."
    )
    parser.add_argument('--gpu', action='store_true')
    return parser


def main():
    parser = get_parser()
    args = parser.parse_args()
    run(args)


if __name__ == "__main__":
    main()
