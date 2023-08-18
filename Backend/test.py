import unittest
from unittest.mock import patch
from controllers.auth_controller import AuthController
from flask import Flask, request, jsonify, Response
from unittest.mock import patch, MagicMock

class TestLoginFlow(unittest.TestCase):

    def create_app(self):
        app = Flask(__name__)
        app.config['SESSION_TYPE'] = 'your_session_type_here'
        return app

    @patch('controllers.auth_controller.AuthDTO')
    @patch('controllers.auth_controller.AuthService')
    def test_valid_login(self, mock_auth_service, mock_auth_dto):
        app = self.create_app()

        # Mocking
        mock_auth_service_instance = mock_auth_service.return_value
        mock_auth_service_instance.authenticate.return_value = {'logged_in': True}
        mock_auth_dto_instance = mock_auth_dto.return_value
        mock_auth_dto_instance.get_signin_data.return_value = {'email': 'test@example.com', 'password': 'password123'}

        auth_controller = AuthController(app)

        with app.test_request_context(json={'email': 'test@example.com', 'password': 'password123'}):
            result = auth_controller.login()

        self.assertIsInstance(result, Response)  # Check if it's a Response
        self.assertTrue(result.json['logged_in'])  # Access the JSON content

class TestSignupFlow(unittest.TestCase):

    def create_app(self):
        app = Flask(__name__)
        app.config['SESSION_TYPE'] = 'your_session_type_here'
        return app

    @patch('controllers.auth_controller.AuthDTO')
    @patch('controllers.auth_controller.AuthService')
    def test_valid_signup(self, mock_auth_service, mock_auth_dto):
        app = self.create_app()

        # Mocking
        mock_auth_service_instance = mock_auth_service.return_value
        mock_auth_service_instance.signup_user.return_value = {'user_id': 123, 'message': 'User registered'}
        mock_auth_dto_instance = mock_auth_dto.return_value
        mock_auth_dto_instance.get_signup_data.return_value = {'email': 'test@example.com', 'password': 'password123'}
        mock_auth_dto_instance.get_session_data.return_value = {'session_data_key': 'session_data_value'}

        auth_controller = AuthController(app)

        with app.test_request_context(json={'email': 'test@example.com', 'password': 'password123'}):
            result = auth_controller.signup()

        self.assertIsInstance(result, Response)  # Check if it's a Response
        self.assertEqual(result.json, {'user_id': 123, 'message': 'User registered'})  # Check JSON content

if __name__ == '__main__':
    unittest.main()
