import json

from .db import db
from datetime import datetime


class Test(db.Model):
    __tablename__ = "tests"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    clientId = db.Column(db.Integer, db.ForeignKey("clients.id"), nullable=False)
    testCode = db.Column(db.String(20), nullable=False)
    res = db.Column(db.JSON)
    timeComp = db.Column(db.DateTime, default=datetime.utcnow)
    userSeen = db.Column(db.Boolean, default=False)

    pro = db.relationship("User", back_populates="tests")
    client = db.relationship("Client", back_populates="tests")

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.userId,
            "clientId": self.clientId,
            "testCode": self.testCode,
            "res": json.dumps(self.res),
            "timeComp": self.timeComp,
            "userSeen": self.userSeen,
        }
