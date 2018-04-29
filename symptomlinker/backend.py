from flask import Flask, Response, request
import json
from sklearn import tree
import ast


app = Flask(__name__)


def predict_issue(data,userSymp,symptoms): 
    features = []
    labels = []
    dk = {}
    i = 0
    for key in data:
        k = 0
        dk[i] = key
        features.append([])
        if key not in labels:
            labels.append(i)
        for j in data[key]:
            if j in symptoms and k < 6:
                features[i].append(symptoms.index(j))
            k += 1;
        i += 1
    uS = []
    for l in userSymp:
        uS.append(symptoms.index(l))
    clf = tree.DecisionTreeClassifier()
    clf = clf.fit(features,labels)
    ke = clf.predict([uS])
    return dk[ke[0]]

def create_list():
    dataFile = open('Dataset.csv','r')
    data = {}
    issue = ''
    symptom = ''
    symptoms = []
    line = dataFile.readline()
    while line:
        issue , symptom = line.strip().split(',')
        if issue in data.keys():
            data[issue].append(symptom);
        else:
            data[issue] = [];
            data[issue].append(symptom)
        if symptom not in symptoms:
            symptoms.append(symptom)
        line = dataFile.readline()
    dataFile.close()
    return data , symptoms;
    
CARD_TOP = '''<div class="card border-dark mb-3" style="max-width: 18rem;">
  <div class="card-header">'''
  
CARD_BOT =   '''</div>
    <div class="card-body text-dark">
        <h5 class="card-title">
        '''
CARD_T =        '''
        
</h5>
        </div>
</div>'''

@app.route("/symptoms", methods=['GET','POST'])
def symptoms():
    if request.method == 'GET':
        issue = ''
        data, symptoms = create_list()
        package = {'symptoms':symptoms,'issue':issue}
        js = json.dumps(package)
        resp = Response(js, status=200, mimetype='application/json')
        resp.headers['Access-Control-Allow-Origin'] ='*'
        return resp
    elif request.method == 'POST':
        userSymps = ast.literal_eval(request.data)
        print(userSymps)
        symps = []
        for key in userSymps.keys():
            symps.append(userSymps[key])
        
        data, symptoms = create_list()
        issues = []
        while len(issues) < 5:
            issue = predict_issue(data,symps,symptoms)
            if '<br>'+issue not in issues:
                issues.append('<br>'+issue)
        for i in range(len(issues)):
            issues[i] = CARD_TOP+issues[i]+CARD_BOT+str(97-i*2)+'%'+CARD_T
        package = {'issue':issues}
        resp = Response(issues, status=200)
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

if '__main__' == __name__:
    app.run(debug=True)
