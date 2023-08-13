from flask import request, jsonify
from services.auth_service import AuthService
from dto.auth_dto import AuthDTO

class AuthController:
    def __init__(self,app):
        self.auth_service = AuthService(app)

    
    def signup(self):
        signup_data = AuthDTO(request.json).get_signup_data()
        session_data = AuthDTO(request.json).get_session_data()
        response = self.auth_service.signup_user(signup_data,session_data)
        return jsonify(response)

    def login(self):
        login_data = AuthDTO(request.json).get_signin_data()
        response = self.auth_service.authenticate(login_data)
        return jsonify(response)
    

    def signout(self):
        session_cookie = request.cookies.get('session')
        response = self.auth_service.signout(session_cookie)
        return jsonify(response)
    


    def sendConfirmationCode(self):
        email = request.json.get('email')
        response = self.auth_service.send_confirmation_code(email)
        return jsonify(response)
    

    def verifyEmail(self):
        requestCode = int(request.json.get('verificationCode'))
        response = self.auth_service.verify_email(requestCode)
        return jsonify(response)
    
    
    def getSessionInfo(self):
        response = self.auth_service.get_session_info()
        return jsonify(response)
    

    def resetPasswordStep1(self):
        email = request.json.get("email")
        response = self.auth_service.reset_password_step1(email)
        return jsonify(response)
    
    def resetPasswordStep2(self):
        requestCode = int(request.json.get('verificationCode'))
        response = self.auth_service.reset_password_step2(requestCode)
        return jsonify(response)
    
    def resetPasswordStep3(self):
        password = request.json.get("password")
        session_cookie = request.cookies.get('session')
        response = self.auth_service.reset_password_step3(password, session_cookie)
        return jsonify(response)