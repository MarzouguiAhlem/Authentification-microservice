import uuid

class User:
    def __init__(self, name, email, password, address, phone, id = uuid.uuid4().hex, isVerified=False, role="admin"):
        # Initialize the User instance with the given name, email, password, address and phone
        # If no ID is provided, generate a new UUID and set it as the ID
        # Set the isVerified attribute to False by default, and the role attribute to 'user' by default
        self.id = id
        self.name = name
        self.email = email
        self.password = password
        self.address = address
        self.phone = phone
        self.isVerified = isVerified
        self.role = role
   

    def getUser(self):
        # Return a dictionary containing the User instance's attributes
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "password": self.password,
            "address": self.address,
            "phone": self.phone,
            "isVerified": self.isVerified,
            "role": self.role
        }

    def __repr__(self):
        # Return a string representation of the User instance
        return f'<User {self.id} {self.name} ({self.email})>'