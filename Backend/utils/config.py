from datetime import timedelta
from dotenv import load_dotenv
import os
import redis

load_dotenv()

# Define the ApplicationConfig class
class ApplicationConfig:
    # Set the SECRET_KEY attribute to the value of the SECRET_KEY environment variable
    SECRET_KEY = os.environ["SECRET_KEY"]
    # Set the session type to "redis"
    SESSION_TYPE = "redis"
    SESSION_PERMANENT = False
    SESSION_USE_SIGNER = True
    # SESSION_REDIS = redis.from_url("redis://172.16.238.4:6379") # when you are using docker container
    SESSION_REDIS = redis.from_url("redis://127.0.0.1:6379") # when you are on your local

    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USERNAME = os.environ.get("MAIL_USERNAME") # Set the MAIL_USERNAME attribute to the value of the MAIL_USERNAME environment variable
    MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD") # Set the MAIL_PASSWORD attribute to the value of the MAIL_PASSWORD environment variable
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False

    JWT_SECRET_KEY = os.environ["SECRET_KEY"]
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1) # Set the JWT_ACCESS_TOKEN_EXPIRES attribute to 1 hour
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(hours=1) # Set the JWT_REFRESH_TOKEN_EXPIRES attribute to 1 hour