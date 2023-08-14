class AuthDTO:
    def __init__(self, data):
        if "firstName" in data and "firstName" in data: # Check if the data contains both 'firstName' and 'lastName' keys
            self.name = data.get('firstName') + " " + data.get('lastName') # If so, set the name attribute to the concatenation of the 'firstName' and 'lastName' values
            self.email = data.get('email') # Set the email attribute to the 'email' value
            self.password = data.get('password')
            self.address = data.get('address')
            self.phone = data.get('phone')
            self.isVerified = data.get('isVerified', False)
            self.role = data.get('role', 'admin')
        else:
            self.name = data.get('name') # If the data doesn't contain both 'firstName' and 'lastName' keys, set the name attribute to the 'name' value
            self.email = data.get('email')
            self.password = data.get('password')
            self.address = data.get('address')
            self.phone = data.get('phone')
            self.isVerified = data.get('isVerified', False)
            self.role = data.get('role', 'admin')
        

    def get_signin_data(self):
        return {
            "email": self.email,
            "password": self.password
        }
    
    def get_signup_data(self):
        import uuid
        return {
            "_id": uuid.uuid4().hex, # Generate a new UUID and set it as the '_id' value
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "address": self.address,
            "phone": self.phone,
            "isVerified": self.isVerified,
            "role": self.role
        }
    
    def get_session_data(self):
        import uuid
        return {
            "name": self.name,
            "email": self.email,
            "address": self.address,
            "phone": self.phone,
            "isVerified": self.isVerified,
            "role": self.role
        }
    
    @staticmethod
    def from_user(user):
        data = {
            "id": user.id, # Set the 'id' value to the user's ID
            "name": user.name,
            "email": user.email,
            "password": user.password,
            "address": user.address,
            "phone": user.phone,
            "isVerified": user.isVerified,
            "role": user.role
        }
        return AuthDTO(data) # Create a new AuthDTO instance with the data and return it