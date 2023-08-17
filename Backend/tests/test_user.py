
import unittest 
from models.user import User

class TestUser(unittest.TestCase):

    def test_init(self):
        user = User('John Doe', 'jdoe@test.com', 'password123', '123 Main St', '555-1234')
        self.assertEqual(user.name, 'John Doe')
        self.assertEqual(user.email, 'jdoe@test.com')
        self.assertEqual(user.password, 'password123')
        self.assertEqual(user.address, '123 Main St')
        self.assertEqual(user.phone, '555-1234')

    def test_id_generated(self):
        user1 = User('John Doe', 'jdoe@test.com', 'password123', '123 Main St', '555-1234')
        user2 = User('Jane Doe', 'jane@test.com', 'password456', '456 Park Ave', '555-5678')
        self.assertIsNotNone(user1.id)
        self.assertIsNotNone(user2.id)
        self.assertNotEqual(user1.id, user2.id)

    def test_is_verified_default(self):
        user = User('John Doe', 'jdoe@test.com', 'password123', '123 Main St', '555-1234')
        self.assertFalse(user.isVerified)

    def test_role_default(self):
        user = User('John Doe', 'jdoe@test.com', 'password123', '123 Main St', '555-1234')
        self.assertEqual(user.role, 'user')

    def test_get_user(self):
        user = User('John Doe', 'jdoe@test.com', 'password123', '123 Main St', '555-1234')
        expected = {
            'id': user.id,
            'name': 'John Doe',
            'email': 'jdoe@test.com',
            'password': 'password123',
            'address': '123 Main St',
            'phone': '555-1234',
            'isVerified': False,
            'role': 'user'
        }
        self.assertEqual(user.getUser(), expected)

    def test_repr(self):
        user = User('John Doe', 'jdoe@test.com', 'password123', '123 Main St', '555-1234')
        self.assertEqual(repr(user), "<User %s John Doe (jdoe@test.com)>" % user.id)