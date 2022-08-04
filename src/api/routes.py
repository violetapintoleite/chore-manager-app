"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Chore, Team, UsersInTeam
from api.utils import generate_sitemap, APIException
from werkzeug.security import check_password_hash, generate_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy import or_, exc
from datetime import date, datetime
# from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from flask_mail import Mail, Message
from dotenv import load_dotenv

api = Blueprint('api', __name__)
app = Flask(__name__)
load_dotenv()

#  configuration of mail
app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = os.environ['GMAIL_USERNAME']
app.config['MAIL_PASSWORD'] = os.environ['EMAIL_PASSWORD']
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_MAX_EMAILS'] = 5


mail = Mail(app)
mail.init_app(app)

# message object mapped to a particular URL ‘/’
@api.route("/forgot-password",  methods=["POST"])
def index():
   msg = Message(
                'Hello',
                sender ='c.martinroffey@gmail.com',
                recipients = ['miyasir353@galotv.com']
               )
   msg.body = 'Hello Flask message sent from Flask-Mail'
   mail.send(msg)
   return jsonify({'Sent'}) 

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
def getChoresByUserEmail(): 
    email = request.args.get("email", None)
    user = User.get_by_email(email)
    if user: 
        chores = Chore.get_chores_by_user_id(user.id)
        serialized_chores = []
        for chore in chores:
            serialized_chores.append(chore.serialize())
      
        return jsonify({"chores" : serialized_chores})

    return jsonify({"msg": "no user"}), 404

  
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
def deleteChoresByUserEmail():
    email = request.args.get("email", None)
    chore_id = request.args.get("chore_id", None)
    
    user = User.get_by_email(email.replace("%40", "@"))
    if user:
        try:
            choreToDelete = Chore.query.filter_by(id=chore_id).first()
        except exc.SQLAlchemyError: 
            return jsonify("error finding the chore to delete"), 404

        if choreToDelete:
            db.session.delete(choreToDelete)
            db.session.commit()
            return jsonify({"msg": "success deleting the chore"}), 201

        
        return jsonify("There is no chore to delete"), 404

    return jsonify({"msg": "error deleting the chore after 201"}), 401

# delete all chores
@api.route('/chores', methods=['DELETE'])
def deleteAllChores():
    email = request.args.get("email", None)

    user = User.get_by_email(email.replace("%40", "@"))
    if user:
        try:
            Chore.query.filter_by(user_id=user.id).delete()
            db.session.commit()
            return jsonify({"msg": "success clearing user chores list"}), 201
        except exc.SQLAlchemyError:
            return jsonify({"msg": "error deleting the user chores list"}), 404
     
    return jsonify({"msg": "there is no user"}), 401


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
   

# protected page end point
@api.route("/profile", methods=["GET"])
@jwt_required()
def get_hello():
   # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user, message="this is from the backend"), 200


# post team endpoint 
@api.route('/team', methods=['POST'])
def addToTeam():
    email = request.json.get("email", None)
    name = request.json.get("name", None)

    user = User.get_by_email(email)
    if user:
        userInTeam = UsersInTeam.get_team_by_user_id(user.id)
        if userInTeam:
            return jsonify("email already has a team"), 409
        try:
            addUserToTeam = UsersInTeam(team_name=name, user_id=user.id)
        except exc.SQLAlchemyError: 
            return jsonify("error add the team"), 400
        try:
            db.session.add(addUserToTeam)
            db.session.commit()
        except exc.SQLAlchemyError: 
            return jsonify("error adding person to team"), 400
       

        return jsonify({"name": name, "email": email}), 201
        
    return jsonify({"msg": "error adding person to team"}), 401

# get end point to pull team 
@api.route('/team', methods=['GET'])
def getTeamByUserEmail(): 
    email = request.args.get("email", None)
    user = User.get_by_email(email)

    if user: 
        usersInTeam = UsersInTeam.get_team_by_user_id(user.id)
        if usersInTeam:
            return jsonify({"team" : usersInTeam.team_name})


    return jsonify({"msg": "no user"}), 404

# delete user from team
@api.route('/team', methods=['DELETE'])
def deleteUserFromTeam():
    email = request.args.get("email", None)
    user = User.get_by_email(email.replace("%40", "@"))
    if user:
        try:
            userToDeleteFromTeam = UsersInTeam.query.filter_by(user_id=user.id).first()
        except exc.SQLAlchemyError: 
            return jsonify("error finding the user to delete"), 404

        if userToDeleteFromTeam:
            db.session.delete(userToDeleteFromTeam)
            db.session.commit()
            return jsonify({"msg": "success deleting the user from the team"}), 201

        
        return jsonify("There is no user to delete"), 404

    return jsonify({"msg": "error deleting the user from the team"}), 401

# get chores from all users in team of logged in user
@api.route('/choresofteam', methods=['GET'])
def getChoresfromUsersInTeam():

    team = request.args.get("team", None)
    users = UsersInTeam.get_user_ids_by_team(team)
    serialized_chores = []
    for user in users:
        chores = Chore.get_chores_by_user_id(user.id)
        user_name = User.query.filter_by(id=user.id).one_or_none()
        for chore in chores:
            serialized_chore = chore.serialize()
            serialized_chore["user_name"] = user_name.email
            serialized_chores.append(serialized_chore)
        
    return jsonify({"teamChores" : serialized_chores})

#########
 # get end point to compare if email exists in DB 
@api.route('/forgot-password', methods=['GET', 'POST'])
def reset_request(): 

    current_user = get_jwt_identity()
    if current_user:
        return redirect(url_for('/', message="reset_request endpoint"))
    # return jsonify(logged_in_as=current_user, message="this is from the backend"), 200

    # if user: 
    #    try

    # return jsonify({"msg": "no user"}), 404




#route to ensure that only user with a valid key can access page to reset password
@api.route("/reset-password", methods=["POST"])
@jwt_required()
def confirmIdentity():
   # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user, message="this is from the backend"), 200


   
if __name__ == "__main__":
    app.run(debug=True)