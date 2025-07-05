-- CreateTable
CREATE TABLE `ResumenLectura` (
    `idResumen` INTEGER NOT NULL AUTO_INCREMENT,
    `idUsuario` INTEGER NOT NULL,
    `idLibro` INTEGER NOT NULL,
    `paginasTotales` INTEGER NOT NULL,
    `minutosTotales` INTEGER NOT NULL,
    `generadoEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idResumen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
