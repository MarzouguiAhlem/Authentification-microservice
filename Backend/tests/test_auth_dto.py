
import unittest
from dto.auth_dto import AuthDTO

class TestAuthDTO(unittest.TestCase):

    def test_init_with_first_last_name(self):
        data = {'firstName': 'John', 'lastName': 'Doe', 'email': 'jdoe@test.com'}
        dto = AuthDTO(data)
        self.assertEqual(dto.name, 'John Doe')

    def test_init_with_name(self):
        data = {'name': 'John Doe', 'email': 'jdoe@test.com'}
        dto = AuthDTO(data)
        self.assertEqual(dto.name, 'John Doe')

    def test_get_signin_data(self):
        data = {'email': 'jdoe@test.com', 'password': 'pass123'}
        dto = AuthDTO(data)
        signin_data = dto.get_signin_data()
        self.assertEqual(signin_data['email'], 'jdoe@test.com')
        self.assertEqual(signin_data['password'], 'pass123')

    def test_get_signup_data(self):
        data = {'name': 'John Doe', 'email': 'jdoe@test.com'}
        dto = AuthDTO(data)
        signup_data = dto.get_signup_data()
        self.assertEqual(signup_data['name'], 'John Doe')
        self.assertEqual(signup_data['email'], 'jdoe@test.com')
        self.assertIsNotNone(signup_data['_id'])

    def test_get_session_data(self):
        data = {'name': 'John Doe', 'email': 'jdoe@test.com'}
        dto = AuthDTO(data)
        session_data = dto.get_session_data()
        self.assertEqual(session_data['name'], 'John Doe')
        self.assertEqual(session_data['email'], 'jdoe@test.com')

    def test_from_user(self):
        mock_user = MockUser(email='jdoe@test.com')
        dto = AuthDTO.from_user(mock_user)
        self.assertEqual(dto.email, 'jdoe@test.com')