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
    name VARCHAR NOT NULL
);

CREATE TABLE areas (
    id SERIAL PRIMARY KEY,
    action_id INT NOT NULL,
    reaction_id INT NOT NULL,
    name VARCHAR NOT NULL,
    FOREIGN KEY (action_id) REFERENCES actions(id),
    FOREIGN KEY (reaction_id) REFERENCES reactions(id)
);

CREATE TABLE IF NOT EXISTS user_service (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    service_id INT NOT NULL,
    token VARCHAR,
    service_config jsonb,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
    CONSTRAINT fk_service FOREIGN KEY (service_id) REFERENCES services(id)
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

INSERT INTO users (password, email, username) VALUES (('pass1'), ('email1'), ('username1'));
INSERT INTO users (password, email, username) VALUES (('pass2'), ('email2'), ('username2'));
INSERT INTO users (password, email, username) VALUES (('pass3'), ('email3'), ('username3'));

INSERT INTO services (name) VALUES ('Google Calendar');
INSERT INTO services (name) VALUES ('Gmail');
INSERT INTO services (name) VALUES ('Discord');
INSERT INTO services (name) VALUES ('Weather');
INSERT INTO services (name) VALUES ('Crypto');
INSERT INTO services (name) VALUES ('GitHub');

INSERT INTO reactions (name) VALUES ('Send email');
INSERT INTO reactions (name) VALUES ('Send whatsapp');
INSERT INTO reactions (name) VALUES ('Reaction added');
INSERT INTO actions (name) VALUES ('Received email');
INSERT INTO actions (name) VALUES ('Received whatsapp');
INSERT INTO actions (name) VALUES ('Event added');
INSERT INTO actions (name) VALUES ('Weather changed');
INSERT INTO actions (name) VALUES ('CryptoCurrency price changed');

INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'Weather changed'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test1');
INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'Weather changed'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test2');
INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'Event added'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test3');
INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'CryptoCurrency price changed'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test4');

INSERT INTO user_area (user_id, area_id) VALUES ((SELECT id FROM users WHERE id = '1'), (SELECT id FROM areas WHERE id = '1'));
INSERT INTO user_area (user_id, area_id) VALUES ((SELECT id FROM users WHERE id = '2'), (SELECT id FROM areas WHERE id = '2'));
INSERT INTO user_area (user_id, area_id) VALUES ((SELECT id FROM users WHERE id = '3'), (SELECT id FROM areas WHERE id = '3'));

INSERT INTO service_reaction (service_id, reaction_id) VALUES ((SELECT id FROM services WHERE name = 'Gmail'), (SELECT id FROM reactions WHERE name = 'Send email'));
INSERT INTO service_reaction (service_id, reaction_id) VALUES ((SELECT id FROM services WHERE name = 'Discord'), (SELECT id FROM reactions WHERE name = 'Reaction added'));

INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Google Calendar'), (SELECT id FROM actions WHERE name = 'Event added'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Gmail'), (SELECT id FROM actions WHERE name = 'Received email'));
