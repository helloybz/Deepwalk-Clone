# Deepwalk - Clone
Clone implementation of [deepwalk paper](https://arxiv.org/abs/1403.6652) in PyTorch.
- [Source code by the original author](https://github.com/phanein/deepwalk)


## Install
#### Requirements:
- python >= 3.8
#### Commmand:
```bash
    pip install git+https://github.com/helloybz/deepwalk-clone.git
```
## Usage
```bash
deepwalk --data_root [DATA_DIRECTORY_PATH] --output_root  [OUTPUT_DIRECTORY_PATH] --config_file [CONFIG_PATH] [--gpu]
```

## Config file
All of the hyper-parameters of deepwalk is controlled in this `yaml` file.
Below is an example of the config file.
```yaml
n_dims: 128 # referred as d in the paper.
random_walker:
  steps_per_walk: 40 # referred as t in the paper.
  walks_per_node: 80 # referred as r in the paper.

skipgram:
  lr: 0.025
  window_size: 10 # referred as w in the paper.

```

## Comparison with the original work
- Multi-Label Classification
  - TBA

