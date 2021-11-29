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

export const plot = {
    "zachary": [
        ['x', "Group A", "Group B", "Group C", "Group D"],
        [-3.8166658878326416, -0.5474966764450073, null, null, null],
        [-2.6906471252441406, 0.59298175573349, null, null, null],
        [-2.626798391342163, null, 1.170506238937378, null, null],
        [-1.7017648220062256, 0.2615310847759247, null, null, null],
        [-1.5637834072113037, null, null, -1.3880661725997925, null],
        [-1.8370107412338257, null, null, -0.9987485408782959, null],
        [-1.54941725730896, null, null, -0.6557814478874207, null],
        [-1.2537076473236084, -0.5925015211105347, null, null, null],
        [-1.5569331645965576, null, null, null, 0.08960134536027908],
        [-1.2568892240524292, null, 0.07699773460626602, null, null],
        [-1.0821958780288696, null, null, -1.3379249572753906, null],
        [-1.2867532968521118, -0.9995964765548706, null, null, null],
        [-1.2120288610458374, -0.8372260928153992, null, null, null],
        [-1.2340707778930664, -0.05409325286746025, null, null, null],
        [-0.07648933678865433, null, null, null, -0.4845717251300812],
        [-0.4363250434398651, null, null, null, -0.34613025188446045],
        [-1.29430091381073, null, null, -0.7885195016860962, null],
        [-1.2804150581359863, 0.7749748826026917, null, null, null],
        [0.16352751851081848, null, null, null, 0.38466426730155945],
        [-1.3203083276748657, 0.2304065078496933, null, null, null],
        [-0.9027239084243774, null, null, null, -0.12415960431098938],
        [-1.3178577423095703, 0.4524197280406952, null, null, null],
        [-0.8319980502128601, null, null, null, -0.7561876773834229],
        [0.02225770801305771, null, null, null, 0.6341503262519836],
        [-1.0112390518188477, null, 2.24466872215271, null, null],
        [-0.5600841641426086, null, 1.824853539466858, null, null],
        [0.7953892350196838, null, null, null, -1.6803532838821411],
        [-0.7370090484619141, null, 1.6600260734558105, null, null],
        [-1.03105628490448, null, 1.5013389587402344, null, null],
        [0.8226757645606995, null, null, null, -1.197110891342163],
        [-1.3952890634536743, null, null, null, -0.24407616257667542],
        [-1.2003569602966309, null, 1.6307902336120605, null, null],
        [-0.9227609038352966, null, null, null, 0.10339689254760742],
        [-0.6735153794288635, null, null, null, -0.6007634997367859]]
}