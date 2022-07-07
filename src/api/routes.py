"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Chore, Team, Metrics
from api.utils import generate_sitemap, APIException
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

# sign up end point (IN PROGESS)
@api.route("/signup", methods=["POST"])
def createNewUser():
    request_body = request.get_json(force=True)
    email = request_body['email']
    password = request_body['password']
    hash_password = generate_password_hash(password)
    is_active = True

    try:
        newUser = User(email=email, password=hash_password, is_active=is_active)
    except SQLAlchemyError: 
        return jsonify("error creating the user"), 400
    try:
        db.session.add(newUser)
    except SQLAlchemyError: 
        return jsonify("error adding the user"), 400
    db.session.commit()

    access_token = create_access_token(identity=email)
    return jsonify({"msg": "sign up complete", "access_token" : access_token}), 201

    # except SQLAlchemyError: 
    #     return jsonify({"msg": "user already exists"}), 400
        
    #     pass

    return jsonify({"msg": "error signing up"}), 401