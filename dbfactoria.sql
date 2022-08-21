-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando estructura para tabla db_mazarepas.produccion
CREATE TABLE IF NOT EXISTS `produccion` (
  `PRO_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `PRO_Referencia` varchar(50) DEFAULT NULL,
  `PRO_Cantidad` int(11) DEFAULT NULL,
  `PRO_Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `PRO_Updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`PRO_ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla db_mazarepas.produccion: ~9 rows (aproximadamente)
DELETE FROM `produccion`;
INSERT INTO `produccion` (`PRO_ID`, `PRO_Referencia`, `PRO_Cantidad`, `PRO_Created_at`, `PRO_Updated_at`) VALUES
	(1, 'Grande', 21, '2022-08-21 22:01:09', '2022-08-21 22:01:09'),
	(2, 'Mediana', 23, '2022-08-21 22:07:10', '2022-08-21 22:07:10'),
	(3, 'MedianaINT', 23, '2022-08-21 22:18:47', '2022-08-21 22:18:47'),
	(4, 'MedianaINT', 43, '2022-08-22 22:21:13', '2022-08-21 22:40:30'),
	(5, 'Pop', 12, '2022-08-21 23:01:53', '2022-08-21 23:01:53'),
	(6, 'Pop', 20, '2022-08-21 23:02:03', '2022-08-21 23:02:03'),
	(7, 'Pop', 10, '2022-08-21 23:23:08', '2022-08-21 23:23:08'),
	(8, 'Grande', 2, '2022-08-21 23:23:17', '2022-08-21 23:23:17'),
	(9, 'Junior', 34, '2022-08-21 23:36:55', '2022-08-21 23:36:55');

-- Volcando estructura para tabla db_mazarepas.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla db_mazarepas.sessions: ~1 rows (aproximadamente)
DELETE FROM `sessions`;
INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
	('C0x1CzV2g3smEuZCxamZMRQxr3QWf7QG', 1661211455, '{"cookie":{"originalMaxAge":null,"expires":null,"httpOnly":true,"path":"/"},"passport":{"user":3},"flash":{}}');

-- Volcando estructura para tabla db_mazarepas.users
CREATE TABLE IF NOT EXISTS `users` (
  `USR_ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `USR_PrimerNombre` varchar(25) DEFAULT NULL,
  `USR_SegundoNombre` varchar(25) DEFAULT NULL,
  `USR_PrimerApellido` varchar(25) DEFAULT NULL,
  `USR_SegundoApellido` varchar(25) DEFAULT NULL,
  `USR_Rol` varchar(25) DEFAULT NULL,
  `USR_Documento` varchar(25) DEFAULT NULL,
  `USR_Password` varchar(50) DEFAULT NULL,
  `USR_Created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `USR_Updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`USR_ID`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Volcando datos para la tabla db_mazarepas.users: ~4 rows (aproximadamente)
DELETE FROM `users`;
INSERT INTO `users` (`USR_ID`, `USR_PrimerNombre`, `USR_SegundoNombre`, `USR_PrimerApellido`, `USR_SegundoApellido`, `USR_Rol`, `USR_Documento`, `USR_Password`, `USR_Created_at`, `USR_Updated_at`) VALUES
	(1, 'Efrain', NULL, 'Solarte', NULL, 'Supervisor', '1007514490', '1122', '2022-08-07 16:02:14', '2022-08-21 21:07:07'),
	(2, 'Brayan', 'Andres', 'Sepulveda', 'Garnica', 'Inventario', '11222', '45678', '2022-08-07 16:02:14', '2022-08-21 21:07:19'),
	(3, 'Produccion', NULL, NULL, NULL, 'Produccion', '11222', '1122', '2022-08-07 16:02:14', '2022-08-21 18:45:50'),
	(4, 'Elkin', NULL, NULL, NULL, 'Admin', '1007514490', '1122', '2022-08-07 16:02:14', '2022-08-21 18:46:21');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
