from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
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
            "is_active": self.is_active
        }

class Chore(db.Model):
    __tablename__ = 'Chore'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    users = db.relationship(User)
    name = db.Column(db.String(120), unique=True, nullable=False)
    duration = db.Column(db.Integer, unique=False, nullable=False)
    date = db.Column(db.Date, unique=False, nullable=True)

    def serialize(chore):
        return {
            "id": chore.id,
            "user_id": chore.user_id,
            "name": chore.name,
            "duration": chore.duration,
            "date": chore.date,
        }

class Team(db.Model):
    __tablename__ = 'Team'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column (db.Integer, db.ForeignKey('User.id'), nullable=False)
    users = db.relationship(User)
    name = db.Column(db.String(120), unique=True, nullable=False)
    
    def serialize(team):
        return{
            "id": team.id,
            "user_id": team.user_id,
            "name": team.name,
        }

class Metrics(db.Model):
    __tablename__ = 'Metrics'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'), nullable=False)
    chore_id = db.Column(db.Integer, db.ForeignKey('Chore.id'), nullable=False)
    chore_name = db.Column(db.String(120),db.ForeignKey('Chore.name'), nullable=False)
    total_duration = db.Column(db.Integer, unique=False, nullable=False)
    time_range = db.Column(db.Date, unique=False, nullable=True)

    def serialize(metrics):
            return{
                "user_id": metrics.user_id,
                "chore_id": metrics.chore_id,
                "chore_name": metrics.chore_name,
                "total_duration": metrics.total_duration,
                "time_range": metrics.time_range,
            }
        
   