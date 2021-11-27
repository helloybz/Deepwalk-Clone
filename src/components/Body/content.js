export const data = [
    {
        "header": 'Introduction',
        "content": `\
        This project implements the Deepwalk algorithm based on Deepwalk's original paper without reference to the original source code.
        I've focused as much as possible on implementing the same Deepwalk described in the paper.
        Also, the experiment which is also done in the original paper, is conducted to check how my implementation is done well compared with the original work.
        I tried to implement the algorithms using as few libraries as possible.
        I've mainly used PyTorch for the implements. 
        `
    },
    {
        "header": 'Understanding Deepwalk',
        "content": `\
        Deepwalk is one of the most popular node embedding algorithms.\
        It learns structural information from random walks sampled from a given network.\
        The algorithm composed of two parts: populating random walks from a given network and running Skipgram.\
        Deepwalk considers the random walks as sentences and the nodes as words, \
        and applies Skipgram, a language modeling algorithm, to the randomwalks to obtain vector representations of the nodes.\ 
        The objective function is a likelihood of being contexts of the node given the node's vector representation if given.'
        But the function is not feasible due to the expensive time complexity for \
        computing the probability of collocation for the every node.\
        By adopting hierarchical softmax for that, the time complexity reduces in logarithms scale.\
        After optimizing this objective function, the representations of the nodes incorporate the network's structure.
        `
    },
    {
        "header": 'Implementing Deepwalk',
        "content": `\
        First, I've implemented a graph structure and a random-walker. Both inherit PyTorch's Dataset class. Graph emits its node indexed with a given argument.\
        RandomWalker wraps an instance of Graph and generate a random walk on the graph starting from the given indexed node.\
        The author has populated a bunch of random walk samples before running Skipgram. \
        But in this clone project, the random walks can be sampled not only during training time also in multi-processed manner by using PyTorch.
        
        Second, a BinaryTree class is implemented for hierarchical softmax. \
        While hierarchical softmax is an optmizing algorithm rather than a neural network architecture, \
        BinaryTree class inherits PyTorch's nn.Module class because trainable binary classifiers are allocated to each node in the tree.\
        The vertices of the graph are allocated to the leaf nodes from left, and then the trainable parameters of the leaf nodes are used as the optimized vector representation of the nodes.
        The class finds a path from the root node to the target leaf node, then the path are used to indexing the classifiers.

        Third, a Skipgram class is implemented.\
        While the author has used 'gensim' library to apply Skipgram, I implement it myself using PyTorch for practicing pursose.\
        It captures the local structure of the graph by sliding window on the random walk samples,\
        then populates pairs of the nodes collocating in the window.\
        Also, it updates the BinaryTree's parameter for the probabilty of being the pairs to be maximized.
        `
    },
    {
        "header": 'Conclusion',
        "content": "TBA"
    },
]