-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema CharGenWebsite
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema CharGenWebsite
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `CharGenWebsite` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `CharGenWebsite` ;

-- -----------------------------------------------------
-- Table `CharGenWebsite`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharGenWebsite`.`user` (
  `alias` VARCHAR(45) NOT NULL,
  `password_hash` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  UNIQUE INDEX `alias_UNIQUE` (`alias` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `CharGenWebsite`.`character_list`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharGenWebsite`.`character_list` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `belongs_to` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id` (`id` ASC) VISIBLE,
  CONSTRAINT `email`
    FOREIGN KEY ()
    REFERENCES `CharGenWebsite`.`user` ()
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `CharGenWebsite`.`character_attributes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharGenWebsite`.`character_attributes` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `strength` INT NOT NULL DEFAULT 0,
  `dexterity` VARCHAR(45) NOT NULL DEFAULT 0,
  `constitution` VARCHAR(45) NOT NULL DEFAULT 0,
  `intelligence` VARCHAR(45) NOT NULL DEFAULT 0,
  `wisdom` VARCHAR(45) NOT NULL DEFAULT 0,
  `charisma` VARCHAR(45) NOT NULL DEFAULT 0,
  `character_attributescol` VARCHAR(45) NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  CONSTRAINT `belongs_to`
    FOREIGN KEY (`id`)
    REFERENCES `CharGenWebsite`.`character_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CharGenWebsite`.`character_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharGenWebsite`.`character_details` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NULL,
  `race` VARCHAR(45) NULL,
  `class` VARCHAR(45) NULL,
  `level` VARCHAR(45) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  CONSTRAINT `belongs_to`
    FOREIGN KEY (`id`)
    REFERENCES `CharGenWebsite`.`character_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CharGenWebsite`.`character_skills`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharGenWebsite`.`character_skills` (
  `acrobatics` INT NOT NULL DEFAULT 0,
  `animal_handling` INT NOT NULL DEFAULT 0,
  `arcana` INT NOT NULL DEFAULT 0,
  `athletics` INT NOT NULL DEFAULT 0,
  `deception` INT NOT NULL DEFAULT 0,
  `history` INT NOT NULL DEFAULT 0,
  `insight` INT NOT NULL DEFAULT 0,
  `intimidation` INT NOT NULL DEFAULT 0,
  `investigation` INT NOT NULL DEFAULT 0,
  `medicine` INT NOT NULL,
  `nature` INT NOT NULL DEFAULT 0,
  `perception` INT NOT NULL,
  `religion` INT NOT NULL DEFAULT 0,
  `sleight_of_hand` INT NOT NULL DEFAULT 0,
  `stealth` INT NOT NULL DEFAULT 0,
  `survival` INT NOT NULL DEFAULT 0,
  `id` INT NOT NULL,
  PRIMARY KEY (`acrobatics`, `id`),
  INDEX `belongs_to_idx` (`id` ASC) VISIBLE,
  CONSTRAINT `belongs_to`
    FOREIGN KEY (`id`)
    REFERENCES `CharGenWebsite`.`character_list` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `CharGenWebsite`.`derived_attributes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `CharGenWebsite`.`derived_attributes` (
)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
