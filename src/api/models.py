from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from datetime import timedelta

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "User"
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)
    

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "is_active": self.is_active,
        }

    @staticmethod
    def get_with_credentials(email, password):
        return User.query.filter_by(email=email).filter_by(password=password).first()

    @classmethod
    def get_token(cls, email):
       return create_access_token(identity=email, expires_delta=timedelta(seconds=300))
        # return serial.generate_password_hash({'user_id':user.id})
        # return generate_password_hash({'user_id':user.id})

    @staticmethod
    def verify_token(cls, token):
       return create_access_token(identity=email, expires_delta=timedelta(seconds=600))

    @classmethod
    def get_by_email(cls, email):
        user = cls.query.filter_by(email=email).one_or_none()
        return user
    
    @classmethod
    def get_by_username(cls, username):
        user = cls.query.filter_by(username=username).one_or_none()
        return user


class Chore(db.Model):
    __tablename__ = "Chore"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    name = db.Column(db.String(120), unique=False, nullable=False)
    duration = db.Column(db.Time, unique=False, nullable=False)
    date = db.Column(db.Date, unique=False, nullable=True)

    def serialize(chore):
        return {
            "id": chore.id,
            "user_id": chore.user_id,
            "name": chore.name,
            "duration": chore.duration.isoformat(),
            "date": chore.date,
        }

    @classmethod
    def get_chores_by_user_id(cls, user_id):
        chores = cls.query.filter_by(user_id=user_id).all()
        return chores
    
class Team(db.Model):
    __tablename__ = "Team"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    
    def serialize(team):
        return{
            "id": team.id,
            "name": team.name,
        }

    # @classmethod
    # def get_team_by_user_id(cls, user_id):
    #     team = cls.query.filter_by(user_id=user_id).all()
    #     return team
   

   # set up a relational table 
   
class UsersInTeam(db.Model):
    __tablename__ = "UsersInTeam"
    id = db.Column(db.Integer, primary_key=True)
    team_name = db.Column(db.String(80), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False, unique=True)

    def serialize(usersInTeam):
        return{
            "id": usersInTeam.id,
            "team_name": usersInTeam.team_name,
            "user_id": usersInTeam.user_id,
        }

    @classmethod
    def get_team_by_user_id(cls, user_id):
        team = cls.query.filter_by(user_id=user_id).one_or_none()
        return team

    @classmethod
    def get_user_ids_by_team(cls, team):
        users = cls.query.filter_by(team_name=team).all()
        return users
   