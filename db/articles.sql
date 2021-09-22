CREATE TABLE `articles` (
  `id` int NOT NULL COMMENT 'Id del articulo',
  `title` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Título del artículo, en un principio no debería ser más de dos palabras',
  `content` text COLLATE utf8mb4_unicode_ci COMMENT 'Texto del artículo',
  `image` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'La ruta donde se está guardada la imagen',
  `dateCreate` datetime NOT NULL COMMENT 'Fecha en la que se crea el artículo por primera vez',
  `datePost` datetime DEFAULT NULL COMMENT 'Fecha en la que se quiere publicar el artículo',
  `done` tinyint(1) NOT NULL COMMENT 'Marcar como que el artículo está terminado',
  `delete` tinyint(1) NOT NULL COMMENT 'Como no se pueden borrar artículos, se da la opción de marcar como borrado',
  `userCreate` varchar(256) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Guarda quien ha creado el artículo',
  `userPost` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Guarda quien publica el artículo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci