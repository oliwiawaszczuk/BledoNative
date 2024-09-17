from hashlib import sha256


def hash_password(password):
    return sha256(password.encode()).hexdigest()


def verify_password(password, hashed_password):
    return hash_password(password) == hashed_password
