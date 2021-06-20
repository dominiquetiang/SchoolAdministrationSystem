-- ----------------------------------------------------------------------------
-- MySQL Workbench Migration
-- Migrated Schemata: SchoolAdmin
-- Source Schemata: SchoolAdmin
-- Created: Sun Jun 20 23:43:44 2021
-- Workbench Version: 8.0.25
-- ----------------------------------------------------------------------------

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- Schema SchoolAdmin
-- ----------------------------------------------------------------------------
DROP SCHEMA IF EXISTS `SchoolAdmin` ;
CREATE SCHEMA IF NOT EXISTS `SchoolAdmin` ;

-- ----------------------------------------------------------------------------
-- Table SchoolAdmin.Class
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchoolAdmin`.`Class` (
  `classCode` VARCHAR(200) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`classCode`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table SchoolAdmin.Students
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchoolAdmin`.`Students` (
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table SchoolAdmin.Subject
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchoolAdmin`.`Subject` (
  `subjectCode` VARCHAR(200) NOT NULL,
  `name` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`subjectCode`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table SchoolAdmin.Teacher
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchoolAdmin`.`Teacher` (
  `name` VARCHAR(200) NOT NULL,
  `email` VARCHAR(200) NOT NULL,
  PRIMARY KEY (`email`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- ----------------------------------------------------------------------------
-- Table SchoolAdmin.TeacherSchedule
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS `SchoolAdmin`.`TeacherSchedule` (
  `Teacher_email` VARCHAR(200) NOT NULL,
  `Subject_subjectCode` VARCHAR(200) NOT NULL,
  `Class_classCode` VARCHAR(200) NOT NULL,
  INDEX `fk_TeacherSchedule_Teacher1_idx` (`Teacher_email` ASC) VISIBLE,
  INDEX `fk_TeacherSchedule_Subject1_idx` (`Subject_subjectCode` ASC) VISIBLE,
  INDEX `fk_TeacherSchedule_Class1_idx` (`Class_classCode` ASC) VISIBLE,
  CONSTRAINT `fk_TeacherSchedule_Class1`
    FOREIGN KEY (`Class_classCode`)
    REFERENCES `SchoolAdmin`.`Class` (`classCode`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_TeacherSchedule_Subject1`
    FOREIGN KEY (`Subject_subjectCode`)
    REFERENCES `SchoolAdmin`.`Subject` (`subjectCode`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_TeacherSchedule_Teacher1`
    FOREIGN KEY (`Teacher_email`)
    REFERENCES `SchoolAdmin`.`Teacher` (`email`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
SET FOREIGN_KEY_CHECKS = 1;
