CREATE TABLE IF NOT EXISTS user_table(
    id INT PRIMARY KEY NOT NULL,
    password VARCHAR,
    email VARCHAR NOT NULL,
    username VARCHAR NOT NULL
);

CREATE TABLE action_table (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE reaction_table (
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR NOT NULL
);

CREATE TABLE service_table (
    id INT PRIMARY KEY NOT NULL,
    NAME VARCHAR NOT NULL
);

CREATE TABLE area_table (
    id INT PRIMARY KEY NOT NULL,
    action_id INT FOREIGN KEY NOT NULL,
    reaction_id INT FOREIGN KEY NOT NULL
);

CREATE TABLE IF NOT EXISTS user_service_table (
    id INT PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY NOT NULL,
    service_id INT FOREIGN KEY NOT NULL,
    token VARCHAR
);

CREATE TABLE user_area_table (
    id INT PRIMARY KEY NOT NULL,
    user_id INT FOREIGN KEY NOT NULL,
    area_id INT FOREIGN KEY NOT NULL
);

CREATE TABLE service_reaction_table(
    id INT PRIMARY KEY NOT NULL,
    service_id INT FOREIGN KEY NULL,
    reaction_id INT FOREIGN KEY NOT NULL
);

CREATE TABLE service_action_table (
    id INT PRIMARY KEY NOT NULL,
    service_id INT FOREIGN KEY NOT NULL,
    action_id INT FOREIGN KEY NOT NULL
);