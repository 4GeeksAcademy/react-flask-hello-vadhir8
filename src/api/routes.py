"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# Mis rutas

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not name or not email or not password:
        return jsonify({"message": "Todos los campos son requeridos."}), 400

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"message": "Hubo un error, intente más tarde."}), 400

    password_hash = generate_password_hash(password)


    new_user = User(name=name, email=email, password_hash=password_hash, is_active=True)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente."}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Todos los campos son requeridos."}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "Usuario incorrecto."}), 401

    if not check_password_hash(user.password_hash, password):
        return jsonify({"message": "Contraseña incorrecta."}), 401
    
    token = create_access_token(identity=str(user.id))

    return jsonify({"Token": token}), 201


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    print(user)

    if not user:
        return jsonify({"message": "Usuario no encontrado."}), 404
   
    return jsonify({"name": user.name}), 200
