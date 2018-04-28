from flask import Flask, Response
import json

app = Flask(__name__)

@app.route("/test")
def hello():
    data = {"hey":"harsh"}
    js = json.dumps(data)
    resp = Response(js, status=200, mimetype='application/json')
    resp.headers['Access-Control-Allow-Origin'] ='*'
    return resp

if '__main__' == __name__:
    app.run()
