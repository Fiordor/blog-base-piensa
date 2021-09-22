CREATE TABLE `users` (
  `nickname` varchar(256) NOT NULL COMMENT 'Nombre del usuario que se usará como id',
  `password` varchar(256) NOT NULL COMMENT 'Password del usuario encriptado',
  `token` varchar(48) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT 'Token asignado cuando hace inicio de sesión',
  `lastConnection` datetime DEFAULT NULL COMMENT 'Útilma conexión del usuario',
  `lastRequest` datetime DEFAULT NULL COMMENT 'Última petición hecha por el usuario',
  `keepConnection` datetime DEFAULT NULL COMMENT 'Hasta cuándo es válido el token del usuario',
  PRIMARY KEY (`nickname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci