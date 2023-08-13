from functools import wraps
from controllers.auth_controller import AuthController
from flask import Flask

app = Flask(__name__)
auth_controller = AuthController(app)


@app.route('/test', methods=['GET'])
def test():
    return 'This is a test route!'

@app.route('/user/login', methods=['POST'])
def login():
    return auth_controller.login()

@app.route('/user/signout', methods=['GET'])
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
def getSessionInfo():
    return auth_controller.getSessionInfo()

@app.route('/resetPasswordStep1', methods=['POST'])
def resetPasswordStep1():
    return auth_controller.resetPasswordStep1()

@app.route('/resetPasswordStep2', methods=['POST'])
def resetPasswordStep2():
    return auth_controller.resetPasswordStep2()

@app.route('/resetPasswordStep3', methods=['POST'])
def resetPasswordStep3():
    return auth_controller.resetPasswordStep3()

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0', port=5000)