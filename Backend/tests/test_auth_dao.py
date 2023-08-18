
import unittest
from unittest.mock import patch
from daos.auth_dao import AuthDAO
from models.user import User

class TestAuthDAO(unittest.TestCase):

    def setUp(self):
        self.dao = AuthDAO()

    def test_find_by_email_success(self):
        with patch('daos.auth_dao.db') as mock_db:
             mock_db['users'].find_one.return_value = {'email': 'test@example.com'}
             user = self.dao.find_by_email('test@example.com')
             self.assertEqual(user.email, 'test@example.com')

    def test_find_by_email_not_found(self):
         with patch('daos.auth_dao.db') as mock_db:
              mock_db['users'].find_one.return_value = None
              user = self.dao.find_by_email('invalid@email.com')
              self.assertIsNone(user)

    def test_save(self):
        with patch('daos.auth_dao.db') as mock_db:
             mock_db['users'].insert_one.return_value = True
             signup_data = {'email': 'test@example.com'}
             returned_user = self.dao.save(signup_data)
             expected_user = User(email='test@example.com')
             self.assertEqual(returned_user.email, expected_user.email)

    def test_find_session_by_email_success(self):
        with patch('daos.auth_dao.db') as mock_db:
            mock_user = {'email': 'test@example.com'}
            mock_db['users'].find_one.return_value = mock_user
            session = self.dao.find_session_by_email('test@example.com')
            self.assertIsNotNone(session)
            self.assertEqual(session['email'], 'test@example.com')

    def test_find_session_by_email_not_found(self):
        with patch('daos.auth_dao.db') as mock_db:
            mock_db['users'].find_one.return_value = None
            session = self.dao.find_session_by_email('invalid@email.com')
            self.assertIsNone(session)

    def test_update_success(self):
        with patch('daos.auth_dao.db') as mock_db:
            mock_db['users'].find_one.return_value = {'email': 'test@example.com'}
            mock_db['users'].update_one.return_value = True
            updated_user = self.dao.update('test@example.com', {'active': True})
            self.assertTrue(updated_user.active)

    def test_update_user_not_found(self):
        with patch('daos.auth_dao.db') as mock_db:
            mock_db['users'].find_one.return_value = None
            updated_user = self.dao.update('invalid@email.com', {'active': True})
            self.assertIsNone(updated_user)