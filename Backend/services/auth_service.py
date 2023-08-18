from daos.user_dao import UserDAO
from utils.password_hasher import PasswordHasher
from utils.session_manager import SessionManager

class AuthService:
    def __init__(self, app):
        # Initialize the AuthService instance with a UserDAO instance, a PasswordHasher instance, and a SessionManager instance
        self.user_dao = UserDAO()
        self.password_hasher = PasswordHasher()
        self.session_manager = SessionManager(app)

    def is_logged_in(self):
        return self.session_manager.is_logged_in()
    

    def signup_user(self, signup_data, session_data):
        email = signup_data["email"] 
        password = signup_data["password"]
        hashed_password = self.password_hasher.hash_password(password) # Hash the password using the PasswordHasher instance
        signup_data["password"] = hashed_password # Replace the password in the signup_data dictionary with the hashed password

        if self.user_dao.find_by_email(email) is not None:
            return {"msg": "Email address already in use"}

        self.user_dao.save(signup_data)

        new_session = self.session_manager.startSession(session_data)
        return new_session
    

    def authenticate(self, login_data):
        try:
            email = login_data["email"] # Get the email from the login_data dictionary
            password = login_data["password"] # Get the password from the login_data dictionary
            user = self.user_dao.find_by_email(email) # Find the user with the given email in the database

            if user is None: # If no user is found, return an error message
                return {
                    "msg": "Invalid login credentials"
                }

            if not self.password_hasher.check_password(password, user.password): # If the password is incorrect, return an error message
                return {
                    "msg": "Invalid login credentials"
                }
            
            session_data = self.user_dao.find_session_by_email(email) # Find the session data for the user with the given email
            
            new_session = self.session_manager.startSession(session_data) # Start a new session for the user
            return new_session
    
        except Exception as ex:
            print(ex)
            return {
                "msg": "cannot login",
                "errorMsg": "exception"
            }
        

    def signout(self, session_cookie):
        # Destroy the session with the given session cookie
        return self.session_manager.destroy_session(session_cookie)
    

    

    def send_confirmation_code(self, email):
        try:
            if not email: # If no email is provided, return an error message
                return{'error': 'Email is required'}
            session_data = self.user_dao.find_session_by_email(email)
            if session_data is None:
                raise ValueError("Email not found in database")
            subject = "Action Required: Confirm your email"
            body = "We created an account for you. Please confirm your email address."
            self.session_manager.send_code([email], subject, body) # Send the confirmation code to the user's email address
            return {
                "msg": "check your email!",
                "current_user": session_data,
                "logged_in": False
            }
        except ValueError as ex:
            print("Exception: "+ str(ex))
            return {
                "msg": "cannot send message",
                "errorMsg": str(ex)
            }
        except Exception as ex:
            print("Exception: "+ str(ex))
            return {
                "msg": "cannot send message",
                "errorMsg": "exception"
            }
    
    
    def verify_email(self, requestCode):
        try:
            session_data = self.session_manager.verify_confirmation_code(requestCode) # Verify the confirmation code and get the session data
            if session_data is not None: # If the session data is not None, update the user's email verification status and start a new session
                email = session_data['email']
                update_data = {"isVerified": True}
                if (self.user_dao.update(email,update_data)):
                    session_data["isVerified"]=True
                    new_session = self.session_manager.startSession(session_data)
                    return new_session
                else:
                    {
                        "msg": "verification failed"
                    }
            else:
                return {
                "msg": "not equal"
                }
        except Exception as ex:
            print(ex)
            return {
                "msg": "cannot verify",
                "errorMsg": "exception"
            }
        
    def get_session_info(self):
        sessionInfo = self.session_manager.get_session_info()
        return sessionInfo
    
    def reset_password_step1(self, email):
        try:
            if self.user_dao.find_by_email(email) is not None: # If a user with the given email exists, start the password reset process
                subject = "Password Reset" # Set the subject of the password reset email
                body = "We received a request to change your password." # Set the body of the password reset email
                self.session_manager.start_reset_password_session(email) # Start the password reset session
                self.session_manager.send_code([email],subject=subject,body=body) # Send the password reset code to the user's email address
                return {"msg": "check your email for confirmation code"}
            else:
                return {"msg": "there is no account with this email"}
        except Exception as ex:
            print("Exception: ",str(ex))
            return {"msg": "cannot reset password", "errorMsg": "exception"}
        
    def reset_password_step2(self, requestCode):
        try:
            session_data = self.session_manager.verify_confirmation_code(requestCode)
            if session_data is not None:
                email=session_data["email"]
                self.session_manager.start_reset_password_session(email,True)
                return {"msg": "code verified"}
            else: 
                return {"msg": "code not matched"}
        except Exception as ex:
            print("Exception: ",str(ex))
            return {"msg": "cannot reset password", "errorMsg": "exception"}
    
    def reset_password_step3(self, password, session_cookie):
        try:
            session_data = self.get_session_info()["current_user"]
            email = session_data['email']
            hashed_password = self.password_hasher.hash_password(password)
            update_data = {"password": hashed_password}
            session_is_verified = self.session_manager.verify_session(session_cookie)
            
            if session_data["code_verified"] and session_is_verified:
                self.user_dao.update(email,update_data)
                self.signout(session_cookie)
                return {"msg": "password changed successfully"}
            else:
                return {"msg": "Code not verified, Try Later"}
            
        except Exception as ex:
            return {"msg": "Internal error, Try Later", "errorMsg": "exception"} 
