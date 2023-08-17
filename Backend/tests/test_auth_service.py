
import unittest
from unittest.mock import patch
from services.auth_service import AuthService

class TestAuthService(unittest.TestCase):

    def setUp(self):
        self.service = AuthService(None)

    def test_authenticate_success(self):
        with patch('services.auth_service.AuthDAO') as mock_dao:
            mock_user = {'email': 'test@example.com', 'password': 'pass123'}
            mock_dao.return_value.find_by_email.return_value = mock_user
            mock_dao.return_value.find_session_by_email.return_value = {}
            
            with patch('services.auth_service.SessionManager') as mock_session_manager:
                login_data = {'email': 'test@example.com', 'password': 'pass123'}
                response = self.service.authenticate(login_data)
                
                self.assertEqual(response['email'], 'test@example.com')
                mock_session_manager.return_value.startSession.assert_called()

    def test_authenticate_invalid_password(self):
        with patch('services.auth_service.AuthDAO') as mock_dao:
            mock_user = {'email': 'test@example.com', 'password': 'pass123'}
            mock_dao.return_value.find_by_email.return_value = mock_user
            
            login_data = {'email': 'test@example.com', 'password': 'wrongpass'}
            response = self.service.authenticate(login_data)
            self.assertEqual(response, {'msg': 'Invalid credentials'})

    def test_authenticate_user_not_found(self):
        with patch('services.auth_service.AuthDAO') as mock_dao:
            mock_dao.return_value.find_by_email.return_value = None
            
            login_data = {'email': 'invalid@email.com', 'password': 'pass123'}
            response = self.service.authenticate(login_data)
            self.assertEqual(response, {'msg': 'Invalid credentials'})

    def test_signup_success(self):
        with patch('services.auth_service.AuthDAO') as mock_dao:
            mock_dao.return_value.find_by_email.return_value = None
            mock_dao.return_value.save.return_value = True
            
            signup_data = {'email': 'test@example.com'}
            response = self.service.signup_user(signup_data, {})
            self.assertEqual(response['msg'], 'User created')

    def test_signup_email_exists(self):
        with patch('services.auth_service.AuthDAO') as mock_dao:
            mock_dao.return_value.find_by_email.return_value = 'user'
            
            signup_data = {'email': 'test@example.com'}
            response = self.service.signup_user(signup_data, {})
            self.assertEqual(response['msg'], 'Email already exists')


    def test_signout(self):
        with patch('services.auth_service.SessionManager') as mock_session_manager:
            mock_session_manager.destroy_session.return_value = {'msg': 'Signed out'}
            mock_cookie = 'testcookie'
            response = self.service.signout(mock_cookie)
            self.assertEqual(response, {'msg': 'Signed out'})

    