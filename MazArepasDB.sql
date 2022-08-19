-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.22-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para db_mazarepas
CREATE DATABASE IF NOT EXISTS `db_mazarepas` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `db_mazarepas`;

-- Volcando estructura para tabla db_mazarepas.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla db_mazarepas.sessions: ~2 rows (aproximadamente)
DELETE FROM `sessions`;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('IcHl7OHsu80Qa-iQW8thDYeAOb_A6pCA', 1659977531, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{}}'),
	('QVpBuuht3EQ28Yudo2kMrMQB8SoUcKid', 1659977662, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"flash":{},"passport":{"user":1}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;

-- Volcando estructura para tabla db_mazarepas.users
CREATE TABLE IF NOT EXISTS `users` (
  `USR_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `USR_PrimerNombre` varchar(25) DEFAULT NULL,
  `USR_SegundoNombre` varchar(25) DEFAULT NULL,
  `USR_PrimerApellido` varchar(25) DEFAULT NULL,
  `USR_SegundoApellido` varchar(25) DEFAULT NULL,
  `USR_Documento` varchar(25) DEFAULT NULL,
  `USR_Email` varchar(100) DEFAULT NULL,
  `USR_Password` varchar(50) DEFAULT NULL,
  `USR_Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `USR_Updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`USR_ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla db_mazarepas.users: ~1 rows (aproximadamente)
DELETE FROM `users`;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`USR_ID`, `USR_PrimerNombre`, `USR_SegundoNombre`, `USR_PrimerApellido`, `USR_SegundoApellido`, `USR_Documento`, `USR_Email`, `USR_Password`, `USR_Created_at`, `USR_Updated_at`) VALUES
	(1, 'Elkin', 'Daniel', 'Torres', 'Poveda', '1007514490', 'elkintorres721@gmail.com', '1122', '2022-08-07 11:02:14', '2022-08-07 11:02:14');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
