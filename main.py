#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
from flask import Flask, render_template, Response, request
from slimish_jinja import SlimishExtension
from model import db, Tweet, modelSerializer


class MyFlask(Flask):
    jinja_options = Flask.jinja_options
    jinja_options['extensions'].append(SlimishExtension)

# setup application
app = MyFlask(__name__, static_folder='assets')
app.jinja_env.slim_debug = False


@app.route('/')
def index():
    print request.headers
    if request.headers['Content-Type'] == 'application/json':
        with db:
            if Tweet.objects.count() > 0:
                tweets = Tweet.objects.order_by('-created_at')
                serialized = [modelSerializer(tweet) for tweet in tweets]
                datas = json.dumps(serialized)
            else:
                datas = json.dumps({"data": "null"})
        return Response(datas, mimetype="application/json", status=200)
    else:
        return render_template('index.slim')


@app.route('/<int:id>')
def show(id):
    if request.headers['Content-Type'] == 'application/json':
        with db:
            tweet = Tweet.objects(sid=id).first()
        data = json.dumps(modelSerializer(tweet))
        return Response(data, content_type="application/json", status=200)
    return render_template('index.slim')


@app.route('/create', methods=["POST"])
def create():
    data = request.form
    tweet = Tweet(text=data["text"])
    try:
        tweet.save()
    except Exception:
        print e
    serialized = modelSerializer(tweet)
    resData = json.dumps(serialized)
    return Response(resData, content_type="application/json", status=200)


if __name__ == '__main__':
    app.run(debug=True)
