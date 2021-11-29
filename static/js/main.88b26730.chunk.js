(this["webpackJsonpdeepwalk-demo"]=this["webpackJsonpdeepwalk-demo"]||[]).push([[0],{63:function(e,n,t){},70:function(e,n,t){"use strict";t.r(n);var l=t(0),r=t.n(l),o=t(48),a=t.n(o),i=(t(63),t(94)),s=t(97),c=t(103),d=t(104),u=t(89),h=t(2);function m(){return Object(h.jsx)(u.a,{children:Object(h.jsx)(s.a,{position:"fixed",sx:{backgroundImage:"none",bgcolor:"background.dark",borderBottomStyle:"solid",borderBottomWidth:"1px",borderBottomColor:"divider.dark"},children:Object(h.jsx)(c.a,{children:Object(h.jsx)(d.a,{sx:{fontSize:"h5.fontSize",fontWeight:"600",color:"text.dark",":hover":{cursor:"pointer"}},onClick:function(){return window.location.href="/"},children:"helloybz."})})})})}var p=t(6),g=t(18),b=t(100),f=t(106),k=t(101),x=t(99),j=t(69),w=t(52);function y(e){var n=e.data,t=e.title,l=Object(j.a)();return Object(h.jsx)(w.a,{width:"100%",height:"100%",chartType:"ScatterChart",data:n,options:{title:t,titleTextStyle:{color:"white"},legend:{position:"right",textStyle:{color:"white",fontSize:"2rem"}},backgroundColor:l.palette.background.dark,colors:["magenta","yellow","grey","cyan"],hAxis:{gridlines:{color:l.palette.divider.dark},minorGridlines:{color:l.palette.divider.dark},baseline:{color:l.palette.divider.dark},viewWindow:{max:1.5,min:-4}},vAxis:{gridlines:{color:l.palette.divider.dark},minorGridlines:{color:l.palette.divider.dark},baseline:{color:l.palette.divider.dark},viewWindow:{max:2.5,min:-2}}}})}var v=[{header:{eng:"Introduction",kor:"\ud504\ub85c\uc81d\ud2b8 \uc18c\uac1c"},content:{type:"list",eng:"                Implements Deepwalk algorithm based on the original paper without reference to the original source code.\n                Focused on implementing the same Deepwalk described in the paper.\n                Compared with the original Deepwalk by node classification experiment.\n                PyTorch is mainly used for this implementation.",kor:"                Deepwalk \ub17c\ubb38\uc744 \uad6c\ud604\ud55c \ud504\ub85c\uc81d\ud2b8\uc785\ub2c8\ub2e4.\n                \ubcf8 \ub17c\ubb38\uc5d0\uc11c \uc11c\uc220\ud55c \ub0b4\uc6a9\uc744 \uac00\ub2a5\ud55c \ucda9\uc2e4\ud788 \uad6c\ud604\ud588\uc2b5\ub2c8\ub2e4.\n                \uc5bc\ub9c8\ub098 \uc815\ud655\ud788 \uad6c\ud604\ud588\ub294\uc9c0 \uce21\uc815\ud558\uae30 \uc704\ud574\uc11c Deepwalk\uc640 \uc131\ub2a5\uc744 \ube44\uad50\ud558\ub294 \uc2e4\ud5d8\uc744 \ud588\uc2b5\ub2c8\ub2e4.\n                PyTorch\ub97c \uc774\uc6a9\ud574 \uad6c\ud604\ud588\uc2b5\ub2c8\ub2e4."}},{header:{eng:"Understanding Deepwalk",kor:"Deepwalk \uc774\ud574\ud558\uae30"},content:{type:"paragraphs",eng:"                Deepwalk is one of the most popular node embedding algorithms.                It learns structural information from random walks sampled from a given network.                The algorithm composed of two parts: populating random walks from a given network and running Skipgram.\n                Deepwalk considers the random walks as sentences and the nodes as words,                 and applies Skipgram, a language modeling algorithm, to the randomwalks to obtain vector representations of the nodes.\n                The objective function is a likelihood of being contexts of the node given the node's vector representation if given.                But the function is not feasible due to the expensive time complexity for                 computing the probability of collocation for the every node.                By adopting hierarchical softmax for that, the time complexity reduces in logarithms scale.                After optimizing this objective function, the representations of the nodes incorporate the network's structure.\n        ",kor:"                Deepwalk\ub294 \ub300\ud45c\uc801\uc778 node embedding \uc54c\uace0\ub9ac\uc998 \uc911 \ud558\ub098\uc785\ub2c8\ub2e4.                Deepwalk \uc54c\uace0\ub9ac\uc998\uc740 \ud06c\uac8c \ub450 \ubd80\ubd84\uc73c\ub85c \ub098\ub204\uc5b4 \ubcfc \uc218 \uc788\uc2b5\ub2c8\ub2e4.                \uccab\uc9f8\ub294 \uc8fc\uc5b4\uc9c4 \ub124\ud2b8\uc6cc\ud06c\uc5d0\uc11c random walk\ub97c \uc5ec\ub7ec\ubc88 \uc2dc\ud589\ud558\ub294 \uac83\uc774\uace0, \ub458\uc9f8\ub294 Skipgram\uc744 \uc801\uc6a9\ud558\ub294 \uac83\uc785\ub2c8\ub2e4.                \uc784\uc758\uc758 \ub124\ud2b8\uc6cc\ud06c\uac00 \uc8fc\uc5b4\uc84c\uc744 \ub54c, \uadf8 \ub124\ud2b8\uc6cc\ud06c\uc5d0\uc11c Random walk\ub97c \uc5ec\ub7ec \ubc88 \uc2dc\ud589\uc5d0\uc11c \uc5bb\uc740 walk \uc0d8\ud50c\ub4e4\ub85c\ubd80\ud130 \uadf8\ub798\ud504\uc758 \uad6c\uc870\uc801\uc778 \uc815\ubcf4\ub97c \ud559\uc2b5\ud569\ub2c8\ub2e4.                Walk \uc0d8\ud50c\ub4e4\uc744 \ubb38\uc7a5\uc778 \uac83\ucc98\ub7fc, node\ub4e4\uc744 \ub2e8\uc5b4\uc778 \uac83\ucc98\ub7fc \uac04\uc8fc\ud558\uace0, \uc5b8\uc5b4 \ubaa8\ub378\ub9c1 \uc54c\uace0\ub9ac\uc998\uc778 Skipgram\uc744 \uc801\uc6a9\ud569\ub2c8\ub2e4.                \uadf8 \uacb0\uacfc, \ub124\ud2b8\uc6cc\ud06c\uc758 \uad6c\uc870\uc801\uc778 \uc815\ubcf4\uac00 \ub179\uc544\uc788\ub294 Vector \ud45c\ud604\ub4e4\uc744 \uad6c\ud560 \uc218 \uc788\uace0, \uc774\ub4e4\uc744 Node\ub4e4\uc758 Embedding\uc73c\ub85c \uc815\ud569\ub2c8\ub2e4.\n                \uc774\ub54c \ubaa9\uc801\ud568\uc218\ub97c \uc815\uc758\ud558\uae30\ub85c, \uc5b4\ub5a4 node\uc758 vector \ud45c\ud604\ud615\uc774 \uc8fc\uc5b4\uc84c\uc744 \ub54c, \uadf8 node \uc8fc\ubcc0\uc5d0\uc11c \uad00\ucc30\ub418\ub294 \uc774\uc6c3 node\ub4e4\uc758 \uc6b0\ub3c4(likelihood)\uc785\ub2c8\ub2e4.                \uadf8\ub7f0\ub370 \uc774 \ubaa9\uc801\ud568\uc218\ub97c \uacc4\uc0b0\ud558\ub294 \ub370 \uac78\ub9ac\ub294 \uc2dc\uac04\uc774 \ub124\ud2b8\uc6cc\ud06c \ub0b4 \uc874\uc7ac\ud558\ub294 node\ub4e4\uc758 \uc22b\uc790\uc5d0 \ube44\ub840\ud558\uae30 \ub54c\ubb38\uc5d0, \ud604\uc2e4\uc801\uc73c\ub85c \uacc4\uc0b0\uc774 \uc5b4\ub835\uc2b5\ub2c8\ub2e4.                \uc774 \ub17c\ubb38\uc5d0\uc11c\ub294 \ubaa9\uc801\ud568\uc218 \uacc4\uc0b0\uc5d0 Hierarchical Softmax\ub97c \ub3c4\uc785\ud574\uc11c, log(node\ub4e4\uc758 \uc22b\uc790)\uc5d0 \ube44\ub840\ud55c \uc2dc\uac04\uc548\uc5d0 \uacc4\uc0b0\uc744 \ud574\ub0c5\ub2c8\ub2e4.                \uc774\ub7ec\ud55c \ubc29\uc2dd\uc73c\ub85c \ub124\ud2b8\uc6cc\ud06c \ub0b4 \uc874\uc7ac\ud558\ub294 node\ub4e4\uc758 vector \ud45c\ud604\ud615\uc744 \uadf8 \uad6c\uc870\uc815\ubcf4\ub97c \ub2f4\ub3c4\ub85d \ucd5c\uc801\ud654\ud569\ub2c8\ub2e4.        "}},{header:{eng:"Implementing Deepwalk",kor:"Deepwalk \uad6c\ud604\ud558\uae30"},content:{type:"paragraphs",eng:"                First, I've implemented a graph structure and a random-walker. Both inherit PyTorch's Dataset class. Graph emits its node indexed with a given argument.                RandomWalker wraps an instance of Graph and generate a random walk on the graph starting from the given indexed node.                The author has populated a bunch of random walk samples before running Skipgram.                 But in this clone project, the random walks can be sampled not only during training time also in multi-processed manner by using PyTorch.\n                Second, a BinaryTree class is implemented for hierarchical softmax.                 While hierarchical softmax is an optmizing algorithm rather than a neural network architecture,                 BinaryTree class inherits PyTorch's nn.Module class because trainable binary classifiers are allocated to each node in the tree.                The vertices of the graph are allocated to the leaf nodes from left, and then the trainable parameters of the leaf nodes are used as the optimized vector representation of the nodes.                The class finds a path from the root node to the target leaf node, then the path are used to indexing the classifiers.\n                Third, a Skipgram class is implemented.                While the author has used 'gensim' library to apply Skipgram, I implement it myself using PyTorch for practicing pursose.                It captures the local structure of the graph by sliding window on the random walk samples,                then populates pairs of the nodes collocating in the window.                Also, it updates the BinaryTree's parameter for the probabilty of being the pairs to be maximized.            ",kor:""}},{header:{eng:"Conclusion",kor:" \uacb0\ub860"},content:{type:"list",eng:"TBA",kor:"\ucd94\uac00\uc608\uc815"}}],O={zachary:[["x","Group A","Group B","Group C","Group D"],[-3.8166658878326416,-.5474966764450073,null,null,null],[-2.6906471252441406,.59298175573349,null,null,null],[-2.626798391342163,null,1.170506238937378,null,null],[-1.7017648220062256,.2615310847759247,null,null,null],[-1.5637834072113037,null,null,-1.3880661725997925,null],[-1.8370107412338257,null,null,-.9987485408782959,null],[-1.54941725730896,null,null,-.6557814478874207,null],[-1.2537076473236084,-.5925015211105347,null,null,null],[-1.5569331645965576,null,null,null,.08960134536027908],[-1.2568892240524292,null,.07699773460626602,null,null],[-1.0821958780288696,null,null,-1.3379249572753906,null],[-1.2867532968521118,-.9995964765548706,null,null,null],[-1.2120288610458374,-.8372260928153992,null,null,null],[-1.2340707778930664,-.05409325286746025,null,null,null],[-.07648933678865433,null,null,null,-.4845717251300812],[-.4363250434398651,null,null,null,-.34613025188446045],[-1.29430091381073,null,null,-.7885195016860962,null],[-1.2804150581359863,.7749748826026917,null,null,null],[.16352751851081848,null,null,null,.38466426730155945],[-1.3203083276748657,.2304065078496933,null,null,null],[-.9027239084243774,null,null,null,-.12415960431098938],[-1.3178577423095703,.4524197280406952,null,null,null],[-.8319980502128601,null,null,null,-.7561876773834229],[.02225770801305771,null,null,null,.6341503262519836],[-1.0112390518188477,null,2.24466872215271,null,null],[-.5600841641426086,null,1.824853539466858,null,null],[.7953892350196838,null,null,null,-1.6803532838821411],[-.7370090484619141,null,1.6600260734558105,null,null],[-1.03105628490448,null,1.5013389587402344,null,null],[.8226757645606995,null,null,null,-1.197110891342163],[-1.3952890634536743,null,null,null,-.24407616257667542],[-1.2003569602966309,null,1.6307902336120605,null,null],[-.9227609038352966,null,null,null,.10339689254760742],[-.6735153794288635,null,null,null,-.6007634997367859]]},S=t(105),T=t(96);function B(e){var n=e.type,t=e.content,l=e.language;if("list"===n){var r=null;return r="KOR"===l?t.kor.split("\n"):t.eng.split("\n"),Object(h.jsx)(b.a,{container:!0,component:S.a,children:r.map((function(e,n){return Object(h.jsxs)(b.a,{item:!0,xs:12,component:T.a,children:["- ",e]},n)}))})}if("paragraphs"===n){var o=null;return o="KOR"===l?t.kor.split("\n"):t.eng.split("\n"),Object(h.jsx)(b.a,{container:!0,component:S.a,children:o.map((function(e,n){return Object(h.jsx)(b.a,{item:!0,xs:12,component:T.a,children:Object(h.jsx)(d.a,{paragraph:!0,children:e})},n)}))})}}function D(){var e,n=Object(l.useState)("KOR"),t=Object(g.a)(n,2),r=t[0],o=t[1];return Object(h.jsxs)(b.a,{container:!0,component:i.a,sx:{padding:(e={xs:"0 1rem"},Object(p.a)(e,"xs","0 5rem"),Object(p.a)(e,"lg","0 30rem"),e)},children:[Object(h.jsx)(f.a,{sx:{position:"fixed",bottom:{xs:"1rem",lg:"15rem"},right:{xs:"1rem",lg:"15rem"},zIndex:1e3},onClick:function(){o("KOR"===r?"ENG":"KOR")},children:r}),Object(h.jsxs)(b.a,{item:!0,component:d.a,xs:12,sx:{color:"text.dark",fontSize:{xs:"2.5rem",md:"3rem"},fontWeight:"600",lineHeight:{xs:"2.5rem",md:"3rem"},marginBottom:"1rem"},container:!0,children:[Object(h.jsx)(b.a,{item:!0,xs:12,lg:"auto",children:"Deepwalk-Clone"}),Object(h.jsx)(b.a,{component:k.a,sx:{marginLeft:"2rem",fontSize:"2rem",borderStyle:"solid",borderWidth:"1px",borderColor:"divider.dark",borderRadius:"5rem",":hover":{cursor:"pointer"}},onClick:function(){return window.location.href="https://github.com/helloybz/deepwalk-clone"},children:Object(h.jsx)(x.a,{})})]}),Object(h.jsx)(b.a,{item:!0,xs:12,lg:12,sx:{marginBottom:"1rem",height:{xs:"20rem",lg:"40rem"}},children:Object(h.jsx)(y,{data:O.zachary,title:"Zachary Karate Club"})}),v.map((function(e,n){return Object(h.jsxs)(b.a,{item:!0,xs:12,sx:{marginBottom:"1rem"},children:[Object(h.jsx)(d.a,{variant:"h2",sx:{color:"rgb(243, 246, 249)",fontSize:"2rem",lineHeight:"2rem",marginBottom:"0.5rem",fontWeight:"1000"},children:"KOR"===r?e.header.kor:e.header.eng}),Object(h.jsx)(d.a,{sx:{color:"rgb(243, 246, 249)",fontSize:"1.2rem"},children:Object(h.jsx)(B,{type:e.content.type,content:e.content,language:r})})]},n)}))]})}var z=function(){return Object(h.jsxs)("div",{children:[Object(h.jsx)(m,{}),Object(h.jsx)(i.a,{sx:{marginTop:"6rem"},children:Object(h.jsx)(D,{})})]})},C=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,107)).then((function(n){var t=n.getCLS,l=n.getFID,r=n.getFCP,o=n.getLCP,a=n.getTTFB;t(e),l(e),r(e),o(e),a(e)}))},I=t(102),W=t(44),G=Object(W.a)({palette:{mode:"dark",primary:{main:"#fff",dark:"#fff"},background:{default:"rgb(13, 25, 40)",dark:"rgb(13, 25, 40)"},text:{dark:"rgb(243, 246, 249)"},divider:{dark:"rgb(24, 47, 75)"}}});a.a.render(Object(h.jsx)(r.a.StrictMode,{children:Object(h.jsx)(I.a,{theme:G,children:Object(h.jsx)(z,{})})}),document.getElementById("root")),C()}},[[70,1,2]]]);
//# sourceMappingURL=main.88b26730.chunk.js.map