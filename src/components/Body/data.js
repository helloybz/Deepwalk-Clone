export const data = [
    {
        "header": {
            'eng': 'Introduction',
            'kor': '프로젝트 소개'
        },
        "content": {
            'type': 'list',
            'eng': `\
                This project implements the Deepwalk algorithm based on Deepwalk's original paper without reference to the original source code.
                I've focused as much as possible on implementing the same Deepwalk described in the paper.
                Also, the experiment which is also done in the original paper, is conducted to check how my implementation is done well compared with the original work.
                I tried to implement the algorithms using as few libraries as possible.
                I've mainly used PyTorch for the implements.`,
            'kor': `\
                Deepwalk 논문을 구현한 프로젝트입니다.
                본 논문에서 서술한 내용을 가능한 충실히 구현했습니다.
                얼마나 정확히 구현했는지 측정하기 위해서 Deepwalk와 성능을 비교하는 실험을 했습니다.
                PyTorch를 이용해 구현했습니다.`,
        }
    },
    {
        "header": {
            'eng': 'Understanding Deepwalk',
            'kor': 'Deepwalk 이해하기',
        },
        "content": {
            'type': 'paragraphs',
            'eng': `\
                Deepwalk is one of the most popular node embedding algorithms.\
                It learns structural information from random walks sampled from a given network.\
                The algorithm composed of two parts: populating random walks from a given network and running Skipgram.\

                Deepwalk considers the random walks as sentences and the nodes as words, \
                and applies Skipgram, a language modeling algorithm, to the randomwalks to obtain vector representations of the nodes.\

                The objective function is a likelihood of being contexts of the node given the node's vector representation if given.\
                But the function is not feasible due to the expensive time complexity for \
                computing the probability of collocation for the every node.\
                By adopting hierarchical softmax for that, the time complexity reduces in logarithms scale.\
                After optimizing this objective function, the representations of the nodes incorporate the network's structure.
        `, 'kor': `\
                Deepwalk는 대표적인 node embedding 알고리즘 중 하나입니다.\

                Deepwalk 알고리즘은 크게 두 부분으로 나누어 볼 수 있습니다.\
                첫째는 주어진 네트워크에서 random walk를 여러번 시행하는 것이고, 둘째는 Skipgram을 적용하는 것입니다.\
                임의의 네트워크가 주어졌을 때, 그 네트워크에서 Random walk를 여러 번 시행에서 얻은 walk 샘플들로부터 그래프의 구조적인 정보를 학습합니다.\
                Walk 샘플들을 문장인 것처럼, node들을 단어인 것처럼 간주하고, 언어 모델링 알고리즘인 Skipgram을 적용합니다.\
                그 결과, 네트워크의 구조적인 정보가 녹아있는 Vector 표현들을 구할 수 있고, 이들을 Node들의 Embedding으로 정합니다.\

                이때 목적함수를 정의하기로, 어떤 node의 vector 표현형이 주어졌을 때, 그 node 주변에서 관찰되는 이웃 node들의 우도(likelihood)입니다.\
                그런데 이 목적함수를 계산하는 데 걸리는 시간이 네트워크 내 존재하는 node들의 숫자에 비례하기 때문에, 현실적으로 계산이 어렵습니다.\
                이 논문에서는 목적함수 계산에 Hierarchical Softmax를 도입해서, log(node들의 숫자)에 비례한 시간안에 계산을 해냅니다.\
                이러한 방식으로 네트워크 내 존재하는 node들의 vector 표현형을 그 구조정보를 담도록 최적화합니다.\
        `
        }
    },
    {
        "header": { "eng": 'Implementing Deepwalk', "kor": 'Deepwalk 구현하기' },
        "content": {
            'type': 'paragraphs',
            'eng': `\
                First, I've implemented a graph structure and a random-walker. Both inherit PyTorch's Dataset class. Graph emits its node indexed with a given argument.\
                RandomWalker wraps an instance of Graph and generate a random walk on the graph starting from the given indexed node.\
                The author has populated a bunch of random walk samples before running Skipgram. \
                But in this clone project, the random walks can be sampled not only during training time also in multi-processed manner by using PyTorch.\

                Second, a BinaryTree class is implemented for hierarchical softmax. \
                While hierarchical softmax is an optmizing algorithm rather than a neural network architecture, \
                BinaryTree class inherits PyTorch's nn.Module class because trainable binary classifiers are allocated to each node in the tree.\
                The vertices of the graph are allocated to the leaf nodes from left, and then the trainable parameters of the leaf nodes are used as the optimized vector representation of the nodes.\
                The class finds a path from the root node to the target leaf node, then the path are used to indexing the classifiers.\

                Third, a Skipgram class is implemented.\
                While the author has used 'gensim' library to apply Skipgram, I implement it myself using PyTorch for practicing pursose.\
                It captures the local structure of the graph by sliding window on the random walk samples,\
                then populates pairs of the nodes collocating in the window.\
                Also, it updates the BinaryTree's parameter for the probabilty of being the pairs to be maximized.\
            `, 'kor': ``
        }
    },
    {
        "header": { 'eng': 'Conclusion', 'kor': ' 결론' },
        "content": { 'type': 'list', 'eng': "TBA", 'kor': '추가예정' }
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