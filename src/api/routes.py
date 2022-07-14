"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Chore, Team, Metrics
from api.utils import generate_sitemap, APIException
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import or_, exc

api = Blueprint('api', __name__)

# sign up end point (DONE)
@api.route("/signup", methods=["POST"])
def createNewUser():
    request_body = request.get_json(force=True)
    email = request_body['email']
    username = request_body['username']
    password = request_body['password']
    hash_password = generate_password_hash(password)
    is_active = True

    try:
        user = User(email=email, username=username, password=hash_password, is_active=is_active)
    except exc.SQLAlchemyError: 
        return jsonify("error creating the user"), 400
    try:
        db.session.add(user)
    except exc.SQLAlchemyError: 
        return jsonify("error adding the user"), 400
    db.session.commit()

    access_token = create_access_token(identity=email)
    return jsonify({"msg": "sign up complete", "access_token" : access_token}), 201

    # except SQLAlchemyError: 
    #     return jsonify({"msg": "user already exists"}), 400
        
    #     pass

    return jsonify({"msg": "error signing up"}), 401

# get request from chore list
@api.route('/chore', methods=['GET'])
def getChoresByUserId(): 
    chores = Chore.get_chores_by_user_id("1")
    serialized_chores = []
    for chore in chores:
        serialized_chores.append(chore.serialize())
    return(jsonify(serialized_chores))
 


# post chore endpoint 
@api.route('/chore', methods=['POST'])
def postChore():
    email = request.json.get("email", None)
    chore = request.json.get("chore", None)
    duration = request.json.get("duration", None)
    date = request.json.get("date", None)

    user = User.get_by_email(email)
    if user:
        try:
            choreToAdd = Chore(name=chore, duration=duration, date=date, user_id=user.id)
        except exc.SQLAlchemyError: 
            return jsonify("error creating the chore"), 400
        try:
            db.session.add(choreToAdd)
        except exc.SQLAlchemyError: 
            return jsonify("error adding the chore"), 400
        db.session.commit()

        return jsonify({"chore": chore, "duration": duration, "date": date, "email": email}), 201
        
    return jsonify({"msg": "error adding chore"}), 401

# delete a chore 
@api.route('/chore', methods=['DELETE'])
def delete_chore():
    email = request.json.get("email", None)
    chore = request.json.get("chore", None)
    duration = request.json.get("duration", None)
    date = request.json.get("date", None)

    user = User.get_by_email(email)
    if user:
        try:
            choreToDelete = Chore.query.filter_by(id="4").first()
        except exc.SQLAlchemyError: 
            return jsonify("error finding the chore to delete"), 400
        try:
            db.session.delete(choreToDelete)
        except exc.SQLAlchemyError: 
            return jsonify("error deleting the chore"), 400
        db.session.commit()

        return jsonify({"chore": chore, "duration": duration, "date": date, "email": email}), 201
        
    return jsonify({"msg": "error adding chore"}), 401



# login end point
@api.route("/login", methods=["POST"])
def login():
    request_body = request.get_json(force=True)
    email = request_body['email']
    username = request_body['username']
    password = request_body['password']
   
    user = User.get_by_email(email)
    if user and username and check_password_hash(user.password, password):
        access_token = create_access_token(identity=email)
        return jsonify({"access_token": access_token}),201
    else:
        return {"error":"user and password not valid"},400
    
    # email and username are working but password is causing a 401 error
    # if email != email or username != username or password != "999":
    #     return jsonify({"msg": "Bad username or password"}), 401

    # access_token = create_access_token(identity=username)
    # return jsonify(access_token=access_token), 201

# protected page end point
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_hello():
   # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user, message="this is from the backend"), 200

if __name__ == "__main__":
    app.run()


