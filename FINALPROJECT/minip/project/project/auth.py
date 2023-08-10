import firebase_admin
from firebase_admin import auth

# Initialize the Firebase app
cred = firebase_admin.credentials.Certificate("D:\New folder\mini-project-d6397-firebase-adminsdk-ambn6-e3801c040d.json")
firebase_admin.initialize_app(cred)
