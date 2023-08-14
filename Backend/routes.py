from functools import wraps
from controllers.auth_controller import AuthController
from flask import Flask

app = Flask(__name__) # Create a new Flask app instance
auth_controller = AuthController(app) # Create a new AuthController instance and pass in the Flask app instance


#decorators*******************************************************************

def loginRequired(f):
    @wraps(f)
    def decorated_function_login(*args, **kwargs):
        return auth_controller.decorated_function_login(f, *args, **kwargs)
    return decorated_function_login


@app.route('/protected_login', methods=['GET'])
@loginRequired
def protected_login():
    return 'This is a protected route!'


def logoutRequired(f):
    @wraps(f)
    def decorated_function_logout(*args, **kwargs):
        return auth_controller.decorated_function_logout(f, *args, **kwargs)
    return decorated_function_logout

@app.route('/protected_logout', methods=['GET'])
@logoutRequired
def protected_logout():
    return 'This is a protected route!'


#********************************************************************************



@app.route('/test', methods=['GET']) # for testing
def test():
    return 'This is a test route!'

@app.route('/user/login', methods=['POST']) # the route for the user login
def login():
    return auth_controller.login() # Call the login method of the AuthController instance when the route is accessed

@app.route('/user/signout', methods=['GET'])
@loginRequired
def logout():
    return auth_controller.signout()

@app.route('/user/signup', methods=['POST'])
def register():
    return auth_controller.signup()

@app.route("/user/sendConfirmationCode", methods=['POST'])
def sendConfirmationCode():
    return auth_controller.sendConfirmationCode()

@app.route('/user/verifyEmail', methods=['POST'])
def verifyEmail():
    return auth_controller.verifyEmail()

@app.route('/@me', methods=['GET'])
@loginRequired
def getSessionInfo():
    return auth_controller.getSessionInfo()

@app.route('/resetPasswordStep1', methods=['POST'])
@logoutRequired
def resetPasswordStep1():
    return auth_controller.resetPasswordStep1()

@app.route('/resetPasswordStep2', methods=['POST'])
@logoutRequired
def resetPasswordStep2():
    return auth_controller.resetPasswordStep2()

@app.route('/resetPasswordStep3', methods=['POST'])
@logoutRequired
def resetPasswordStep3():
    return auth_controller.resetPasswordStep3()

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000) # Start the Flask app on port 5000 and listen for incoming requests