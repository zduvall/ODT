from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    data = field.data
    user = User.query.filter(User.email == data).first()
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    firstName = StringField(
        "firstName",
        validators=[
            DataRequired(message="First Name cannot be empty."),
            Length(
                min=1, max=50, message="First name must be between 1 and 50 characters."
            ),
        ],
    )
    lastName = StringField(
        "lastName",
        validators=[
            DataRequired(message="Last Name cannot be empty."),
            Length(
                min=1, max=50, message="Last name must be between 1 and 50 characters."
            ),
        ],
    )
    email = StringField(
        "email",
        validators=[DataRequired(message="Must input valid email!"), user_exists],
    )
    password = StringField("password", validators=[DataRequired()])
