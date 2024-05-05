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
            const options = {}; 

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
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] === 1) {
                edges.push({ from: i, to: j });
            }
        }
    }
    return new vis.DataSet(edges);
}
