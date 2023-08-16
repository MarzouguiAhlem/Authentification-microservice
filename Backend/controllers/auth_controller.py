from flask import request, jsonify
from services.auth_service import AuthService
from dto.auth_dto import AuthDTO

class AuthController:
    def __init__(self,app):
        self.auth_service = AuthService(app) # Create a new AuthService instance and pass in the Flask app instance

    
    def signup(self):
        signup_data = AuthDTO(request.json).get_signup_data() # Create a new AuthDTO instance and pass in the request JSON data, then get the signup data
        session_data = AuthDTO(request.json).get_session_data() # Create a new AuthDTO instance and pass in the request JSON data, then get the session data
        response = self.auth_service.signup_user(signup_data,session_data) # Call the signup_user method of the AuthService instance and pass in the signup and session data
        return jsonify(response) # Return the response as a JSON object

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
        email = request.json.get("email") # Get the email from the request JSON data
        response = self.auth_service.reset_password_step1(email)
        return jsonify(response)
    
    def resetPasswordStep2(self):
        requestCode = int(request.json.get('code')) # Get the verification code from the request JSON data and convert it to an integer
        response = self.auth_service.reset_password_step2(requestCode)
        return jsonify(response)
    
    def resetPasswordStep3(self):
        password = request.json.get("password") # Get the new password from the request JSON data
        session_cookie = request.cookies.get('session') # Get the session cookie from the request
        response = self.auth_service.reset_password_step3(password, session_cookie)
        return jsonify(response)


    def decorated_function_login(self, f, *args, **kwargs):
        if not self.auth_service.is_logged_in():
            return jsonify(msg="You must be logged in to perform this action"), 401
        return f(*args, **kwargs)
    
    def decorated_function_logout(self, f, *args, **kwargs):
        if  self.auth_service.is_logged_in():
            return jsonify(msg="You must be logged out to perform this action"), 401
        return f(*args, **kwargs)
        