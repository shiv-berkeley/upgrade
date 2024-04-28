import cohere

from flask_sqlalchemy import SQLAlchemy
from google.cloud.sql.connector import Connector
from flask import Flask, render_template, jsonify, request

app = Flask(__name__)

@app.route("/chat")
def chat():
    print("chat")
    print("~~~~ Initiating Cohere client")
    client = cohere.Client("<YOUR KEY>")
    print("~~~~ Calling Cohere generate API")

    return render_template("index.html")

@app.route("/")
def index():
    return jsonify({"message": "Welcome to Aula AI"})


@app.route("/generate", methods=["GET"])
def root():
    print("~~~~ Initiating Cohere client")
    client = cohere.Client("<YOUR KEY>")
    print("~~~~ Calling Cohere generate API")
    response = client.generate(
    prompt=request.args.get('q'),
    max_tokens=500,
    temperature=0.5,
    k=40,
    p=0.95,
    )
    print("~~~~ Generations from Cohere")
    print(response.generations)

    response_list = response.generations[0].split('\n')
    print(response_list)

    return jsonify(list(response_list))


@app.route("/magic-prompts")
def magic_prompts():
    return render_template("magic-prompts.html")


if __name__ == "__main__":
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    # Flask's development server will automatically serve static files in
    # the "static" directory. See:
    # http://flask.pocoo.org/docs/1.0/quickstart/#static-files. Once deployed,
    # App Engine itself will serve those files as configured in app.yaml.
    app.run(host="127.0.0.1", port=8080, debug=True)
