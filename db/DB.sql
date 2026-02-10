
CREATE DATABASE IF NOT EXISTS `CharGenWebsite`;
USE `CharGenWebsite` ;

CREATE TABLE IF NOT EXISTS `User_List` (
  `ID` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `Username` VARCHAR(45) NOT NULL UNIQUE,
  PRIMARY KEY (`ID`)
  );

CREATE TABLE IF NOT EXISTS `Character_List` (
  `id` INT NOT NULL AUTO_INCREMENT UNIQUE,
  `Belongs To` INT NOT NULL UNIQUE,
  PRIMARY KEY (`ID`)
);


-- Foreign Keys

alter table Character_List
   add FOREIGN KEY (`Belongs To`) REFERENCES  User_List (ID);


