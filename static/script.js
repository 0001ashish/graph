function generateGraph() {
    const numNodes = document.getElementById("numNodes").value;
    const container = document.getElementById("graphVisualization");

    fetch(`/generate-graph?nodes=${numNodes}`)
        .then(response => response.text())
        .then(matrixString => {
            const matrix = JSON.parse(matrixString);
            const nodes = createNodes(matrix);
            const edges = createEdges(matrix);

            const data = { nodes: nodes, edges: edges };

            const options = {
                layout: {
                    hierarchical: {
                        direction: "LR", 
                        sortMethod: "directed" 
                    }
                },
                physics: {
                    enabled: true, 
                    barnesHut: {
                        springLength: 200, 
                        damping: 0.09
                    }
                },
                nodes: {
                    shape: 'box',
                    size: 30,
                    font: { color: '#333' } 
                },
                edges: {
                    color: 'lightgray',
                    smooth: { 
                        enabled: true, 
                        type: "curvedCCW" 
                    }
                }
            };

            const network = new vis.Network(container, data, options); 
        })
        .catch(error => console.error("Error:", error));
}

function createNodes(matrix) {
    const nodes = [];
    for (let i = 0; i < matrix.length; i++) {
        nodes.push({ id: i, label: `Node ${i}` });
    }
    return new vis.DataSet(nodes);
}

function createEdges(matrix) {
    const edges = [];
    row_index = 0
    for (let i = 0; i<=row_index; i++) {
        if(row_index>=matrix.length){
            break
        }
        for (let j = 0; j <=i; j++) {
            if (matrix[i][j] === 1) {
                edges.push({ from: i, to: j });
            }
        }
        row_index++
    }
    return new vis.DataSet(edges);
}
