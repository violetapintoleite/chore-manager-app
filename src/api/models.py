from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    username = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

class Chore(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey('User.id'), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    date = db.Column(db.Datetime, unique=False, nullable=True)

class Team(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, ForeignKey('User.id'), nullable=False)
    name = db.Column(db.String(120), unique=True, nullable=False)

class Metrics(db.Model):
    user_id = db.Column(db.Integer, ForeignKey('User.id'), nullable=False)
    chore_id = db.Column(db.Integer, ForeignKey('Chore.id'), nullable=False)
    chore_name = db.Column(db.String(120),ForeignKey('Chore.name'), nullable=False)
    total_duration = db.Column(db.Integer, unique=False, nullable=False)
    time_range = db.Column(db.Datetime, unique=False, nullable=True)

    
    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }