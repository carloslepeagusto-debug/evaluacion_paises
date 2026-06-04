# README

Este proyecto fue desarrollado utilizando Node.js, Express y PostgreSQL. El objetivo es administrar información de países mediante una aplicación web sencilla. 
El sistema permite listar países utilizando pg-cursor para mostrar los registros en bloques de 5, 10 o 20 elementos, además de agregar y eliminar países desde una interfaz web.

Para utilizar el proyecto primero se debe crear una base de datos en PostgreSQL y ejecutar el archivo SQL entregado para generar las tablas y los datos iniciales. 
Luego es necesario configurar los datos de conexión en el archivo db.js, indicando el usuario, contraseña y nombre de la base de datos.

Una vez configurado, se deben instalar las dependencias ejecutando el comando:

npm install

Después se puede iniciar el servidor con:

node app.js

Al ejecutarse correctamente, la aplicación estará disponible en:

http://localhost:3000

Entre las funcionalidades implementadas se encuentran el listado de países mediante cursor, la paginación de registros, la creación de nuevos países, la eliminación de países y el registro de acciones en la tabla paises_data_web. También se utilizaron transacciones con BEGIN, COMMIT y ROLLBACK para asegurar la integridad de los datos.
