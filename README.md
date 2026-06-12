# Inventario CCL

Sistema web para gestión de inventario de productos. Permite registrar entradas y salidas de productos, consultar el inventario actual y autenticar usuarios mediante JWT.

## Tecnologías

- **Backend:** C# con .NET Core 9 + PostgreSQL + Entity Framework Core
- **Frontend:** Angular 19 con TypeScript
- **Autenticación:** JWT (Bearer Token)

## Estructura del proyecto

inventario-ccl/
├── backend/    API REST en C# .NET Core 9
└── frontend/   Aplicación Angular

## Requisitos previos

- .NET 9 SDK
- PostgreSQL (puerto 5433)
- Node.js LTS
- Angular CLI (npm install -g @angular/cli)

## Configuración de la base de datos

1. Crear la base de datos en PostgreSQL:

CREATE DATABASE inventario_ccl;

2. Ejecutar el script de la base de datos ubicado en backend/script.sql

## Cómo correr el proyecto

### Backend

1. Ir a la carpeta backend
2. Actualizar la cadena de conexión en appsettings.json con tus credenciales de PostgreSQL
3. Ejecutar: dotnet run

El backend queda disponible en http://localhost:5148

### Frontend

1. Ir a la carpeta frontend
2. Instalar dependencias: npm install
3. Ejecutar: ng serve

La aplicación queda disponible en http://localhost:4200

## Credenciales de acceso

- Usuario: admin
- Contraseña: admin123