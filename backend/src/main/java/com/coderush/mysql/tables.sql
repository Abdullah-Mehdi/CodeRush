USE justwork;

DROP TABLE IF EXISTS gamevs;
DROP TABLE IF EXISTS gamesolo;
DROP TABLE IF EXISTS usert;
DROP TABLE IF EXISTS problems;

CREATE TABLE IF NOT EXISTS usert(
	username VARCHAR(16),
	passhash VARCHAR(60),
    email VARCHAR(32) UNIQUE,
    totalscore INT,
    UNIQUE (email),
	PRIMARY KEY (username));

CREATE TABLE IF NOT EXISTS problems(
    problemid INT,
    title TINYTEXT,
    description TEXT,
    difficulty ENUM('HARD', 'MEDIUM', 'EASY'),
    startingcode TEXT,
    PRIMARY KEY (problemid));

CREATE TABLE IF NOT EXISTS testcases(
    problemid INT,
    testid INT AUTO_INCREMENT,
    input TEXT,
    output TEXT,
    PRIMARY KEY (testid),
    FOREIGN KEY (problemid) REFERENCES problems(problemid));
   
CREATE TABLE IF NOT EXISTS gamevs(
	gameid INT NOT NULL AUTO_INCREMENT,
    usera VARCHAR(16),
    userb VARCHAR(16),
    userascore INT,
    userbscore INT,
    problem INT,
	PRIMARY KEY (gameid),
	FOREIGN KEY (usera) REFERENCES usert(username),
    FOREIGN KEY (userb) REFERENCES usert(username),
    FOREIGN KEY (problem) REFERENCES problems(problemid));

CREATE TABLE IF NOT EXISTS gamesolo(
	gameid INT NOT NULL AUTO_INCREMENT,
    usera VARCHAR(16),
    userscore INT,
    problem INT,
	PRIMARY KEY (gameid),
	FOREIGN KEY (usera) REFERENCES usert(username) ON DELETE CASCADE,
    FOREIGN KEY (problem) REFERENCES problems(problemid));




INSERT INTO usert VALUES ('NICK', 'welorushoidesoi', 'email@safs.sda', '0');
INSERT INTO usert VALUES ('MICHAEL', 'asdikgtubaikbudg', 'email@wqfqwf.sda', '0');
INSERT INTO usert VALUES ('ABDULLAH', 'swtaubwrlgryswl', 'email@sasdw.sda', '0');
INSERT INTO usert VALUES ('SABRIA', 'atwasfuahadoyg', 'email@asdw.sda', '0');

SELECT * FROM usert;