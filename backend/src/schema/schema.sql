CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    password VARCHAR,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL
);

CREATE TABLE actions (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL
);

CREATE TABLE reactions (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    description VARCHAR NOT NULL
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
    config jsonb,
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

INSERT INTO services (name) VALUES ('Trello');
INSERT INTO services (name) VALUES ('Reddit');
INSERT INTO services (name) VALUES ('Discord');
INSERT INTO services (name) VALUES ('Weather');
INSERT INTO services (name) VALUES ('Crypto');
INSERT INTO services (name) VALUES ('GitHub');
INSERT INTO services (name) VALUES ('Outlook');
INSERT INTO services (name) VALUES ('Steam');
INSERT INTO services (name) VALUES ('Youtube');

INSERT INTO reactions (name, description) VALUES ('Send email', 'Send an email via Outlook');
INSERT INTO reactions (name, description) VALUES ('Add trello card', 'Add a trello card to board');
INSERT INTO reactions (name, description) VALUES ('Send Git Issue', 'Send a git issue on repository');
INSERT INTO reactions (name, description) VALUES ('Send Discord message', 'Send a discord message to user');
INSERT INTO actions (name, description) VALUES ('Received email', 'Receive a notification when an email is received');
INSERT INTO actions (name, description) VALUES ('Youtube subscribers changed', 'A user as subscribed to your channel');
INSERT INTO actions (name, description) VALUES ('Subreddit subscriber', 'A user as subscribed to your subreddit');
INSERT INTO actions (name, description) VALUES ('GitHub repo stared', 'A Github repository was starred');
INSERT INTO actions (name, description) VALUES ('Weather changed', 'The weather has changed');
INSERT INTO actions (name, description) VALUES ('Steam players changed', 'Too much or not enough players');
INSERT INTO actions (name, description) VALUES ('CryptoCurrency price changed', 'Cryptocurrency value has changed');
INSERT INTO actions (name, description) VALUES ('File added', 'A file has been added to the root');
INSERT INTO actions (name, description) VALUES ('New youtube video', 'A new youtube video has been posted');

INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'Weather changed'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test1');
INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'Weather changed'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test2');
INSERT INTO areas (action_id, reaction_id, name) VALUES ((SELECT id FROM actions WHERE name = 'CryptoCurrency price changed'), (SELECT id FROM reactions WHERE name = 'Send email'), 'Test4');

INSERT INTO user_area (user_id, area_id) VALUES ((SELECT id FROM users WHERE id = '1'), (SELECT id FROM areas WHERE id = '1'));
INSERT INTO user_area (user_id, area_id) VALUES ((SELECT id FROM users WHERE id = '2'), (SELECT id FROM areas WHERE id = '2'));
INSERT INTO user_area (user_id, area_id) VALUES ((SELECT id FROM users WHERE id = '3'), (SELECT id FROM areas WHERE id = '3'));

INSERT INTO service_reaction (service_id, reaction_id) VALUES ((SELECT id FROM services WHERE name = 'Outlook'), (SELECT id FROM reactions WHERE name = 'Send email'));
INSERT INTO service_reaction (service_id, reaction_id) VALUES ((SELECT id FROM services WHERE name = 'Trello'), (SELECT id FROM reactions WHERE name = 'Add trello card'));
INSERT INTO service_reaction (service_id, reaction_id) VALUES ((SELECT id FROM services WHERE name = 'GitHub'), (SELECT id FROM reactions WHERE name = 'Send Git Issue'));
INSERT INTO service_reaction (service_id, reaction_id) VALUES ((SELECT id FROM services WHERE name = 'Discord'), (SELECT id FROM reactions WHERE name = 'Send Discord message'));

INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Outlook'), (SELECT id FROM actions WHERE name = 'Received email'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Youtube'), (SELECT id FROM actions WHERE name = 'Youtube subscribers changed'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Reddit'), (SELECT id FROM actions WHERE name = 'Subreddit subscriber'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'GitHub'), (SELECT id FROM actions WHERE name = 'GitHub repo stared'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Weather'), (SELECT id FROM actions WHERE name = 'Weather changed'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Steam'), (SELECT id FROM actions WHERE name = 'Steam players changed'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Crypto'), (SELECT id FROM actions WHERE name = 'CryptoCurrency price changed'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Outlook'), (SELECT id FROM actions WHERE name = 'File added'));
INSERT INTO service_action (service_id, action_id) VALUES ((SELECT id FROM services WHERE name = 'Youtube'), (SELECT id FROM actions WHERE name = 'New youtube video'));
