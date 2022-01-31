CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    password VARCHAR,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL
);

CREATE TABLE actions (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);

CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    NAME VARCHAR NOT NULL
);

CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    action_id INT NOT NULL,
    reaction_id INT NOT NULL,
    FOREIGN KEY (action_id) REFERENCES actions(id),
    FOREIGN KEY (reaction_id) REFERENCES reactions(id)
);

CREATE TABLE IF NOT EXISTS user_service (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    token VARCHAR,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE user_area (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    area_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE service_reaction (
    id SERIAL PRIMARY KEY,
    service_id INT NULL,
    reaction_id INT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (reaction_id) REFERENCES reactions(id)
);

CREATE TABLE service_action (
    id SERIAL PRIMARY KEY,
    service_id INT NOT NULL,
    action_id INT NOT NULL,
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (action_id) REFERENCES actions(id)
);