# Deepwalk - Clone
Clone implementation of [deepwalk paper](https://arxiv.org/abs/1403.6652) in PyTorch.
- [Source code by the original author](https://github.com/phanein/deepwalk)


## Install
#### Requirements:
- python >= 3.9
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

## Experiments
### Multi-Label Classification
 Cora dataset\
 logistic regression varying train split's percentage. (from 10% to 90%)\
 Scores are computed as averaged score after 10 repeated runs.\
 Column name means the percentage of training data split.
#### Micro F1
| Method         | 10%   | 20%   | 30%   | 40%   | 50%   | 60%   | 70%   | 80%   | 90%   |
| -------------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| Deepwalk-Clone | 0.373 | 0.462 | 0.500 | 0.504 | 0.513 | 0.539 | 0.552 | 0.550 | 0.543 |
| Deepwalk       | 0.200 | 0.206 | 0.215 | 0.223 | 0.213 | 0.236 | 0.242 | 0.256 | 0.247 |