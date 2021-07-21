########  imports  ##########
from __future__ import print_function
import json
import requests
from flask import Flask, jsonify, request, render_template, Response
import time, os
from nltk.tokenize import word_tokenize
import subprocess, shlex
from pprint import pprint




app = Flask(__name__)

@app.route('/')
@app.route('/home')
def home():
    return 'Hello, World!'

# @app.route('/API', methods=['POST'])
# def correctGrammarBot(text):
@app.route('/api/grammarbot', methods=['POST', 'OPTIONS'])
def use_grammarbot_api():
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)
        api_data = {
            "text": received_frontend_text,
            "language": "en-US"
        }

        api_url = "https://grammarbot.p.rapidapi.com/check"

        api_headers = {
            "content-type": "application/x-www-form-urlencoded",
            "x-rapidapi-key": "8cf6a2094fmsh9120019332669dcp1e2c8fjsne932dd0a9bd3",
            "x-rapidapi-host": "grammarbot.p.rapidapi.com",
            "useQueryString": "true"
        }

        api_result = requests.post(url=api_url, headers=api_headers, data=api_data).json()
        sending_api_result = {}
        sending_api_result['text'] = received_frontend_text

        if api_result['matches']:
            sending_api_result['matches'] = api_result['matches']

        sending_api_result['time'] = round((time.time() -start)*1000 , 0)
        response.set_data(json.dumps(sending_api_result, indent=2))

    return response

@app.route('/api/languagetool', methods=['POST', 'OPTIONS'])
def use_languagetool_api():
    start = time.time()
    response = Response()

    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()
        received_frontend_text = received_frontend_data['text']

        url = "https://dnaber-languagetool.p.rapidapi.com/v2/check"
        payload = "text="+received_frontend_data['text']+"&language=en-US"
        headers = {
            'content-type': "application/x-www-form-urlencoded",
            'x-rapidapi-key': "8cf6a2094fmsh9120019332669dcp1e2c8fjsne932dd0a9bd3",
            'x-rapidapi-host': "dnaber-languagetool.p.rapidapi.com"
        }

        api_result = requests.request("POST", url, data=payload, headers=headers).json()
        # print(api_result)
        sending_api_result = {'matches' : []}
        sending_api_result['text'] = received_frontend_text
        if api_result['matches']:
            for value in api_result['matches']:
                matches = {'replacements' : []}
                matches['start'] = value['offset']
                matches['end'] = value['length']+ value['offset']
                matches['word'] = received_frontend_text[ value['offset'] : value['offset'] + value['length'] ]
                for idx, subvalue in enumerate(value['replacements']) :
                    matches['replacements'].append( {'value': subvalue['value'] } )
                sending_api_result['matches'].append(matches)
        sending_api_result['time'] = round((time.time() -start)*1000 , 0)
        response.set_data(json.dumps(sending_api_result, indent=2))
    print(sending_api_result)
    return response
    # return api_result

@app.route('/api/gector', methods=['POST', 'OPTIONS'])
def use_gector():
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)

        lines = received_frontend_text.split('\n')
        input_sentence = '\n'.join([' '.join(word_tokenize(line)) for line in lines])
        print(f'input : {input_sentence}')

        with open('incorr.txt', 'w') as file:
            file.write(input_sentence)

        '''
        subprocess.call("""bash -c 'source activate gector && python ../../ai/gector/predict.py \\
            --model_path ../../ai/gector/model_v1/best.th \\
            --vocab_path ../../ai/gector/data/output_vocabulary \\
            --input_file incorr.txt \\
            --output_file corr.txt \\
            --iteration_count 5 \\
            --additional_confidence 0.2 \\
            --min_error_probability 0.5'""", shell=True)
        while True:
            if os.path.isfile('corr.txt'):
                break
            time.sleep(0.1)
        '''

        while True:
            if os.path.isfile('done.txt'):
                break
            else:
                time.sleep(0.01)

        with open('corr.json') as file:
            matches = json.load(file)

        os.remove('corr.json')
        os.remove('done.txt')

        sending_api_result = {}
        sending_api_result['text'] = input_sentence
        sending_api_result['matches'] = matches['matches']
        sending_api_result['correct'] = matches['correct']
        sending_api_result['time'] = round((time.time() -start)*1000 , 0)
        print('{sending_api_result}')
        response.set_data(json.dumps(sending_api_result, indent=2))    
    
    

    return response

@app.route('/api/fairseq', methods=['POST', 'OPTIONS'])
def use_fairseq():
    start = time.time()
    response = Response()
    if request.method == 'OPTIONS':
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add('Access-Control-Allow-Headers', "*")
        response.headers.add('Access-Control-Allow-Methods', "POST")

    elif request.method == 'POST':
        response.headers.add("Access-Control-Allow-Origin", "*")

        received_frontend_data = request.get_json()

        received_frontend_text = received_frontend_data['text']
        # print(received_frontend_text)

        with open('./fairseq/input.txt', 'w') as file:
            file.write(received_frontend_text)

        try:
            os.remove('./fairseq/output.txt')
        except Exception as e:
            pass

        #
        # generate = '/home/ubuntu/workspace/edutem/ai/fairseq-gec/generate.sh'
        subprocess.call("bash /home/ubuntu/workspace/edutem/ai/fairseq-gec/generate.sh \\0 \\edutem", shell=True)
        #
        while True:
            if os.path.isfile('./fairseq/output.txt'):
                break
            time.sleep(0.1)


        with open('./fairseq/output.txt') as file:
            corr_text = file.read()

        sending_api_result = {}
        sending_api_result['text'] = corr_text
        sending_api_result['time'] = round((time.time() -start)*1000 , 0)
        response.set_data(json.dumps(sending_api_result, indent=2))

    print(sending_api_result)    

    return response




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8068, debug=True)
