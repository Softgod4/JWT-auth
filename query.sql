CREATE TABLE JWTauth (
	id SERIAL PRIMARY KEY,
	username VARCHAR(30) NOT NULL,
	password VARCHAR(30) NOT NULL
)

INSERT INTO jwtauth (username, password)
VALUES ('User', 'User')

SELECT * FROM jwtauth