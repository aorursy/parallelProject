DROP DATABASE parallel;
CREATE DATABASE IF NOT EXISTS `parallel` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `parallel`;


CREATE TABLE users (
	  studentid int(10) NOT NULL UNIQUE PRIMARY KEY,
    password varchar(255) NOT NULL,
    status int(1) DEFAULT 0,
    timestamp varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `users` (`studentid`,`password`,`status`,`timestamp`) VALUES
  ('6288020','aor12345',0,NULL),
  ('6288126','gail12345',0,NULL)
