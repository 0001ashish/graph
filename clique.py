import networkx as nx
import numpy as np
from flask import Flask, render_template
from pyvis.network import Network

app = Flask(__name__)

@app.route('/')
def display_graph():
    adjacency_matrix = np.array([
        [0, 1, 0, 1],
        [1, 0, 1, 0],
        [0, 1, 0, 1],
        [1, 0, 1, 0]
    ])

    G = nx.from_numpy_matrix(adjacency_matrix)
    graph_data = Network(height="500px", width="800px", directed=False)
    graph_data.from_nx(G)
    graph_data.show("graph.html")
    return render_template("graph.html")  

if __name__ == '__main__':
    app.run(debug=True)
