export const data = [
    {
        "header": {
            'eng': 'Introduction',
            'kor': '프로젝트 소개'
        },
        "content": {
            'type': 'list',
            'eng': `\
                Implements Deepwalk algorithm based on the original paper without reference to the original source code.
                Focused on implementing the same Deepwalk described in the paper.
                Compared with the original Deepwalk by node classification experiment.
                PyTorch is mainly used for this implementation.`,
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
                The algorithm consists of two parts: 1) populating random walks from a given network and 2) running Skipgram.\
                
                Given a network, we can think of a random walk starting from a random node in the network.\
                The network's structural information around the starting node is incorporated in the random walk.\
                If a bunch of random walks are populated, starting from any random nodes, \
                we can think that the network's entire structural information is almost captured in them.\

                Deepwalk considers the random walks as sentences and the nodes in them as words, \
                and then applies Skipgram, a language modeling algorithm, to the random walks.\
                Skipgram's objective function is a likelihood of the nodes' vector representation given their adjacent nodes.\

                But the function is not feasible due to the expensive time complexity for \
                computing the probability of collocation for the every node.\
                By adopting hierarchical softmax for that, the time complexity reduces to logarithms scale.\
                After maximizing this objective function, the vector representations of the nodes are optimized to be incorporating the network's structure.\
                `,
            'kor': `\
                Deepwalk는 대표적인 node embedding 알고리즘 중 하나입니다.\
                Deepwalk 알고리즘은 크게 두 부분으로 이루어져 있습니다.\
                첫째는 주어진 네트워크에서 Random Walk 샘플들을 많이 확보하는 것이고, 둘째는 Skipgram을 적용하는 것입니다.\

                어떤 네트워크가 주어졌을 때, 그 네트워크에서 아무 Node를 하나 골라서 그 Node에서 시작하는 Random Walk를 한번 시행했다고 생각해보겠습니다.\
                그 하나의 Random Walk 샘플에는 그 Node 주변의 구조적인 정보가 담겨있습니다.\
                만약 이런 과정을 모든 Node에 대해 무수히 많이 시행한다면, 그렇게 얻은 Random Walk 샘플들에는 네트워크의 전체적인 구조적인 정보가 담겨있다고 생각할 수 있습니다.\
                
                수많은 Random Walk 샘플들을 문장으로, 그 안의 Node들을 단어로 간주하고, 언어 모델링 알고리즘인 Skipgram을 적용합니다.\
                어떤 Node의 주변 정보가 주어졌을 때, 그 Node의 vector 표현형의 우도를 목적함수로 삼습니다.\
                이 목적함수를 최대한 크게 하도록 vector 표현형들을 최적화하면, 네크워트의 구조적인 정보를 잘 반영한 Embedding을 얻는 것입니다.\

                그런데 이 목적함수를 계산하는 데 걸리는 시간이 네트워크 내 존재하는 node들의 숫자에 비례하기 때문에, 현실적으로 계산이 어렵습니다.\
                이 논문에서는 목적함수 계산에 Hierarchical Softmax를 도입해서, log(node들의 숫자)에 비례한 시간안에 계산을 해냅니다.\
        `
        }
    },
    {
        "header": { "eng": 'Implementing Deepwalk', "kor": 'Deepwalk 구현하기' },
        "content": {
            'type': 'paragraphs',
            'eng': `\
                First, I've implemented a graph structure, class Graph.\
                It inherits PyTorch's Dataset class, and emits one of its nodes by a given index.\
                Furthermore, the Graph has a method that returns the adjacent nodes of the given node.\

                Second, class RandomWalker, kind of wrapper class of the class Graph, is implemented.\
                It also inherits PyTorch's Dataset class, and generates a random walk on the graph starting from the given node.\
                The author of the original paper has populated random walk samples before running Skipgram, using multi-processing\
                But in this project, the random walks can be sampled not only during training time also in parallel by using PyTorch.\

                Third, a class BinaryTree is implemented for hierarchical softmax.\
                While hierarchical softmax is an optimizing algorithm rather than a neural network architecture,\
                the BinaryTree class inherits PyTorch's nn.Module class because trainable binary classifiers should be allocated to each node in the tree.\
                The  classifiers would be optimized to maximize the likelihood.\
                The vertices of the graph are also allocated to the leaf nodes from left.\
                After the classifiers are optimized, the weights of the classifiers of the leaf nodes are used as the optimized vector representation of the nodes.\
                The class has a method that finds a path from the root node to the target leaf node, then the nodes in the path are used to choose the classifiers to be optimized.\

                Finally, a Skipgram class is implemented.\
                The Skipgram class is kind of 'Trainer' class.\
                It prepares all the things neccesary for training, such as PyTorch's optimizer and DataLoader.\
                While the author has used 'gensim' library to use a ready-made Skipgram,\
                I've implement it myself in practicing pursose.\
                It also has a method that slides window on the given random walks samples to cature the local structural information.\
                Then, it updates the BinaryTree's classifiers for the probabilty of being the pairs to be maximized.\
            `, 'kor': `\
                첫째로, Graph 클래스를 만들었습니다.\
                Graph 클래스는 PyTorch의 Dataset 클래스를 상속받으며, forward method로 하여금 주어진 index에 해당하는 노드를 반환하도록 했습니다.\
                Random Walk를 시행할 때 용이하도록, 주어진 노드의 이웃 노드들을 반환하는 method도 추가로 만들었습니다.\

                둘째로, Graph 클래스의 Wrapper class 역할을 하는 RandomWalker 클래스를 만들었습니다.\
                이 클래스도 역시 PyTorch의 Dataset class를 상속받으며, forward method로 하여금 주어진 노드로 부터 시작하는 RandomWalk 샘플 하나를 반환하도록 합니다.\
                Deepwalk 원 논문의 저자는 학습에 사용할 RandomWalk 샘플들을 미리 확보하는 방법을 선택했습니다만,\
                이 프로젝트에서는 PyTorch를 사용함으로서 학습과 동시에 RandomWalk를 생성할 수 있으며 또, 병렬적으로 생성할 수도 있습니다.\

                셋째로, 계층적 Softmax를 구현하기위한 BinaryTree 클래스를 만들었습니다.\
                물론, 계층적 Softmax는 최적화 알고리즘의 일종이지, Neural network 구조는 아닙니다만,\
                Tree의 노드마다 학습가능한 binary classifier를 붙여야 하기 때문에, 구현 편의 상 PyTorch의 nn.Module을 상속받도록 만들었습니다.\
                Tree의 잎 노드에는 가장 왼쪽의 노드부터 Graph의 Vertex들을 순서대로 할당합니다.\
                Tree의 뿌리 노드에서 시작해 목표로 하는 잎 노드까지의 경로를 탐색하는 method를 구현했습니다.\
                이 경로 위의 노드에 달려있는 classifier를 앞서 소개한 '우도'를 최대로 하도록 최적화합니다.\
                최적화가 끝나면, 잎 노드들의 classifier의 최적화된 가중치가, 할당된 vertex의 vector 표현형이 됩니다.\

                마지막으로, Skipgram 클래스를 만들었습니다.\
                Skipgram 클래스는 일종의 Trainer 클래스입니다.\
                Optimizer, DataLoader 등 학습에 필요한 것들을 모두 갖고 있습니다.\
                원 저자는 이미 잘 만들어진 Skipgram을 이용하기 위해 'gensim' 라이브러리를 활용했습니다만,\
                이 프로젝트에서는 Skipgram을 더 잘 이해하기 위해서 직접 그 원리를 구현했습니다.\
                주어진 RandomWalk 위에서 '슬라이딩 윈도우' 방법으로, 윈도우 범위 내 함께 나타나는 vertex 쌍들을 뽑아내는 메소드를 만들었습니다.\
                그리고 이 vertex 쌍들의 우도를 최대로 하도록 BinaryTree의 classifier들을 학습시킵니다.\
            `
        }
    },
    {
        "header": { 'eng': 'Experiment: Node Classification', 'kor': '실험: 노드 분류' },
        "content": {
            'type': 'list',
            'eng': `\
            CORA datset, citation network, is used for the experiment.
            Same hyper parameters as decribed in the paper are used to both the original Deepwalk and the cloned Deepwalk.
            128 dimensions for the vector representations
            40 steps per walk.
            80 walks per node.
            10 window size. (10+10+1 when counting for both directions)
            Logistic Regression is used for the classification.
            The ratio of train and test split is varies from 1:9 to 9:1. 
            The scores are averaged after 10 runs.            `,
            'kor': `\
            문헌 참조 네트워크인 CORA 데이터셋을 실험에 사용했습니다.
            Deepwalk와 Deepwalk-Clone 모두 Deepwalk 원 논문에서 사용된 하이퍼 파라미터 그대로 사용했습니다.
            128차원의 벡터 표현
            RandomWalk 당 최대 40걸음
            Node 당 RandomWalk 샘플링 80회
            슬라이딩 윈도우의 크기 10
            분류 실험의 분류기로는 Logistic Regression을 사용했습니다.
            Train set와 Test set의 분할 비율은 1:9부터 9:1까지 적용했습니다.
            같은 조건의 실험을 10번 반복한 후 평균 점수를 계산했습니다.
            `,
        }
    }
    ,
    {
        "header": { 'eng': 'Experiment Result', 'kor': '실험 결과' },
        "content": {
            'type': 'table',
            'eng': {
                'title': 'micro-F1',
                'header': ["Method", "10 %", "20 %", "30 %", "40 %", "50 %", "60 %", "70 %", "80 %", "90 %"],
                'rows': [
                    ["Deepwalk-Clone", "0.219", "0.242", "0.282", "0.335", "0.347", "0.342", "0.360", "0.377", "0.352"],
                    ["Deepwalk", "0.200", "0.206", "0.215", "0.223", "0.213", "0.236", "0.242", "0.256", "0.247"],
                ]
            },
            'kor': {
                'header': ["Deepwalk-Clone", "10 %", "20 %", "30 %", "40 %", "50 %", "60 %", "70 %", "80 %", "90 %"],
                'rows': [["Method", "10 %", "20 %", "30 %", "40 %", "50 %", "60 %", "70 %", "80 %", "90 %"], ["Method", "10 %", "20 %", "30 %", "40 %", "50 %", "60 %", "70 %", "80 %", "90 %"]]
            },
        }
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