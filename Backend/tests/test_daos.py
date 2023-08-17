
import unittest
from unittest.mock import patch
from daos import db

class TestDAOs(unittest.TestCase):

    @patch('daos.__init__.MongoClient') 
    def test_mongo_connect(self, mock_client):
        # Test successful connection
        mock_client.return_value.__enter__.return_value = {'mydatabase': 'testdb'}
        db = client['mydatabase']
        self.assertEqual(db, 'testdb')

        # Test connection failure
        mock_client.return_value.__enter__.side_effect = Exception('Failed to connect')
        with self.assertRaises(Exception):
            db = client['mydatabase']