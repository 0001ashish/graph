import networkx as nx
import random

from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')  # Route for the landing page
def index():
    return render_template('landing.html')

@app.route('/generate-graph')
def generate_graph():
    num_nodes = int(request.args.get('nodes'))
    graph = nx.fast_gnp_random_graph(num_nodes, p=0.5)  
    adjacency_matrix = nx.adjacency_matrix(graph).todense().tolist() 
    return str(adjacency_matrix)  # Return the matrix as a string representation

if __name__ == '__main__':
    app.run(debug=True)
