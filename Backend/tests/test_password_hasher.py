
import unittest
from unittest.mock import patch
from utils.password_hasher import PasswordHasher

class TestPasswordHasher(unittest.TestCase):

    def setUp(self):
        self.hasher = PasswordHasher()
    
    def test_hash_password(self):
        with patch('utils.password_hasher.bcrypt') as mock_bcrypt:
            mock_bcrypt.hashpw.return_value = b'hashedpassword'
            password = 'plaintextpassword'
            hashed = self.hasher.hash_password(password)
            self.assertEqual(hashed, 'hashedpassword')
            
            mock_bcrypt.hashpw.assert_called_with(
                password.encode('utf-8'), self.hasher.salt
            )

    def test_check_password(self):
        with patch('utils.password_hasher.bcrypt') as mock_bcrypt:
            mock_bcrypt.checkpw.return_value = True
            password = 'plaintextpassword'
            hashed = 'hashedpassword'
            is_valid = self.hasher.check_password(password, hashed)
            self.assertTrue(is_valid)

            mock_bcrypt.checkpw.assert_called_with(
                password.encode('utf-8'), hashed.encode('utf-8')  
            )