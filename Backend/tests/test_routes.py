import unittest
from unittest.mock import patch
from routes import app

class TestRoutes(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        
    def test_test_route(self):
        response = self.client.get('/test')
        self.assertEqual(response.data, b'This is a test route!')

    def test_protected_login_route(self):
        response = self.client.get('/protected_login')
        self.assertEqual(response.status_code, 401)

    def test_protected_logout_route(self):
        response = self.client.get('/protected_logout') 
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data, b'This is a protected route!')

    def test_login_route(self):
        with patch('routes.auth_controller') as mock_controller:
            mock_controller.login.return_value = {'msg': 'Logged in'}
            response = self.client.post('/user/login')
            self.assertEqual(response.json, {'msg': 'Logged in'})

    def test_logout_route(self):
        with patch('routes.auth_controller') as mock_controller:
            mock_controller.signout.return_value = {'msg': 'Logged out'}
            response = self.client.get('/user/signout')
            self.assertEqual(response.json, {'msg': 'Logged out'})

    def test_signup_route(self):
        with patch('routes.auth_controller') as mock_controller:
            mock_controller.signup.return_value = {'msg': 'Signed up'}
            response = self.client.post('/user/signup')
            self.assertEqual(response.json, {'msg': 'Signed up'})

    def test_send_confirmation_code_route(self):
        with patch('routes.auth_controller') as mock_controller:
            mock_controller.sendConfirmationCode.return_value = {'msg': 'Code sent'}
            response = self.client.post('/user/sendConfirmationCode')
            self.assertEqual(response.json, {'msg': 'Code sent'})

    def test_verify_email_route(self):
        with patch('routes.auth_controller') as mock_controller:
            mock_controller.verifyEmail.return_value = {'msg': 'Verified'}
            response = self.client.post('/user/verifyEmail')
            self.assertEqual(response.json, {'msg': 'Verified'})

    def test_get_session_info_route(self):
        with patch('routes.auth_controller') as mock_controller:
            mock_controller.getSessionInfo.return_value = {'user': 'test'}
            response = self.client.get('/@me')
            self.assertEqual(response.json, {'user': 'test'})

    