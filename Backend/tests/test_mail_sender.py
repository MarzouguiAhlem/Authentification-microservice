
import unittest
from unittest.mock import patch

from utils.mail_sender import MailSender

class TestMailSender(unittest.TestCase):

    def setUp(self):
        self.mail_sender = MailSender(None)

    def test_set_params(self):
        self.mail_sender.set_params(
            sender='test@example.com',
            recipients=['recipient1@example.com', 'recipient2@example.com']
        )
        self.assertEqual(self.mail_sender.sender, 'test@example.com')
        self.assertEqual(self.mail_sender.recipients, ['recipient1@example.com', 'recipient2@example.com'])

    @patch('utils.mail_sender.Message')
    @patch('utils.mail_sender.Mail.send')
    def test_send(self, mock_send, mock_message):
        self.mail_sender.set_params(
            sender='test@example.com',
            recipients=['recipient@example.com']
        )

        self.mail_sender.send('Test Subject', 'Test Body')

        mock_message.assert_called_with(
            'Test Subject',
            sender='test@example.com',
            recipients=['recipient@example.com']
        )

        mock_send.assert_called_with(mock_message.return_value)