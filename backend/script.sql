-- Script de base de datos para Inventario CCL
-- Ejecutar en PostgreSQL despues de crear la base de datos inventario_ccl

CREATE TABLE "Productos" (
    "Id" SERIAL PRIMARY KEY,
    "Nombre" VARCHAR(100) NOT NULL,
    "Cantidad" INT NOT NULL DEFAULT 0
);

CREATE TABLE "Movimientos" (
    "Id" SERIAL PRIMARY KEY,
    "ProductoId" INT REFERENCES "Productos"("Id"),
    "Tipo" VARCHAR(10) NOT NULL,
    "Cantidad" INT NOT NULL,
    "Fecha" TIMESTAMP DEFAULT NOW()
);

-- Datos iniciales
INSERT INTO "Productos" ("Nombre", "Cantidad") VALUES
('Producto A', 100),
('Producto B', 50),
('Producto C', 200);