CREATE DATABASE IF NOT EXISTS weatherData;
USE weatherData;

CREATE TABLE IF NOT EXISTS relativeHumidity (
    time DATETIME NOT NULL,
    relativeHumidity FLOAT NOT NULL,
    PRIMARY KEY (time)
);

CREATE TABLE IF NOT EXISTS directRadiation (
    time DATETIME NOT NULL,
    directRadiation FLOAT NOT NULL,
    PRIMARY KEY (time)
);

CREATE TABLE IF NOT EXISTS temperature (
    date DATETIME NOT NULL,
    max FLOAT NOT NULL,
    min FLOAT NOT NULL,
    PRIMARY KEY (date)
);

CREATE TABLE IF NOT EXISTS axisUnits (
    tableName CHAR(32) NOT NULL,
    yAxis CHAR(16) NOT NULL,
    xAxis CHAR(16) NOT NULL,
    PRIMARY KEY (tableName)
);