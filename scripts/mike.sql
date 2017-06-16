CREATE DATABASE IF NOT EXISTS mike;
USE mike;
CREATE TABLE users(
id_user INT(3) AUTO_INCREMENT NOT NULL,
lastname VARCHAR(20) NOT NULL,
firstname VARCHAR(20) NOT NULL,
date_naissance DATE NOT NULL,
post enum('ceo','cto','seo') NOT NULL,
date_create DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(id_user)
)ENGINE=InnoDB;