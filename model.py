#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
from bson.objectid import ObjectId
from mongoengine import *


class ConnectDB():
    def __init__(self):
        self.db = None

    def __enter__(self):
        self.connect()

    def __exit__(self, exc_type, exc_value, traceback):
        if exc_type:
            self.db = None
            return False
        self.close()
        self.db = None
        return True

    def close(self):
        self.db.disconnect()
        print self.db, "closed"

    def connect(self):
        self.db = connect('studymongo')
        print self.db, "connected"

db = ConnectDB()


class Tweet(Document):
    sid = SequenceField(unique=True)
    text = StringField(required=True)
    created_at = DateTimeField(default=datetime.now())
    updated_at = DateTimeField(default=datetime.now())


def modelSerializer(model):
    result = {}
    for k in model:
        val = model[k]
        if isinstance(val, (str, basestring, int, float)):
            result.setdefault(k, val)
        elif isinstance(val, list):
            l = [modelSerializer(v) for v in val]
            result.setdefault(k, l)
        elif isinstance(val, dict):
            result.setdefault(k, modelSerializer(val))
        elif isinstance(val, datetime):
            result.setdefault(k, val.strftime('%Y/%m/%d %H:%M:%S'))
        elif isinstance(val, Document):
            result.setdefault(k, modelSerializer(val))
        elif isinstance(val, ObjectId):
            result.setdefault(k, str(val))
    return result
