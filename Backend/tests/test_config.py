
import unittest
from unittest.mock import patch

from utils.config import ApplicationConfig

class TestConfig(unittest.TestCase):

    def test_secret_key(self):
        config = ApplicationConfig()
        self.assertEqual(config.SECRET_KEY, 'mysecretkey')
    
    def test_redis_url(self):
        with patch.dict('os.environ', {'REDIS_URL': 'redis://testurl'}):
            config = ApplicationConfig()
            self.assertEqual(config.SESSION_REDIS_URL, 'redis://testurl')

    def test_mail_username(self):
        with patch.dict('os.environ', {'MAIL_USERNAME': 'myuser'}):
            config = ApplicationConfig()
            self.assertEqual(config.MAIL_USERNAME, 'myuser')

    def test_jwt_access_token_expires(self):
        config = ApplicationConfig()
        self.assertEqual(config.JWT_ACCESS_TOKEN_EXPIRES, timedelta(hours=1))

    def test_jwt_refresh_token_expires(self):
        config = ApplicationConfig()
        self.assertEqual(config.JWT_REFRESH_TOKEN_EXPIRES, timedelta(hours=1))