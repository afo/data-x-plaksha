from flask import Flask, request, jsonify, abort
import json
from review_classifier import classifier
import sys

app = Flask(__name__)



@app.route('/predict', methods = ["post", "get"])
def predict_review():
    """
    :return: response in json
    """

    # Response for a GET
    if request.method == "GET":
        text = request.args.get('text')
        predicted = classifier([text])
    # Response for a POST
    if request.method == "POST":

        if request.headers['Content-type'] != "application/json":
            abort(400)
        data = json.loads(request.data, strict = False)
        text = data['text']
        predicted = classifier([text])


    return jsonify({'predicted': predicted,'text': text})

if __name__=="__main__":
    app.run(debug=True, host='0.0.0.0', port = 5000)
