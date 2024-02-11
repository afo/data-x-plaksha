from flask import Flask, render_template, request
import pickle
import numpy as np

app = Flask(__name__)

model = pickle.load(open('model.pkl', 'rb'))


@app.route("/")
def home():
    return render_template('home.html')


@app.route("/iris")
def iris():
    return render_template('iris.html')


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        sl = request.form['sl']
        sw = request.form['sw']
        pl = request.form['pl']
        pw = request.form['pw']
        sample = np.array([int(sl), int(sw), int(pl), int(pw)]
                          ).reshape(1, -1).tolist()
        prediction = model.predict(sample)
        pred = ['setosa', 'versicolor', 'virginica'][prediction[0]]
        return render_template("pred.html", value=pred)
