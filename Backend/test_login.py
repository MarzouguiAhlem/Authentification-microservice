import unittest
from unittest.mock import patch

from controllers.auth_controller import AuthController  
from services.auth_service import AuthService
from daos.auth_dao import AuthDAO
from utils.session_manager import SessionManager

class TestLoginFlow(unittest.TestCase):

    def test_valid_login(self):
        
        # Arrange
        mock_user = {'email': 'test@example.com', 'password': 'password123'}
        
        with patch('daos.auth_dao.AuthDAO') as mock_dao:
            mock_dao.return_value.find_by_email.return_value = mock_user
            
        auth_controller = AuthController()
            
        # Act 
        with patch('services.auth_service.SessionManager') as mock_session_manager:
            mock_session_manager.return_value.startSession.return_value = {'logged_in': True}
            
            request_data = {'email': 'test@example.com', 'password': 'password123'}
            result = auth_controller.login(request_data)
            
        # Assert
        self.assertTrue(result['logged_in'])