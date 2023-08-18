
import unittest 
from unittest.mock import patch

from controllers.auth_controller import AuthController

class TestAuthController(unittest.TestCase):

    def setUp(self):
        self.controller = AuthController(None)

    def test_signup(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.signup_user.return_value = {'msg': 'User created'}
             request_data = {'firstName': 'John', 'lastName': 'Doe', 'email': 'jdoe@test.com'}
             response = self.controller.signup(request_data)
             self.assertEqual(response, {'msg': 'User created'})

    def test_login(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.authenticate.return_value = {'msg': 'Logged in'}
             request_data = {'email': 'jdoe@test.com', 'password': 'pass123'}
             response = self.controller.login(request_data)
             self.assertEqual(response, {'msg': 'Logged in'})
             
    def test_signout(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.signout.return_value = {'msg': 'Signed out'}
             mock_cookie = 'testcookie'
             response = self.controller.signout(mock_cookie)
             self.assertEqual(response, {'msg': 'Signed out'})
             
    def test_send_confirmation_code(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.send_confirmation_code.return_value = {'msg': 'Code sent'}
             request_data = {'email': 'jdoe@test.com'}
             response = self.controller.sendConfirmationCode(request_data)
             self.assertEqual(response, {'msg': 'Code sent'})

    def test_verify_email(self):
         with patch('controllers.auth_controller.AuthService') as mock_service:
              mock_service.return_value.verify_email.return_value = {'msg': 'Email verified'}
              request_data = {'verificationCode': 123456}
              response = self.controller.verifyEmail(request_data)
              self.assertEqual(response, {'msg': 'Email verified'})

    def test_get_session_info(self):
         with patch('controllers.auth_controller.AuthService') as mock_service:
              mock_service.return_value.get_session_info.return_value = {'user': 'jdoe'}
              response = self.controller.getSessionInfo()
              self.assertEqual(response, {'user': 'jdoe'})

    def test_reset_password_step1(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.reset_password_step1.return_value = {'msg': 'Reset email sent'}
             request_data = {'email': 'jdoe@test.com'}
             response = self.controller.resetPasswordStep1(request_data)
             self.assertEqual(response, {'msg': 'Reset email sent'})
             
    def test_reset_password_step2(self):
         with patch('controllers.auth_controller.AuthService') as mock_service:
              mock_service.return_value.reset_password_step2.return_value = {'msg': 'Code verified'}
              request_data = {'code': 123456}
              response = self.controller.resetPasswordStep2(request_data)
              self.assertEqual(response, {'msg': 'Code verified'})

    def test_reset_password_step3(self):
         with patch('controllers.auth_controller.AuthService') as mock_service:
              mock_service.return_value.reset_password_step3.return_value = {'msg': 'Password changed'}
              request_data = {'password': 'newpassword'} 
              mock_cookie = 'testcookie'
              response = self.controller.resetPasswordStep3(request_data, mock_cookie)
              self.assertEqual(response, {'msg': 'Password changed'})

    def test_decorated_function_login_success(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.is_logged_in.return_value = True
             mock_func = lambda x: x
             args = (1,) 
             response = self.controller.decorated_function_login(mock_func, *args)
             self.assertEqual(response, 1)

    def test_decorated_function_login_failure(self):
         with patch('controllers.auth_controller.AuthService') as mock_service:
              mock_service.return_value.is_logged_in.return_value = False
              mock_func = lambda x: x
              args = (1,)
              response = self.controller.decorated_function_login(mock_func, *args)
              expected = ({'msg': 'You must be logged in to perform this action'}, 401)
              self.assertEqual(response, expected)
              
    def test_decorated_function_logout_success(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.is_logged_in.return_value = False
             mock_func = lambda x: x
             args = (1,)
             response = self.controller.decorated_function_logout(mock_func, *args)
             self.assertEqual(response, 1)
             
    def test_decorated_function_logout_failure(self):
        with patch('controllers.auth_controller.AuthService') as mock_service:
             mock_service.return_value.is_logged_in.return_value = True
             mock_func = lambda x: x
             args = (1,)
             response = self.controller.decorated_function_logout(mock_func, *args)
             expected = ({'msg': 'You must be logged out to perform this action'}, 401)
             self.assertEqual(response, expected)