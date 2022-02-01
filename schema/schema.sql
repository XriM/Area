CREATE TABLE IF NOT EXISTS users(
    id SERIAL NOT NULL,
    password VARCHAR,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE actions (
    id SERIAL NOT NULL,
    name VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE reactions (
    id SERIAL NOT NULL,
    name VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE services (
    id SERIAL NOT NULL,
    name VARCHAR NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE areas (
    id SERIAL NOT NULL,
    action_id INT NOT NULL,
    reaction_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (action_id) REFERENCES actions(id),
    FOREIGN KEY (reaction_id) REFERENCES reactions(id)
);

CREATE TABLE IF NOT EXISTS user_service (
    id SERIAL NOT NULL,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    token VARCHAR,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id)
);

CREATE TABLE user_area (
    id SERIAL NOT NULL,
    user_id INT NOT NULL,
    area_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (area_id) REFERENCES areas(id)
);

CREATE TABLE service_reaction (
    id SERIAL NOT NULL,
    service_id INT NULL,
    reaction_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (reaction_id) REFERENCES reactions(id)
);

CREATE TABLE service_action (
    id SERIAL NOT NULL,
    service_id INT NOT NULL,
    action_id INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (action_id) REFERENCES actions(id)
);