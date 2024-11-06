CREATE DATABASE IF NOT EXISTS justwork;

USE justwork;

CREATE TABLE IF NOT EXISTS usert(
	username VARCHAR(16),
	passhash VARCHAR(60),
    totalscore INT UNSIGNED,
	PRIMARY KEY (username));
   
CREATE TABLE IF NOT EXISTS gamevs(
	gameid INT, 
    usera VARCHAR(16),
    userb VARCHAR(16),
    userascore TINYINT UNSIGNED,
    userbscore TINYINT UNSIGNED,
	PRIMARY KEY (gameid),
	FOREIGN KEY (usera) REFERENCES usert(username),
    FOREIGN KEY (userb) REFERENCES usert(username));


INSERT INTO usert VALUES ('NICK', 'welorushoidesoi', '0');
INSERT INTO usert VALUES ('MICHAEL', 'asdikgtubaikbudg', '0');
INSERT INTO usert VALUES ('ABDULLAH', 'swtaubwrlgryswl', '0');
INSERT INTO usert VALUES ('SABRIA', 'atwasfuahadoyg', '0');

SELECT * FROM usert; 