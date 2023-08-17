from pymongo import MongoClient
import os

try:
    mongo_uri = os.getenv('MONGO_URI')
    client = MongoClient(mongo_uri)

    # client = MongoClient('mongodb://172.16.238.3:27017/') # when you are using docker container
    # client = MongoClient('mongodb://127.0.0.1:27017/') # when you are using your local 

    db = client['mydatabase']
    print('MongoDB connected successfully!')
except Exception as e:
    print('Error connecting to MongoDB:', e)