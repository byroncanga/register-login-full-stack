"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import  create_access_token, jwt_required, get_jwt_identity


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route("/user", methods=["GET"])
@jwt_required()
def get_user():    
        
    user_query = User.query.all()
    
    user_serialize = [user.serialize() for user in user_query]
    body_response ={
        "user": user_serialize
    }
    
    return jsonify(body_response),200

@api.route("/signup", methods=["POST"])
def register():
    body = request.json    
    email = body.get("email", None)
    password = body.get("password", None)
    
    if email is None or password is None:
        return jsonify({
            "error": "email y password son requeridos"
        }), 400
    
    hashed_password = generate_password_hash(password)
    
    new_user = User(email = email, password = hashed_password, is_active = True)
    
    db.session.add(new_user)
    
    try:
        db.session.commit()
        return jsonify({
            "status": "usuario creado con exito"
        }),201
    except Exception as error:
        db.session.rollback()
        return jsonify({
            "error": str(error)
        }),500
    
    
@api.route("/login", methods=["POST"])
def login():
    
    body = request.json
    email = body.get("email", None)
    password = body.get("password", None)
    
    if email is None or password is None:
        return jsonify({
            "error": "Mail y Password son requeridos"
        }), 401
    
    user_query = User.query.filter_by(email = email).one_or_none()
    
    if user_query is None:
        return jsonify({
            "error": "Usuario no encontrado"
        }), 401
        
    password_match = check_password_hash(user_query.password, password)
    
    if not password_match:
        return jsonify({
            "error": "Contraseña incorrecta"
        }), 401
        
    user_token = create_access_token({
        "id": user_query.id,
        "email": user_query.email
    })
    
    return jsonify({
        "auth_token": user_token
    })
    