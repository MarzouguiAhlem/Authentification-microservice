from pymongo import MongoClient
import os
from dotenv import load_dotenv


load_dotenv()

try:
    mongo_uri = os.getenv('MONGO_URI')
    client = MongoClient(mongo_uri)

    db = client['mydatabase']
    print('MongoDB connected successfully!')
except Exception as e:
    print('Error connecting to MongoDB:', e)