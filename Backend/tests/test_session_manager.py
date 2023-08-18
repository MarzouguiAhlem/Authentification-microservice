# tests/test_session_manager.py

import unittest
from unittest.mock import patch
from utils.session_manager import SessionManager

class TestSessionManager(unittest.TestCase):

    def setUp(self):
        self.session_manager = SessionManager(None)

    def test_start_verified_session(self):
        mock_session_data = {'email': 'test@example.com', 'isVerified': True}
        
        with patch('utils.session_manager.session') as mock_session:
            with patch('utils.session_manager.create_access_token') as mock_create_access_token:
                with patch('utils.session_manager.create_refresh_token') as mock_create_refresh_token:
                    response = self.session_manager.startVerifiedSession(mock_session_data)

                    self.assertTrue(response['logged_in'])
                    self.assertEqual(response['email'], 'test@example.com')
                    mock_session.__setitem__.assert_called_with('user', mock_session_data)  
                    mock_create_access_token.assert_called()
                    mock_create_refresh_token.assert_called()

    def test_start_unverified_session(self):
        mock_session_data = {'email': 'test@example.com', 'isVerified': False}
        
        with patch('utils.session_manager.session') as mock_session:
            with patch('utils.session_manager.MailSender') as mock_mail_sender:
                response = self.session_manager.startUnverifiedSession(mock_session_data)

                self.assertFalse(response['logged_in'])
                mock_session.__setitem__.assert_called_with('user', mock_session_data)
                mock_mail_sender.return_value.send.assert_called()

    def test_send_code(self):
        with patch('utils.session_manager.session') as mock_session:
            with patch('utils.session_manager.MailSender') as mock_mail_sender:
                mock_session.__getitem__.return_value = '123456' 
                self.session_manager.send_code(['test@example.com'], 'Test', 'Body')
                
                mock_session.__setitem__.assert_called_with('verificationCode', '123456')
                mock_mail_sender.return_value.set_params.assert_called()
                mock_mail_sender.return_value.send.assert_called_with(
                    'Test', 'Body\nVerification Code : 123456'
                )

    def test_verify_confirmation_code_match(self):
        with patch('utils.session_manager.session') as mock_session:
             mock_session.__getitem__.return_value = '123456'
             result = self.session_manager.verify_confirmation_code(123456)
             self.assertIsNotNone(result)

    def test_verify_confirmation_code_not_match(self):
        with patch('utils.session_manager.session') as mock_session:
             mock_session.__getitem__.return_value = '123456' 
             result = self.session_manager.verify_confirmation_code(654321)
             self.assertIsNone(result)

    def test_verify_session_valid(self):
        with patch('utils.session_manager.session') as mock_session:
             mock_session.sid = 'testsessionid'
             result = self.session_manager.verify_session('testsessionid.data')
             self.assertTrue(result)

    def test_verify_session_invalid(self):
        with patch('utils.session_manager.session') as mock_session:
             mock_session.sid = 'testsessionid'
             result = self.session_manager.verify_session('invalid.data')
             self.assertFalse(result)

    def test_destroy_session(self):
        with patch('utils.session_manager.session') as mock_session:
            mock_session.sid = 'testcookie'
            self.session_manager.destroy_session('testcookie.data')
            
            mock_session.pop.assert_called_with('logged_in', None)
            mock_session.pop.assert_called_with('user')
            mock_session.pop.assert_called_with('verificationCode', None)

    def test_destroy_invalid_session(self):
        with patch('utils.session_manager.session') as mock_session:
            mock_session.sid = 'testcookie'
            response = self.session_manager.destroy_session('invalidcookie')
            self.assertEqual(response['msg'], 'cannot signout')

    def test_get_session_info(self):

    # Test with session
        with patch('utils.session_manager.session') as mock_session:
            mock_session.__contains__.return_value = True
            mock_session.__getitem__.return_value = {'user': 'test'}

            result = self.session_manager.get_session_info()

            self.assertEqual(result['logged_in'], mock_session.get('logged_in')) 
            self.assertEqual(result['current_user'], {'user': 'test'})

    # Test without session
        with patch('utils.session_manager.session') as mock_session:
            mock_session.__contains__.return_value = False

            result = self.session_manager.get_session_info()

            self.assertEqual(result, {'msg': 'empty session'})


    def test_is_logged_in(self):
    
    # Test when logged in
        with patch('utils.session_manager.session') as mock_session:
            mock_session.get.return_value = True
            result = self.session_manager.is_logged_in()
            self.assertTrue(result)

    # Test when not logged in 
        with patch('utils.session_manager.session') as mock_session:
            mock_session.get.return_value = False
            result = self.session_manager.is_logged_in()
            self.assertFalse(result)