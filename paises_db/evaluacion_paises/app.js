const express = require('express');
const cors = require('cors');
const Cursor = require('pg-cursor');

const pool = require('./db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));


// GET PAISES CON CURSOR

app.get('/paises', async (req, res) => {

    const limite = parseInt(req.query.limite) || 5;
    const offset = parseInt(req.query.offset) || 0;

    const client = await pool.connect();

    try {

        const cursor = client.query(
            new Cursor(`
                SELECT
                    p.nombre,
                    p.continente,
                    p.poblacion,
                    pp.pib_2019,
                    pp.pib_2020
                FROM paises p
                INNER JOIN paises_pib pp
                ON p.nombre = pp.nombre
                ORDER BY p.nombre
            `)
        );

        cursor.read(offset + limite, (err, rows) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: err.message
                });
            }

            const resultado = rows.slice(offset);

            res.json(resultado);

        });

    } catch (error) {

        res.status(500).json({
            ok: false,
            mensaje: error.message
        });

    } finally {

        client.release();

    }

});


// POST AGREGAR PAIS

app.post('/paises', async (req, res) => {

    const client = await pool.connect();

    try {

        const {
            nombre,
            continente,
            poblacion,
            pib_2019,
            pib_2020
        } = req.body;

        await client.query('BEGIN');

        await client.query(
            `
            INSERT INTO paises
            (nombre, continente, poblacion)
            VALUES ($1,$2,$3)
            `,
            [
                nombre,
                continente,
                poblacion
            ]
        );

        await client.query(
            `
            INSERT INTO paises_pib
            (nombre, pib_2019, pib_2020)
            VALUES ($1,$2,$3)
            `,
            [
                nombre,
                pib_2019,
                pib_2020
            ]
        );

        await client.query(
            `
            INSERT INTO paises_data_web
            (nombre_pais, accion)
            VALUES ($1,1)
            `,
            [nombre]
        );

        await client.query('COMMIT');

        res.status(201).json({
            ok: true,
            mensaje: 'Pais agregado correctamente'
        });

    } catch (error) {

        await client.query('ROLLBACK');

        res.status(409).json({
            ok: false,
            mensaje: error.message
        });

    } finally {

        client.release();

    }

});


// DELETE PAIS

app.delete('/paises/:nombre', async (req, res) => {

    const nombre = req.params.nombre;

    const client = await pool.connect();

    try {

        await client.query('BEGIN');

        await client.query(
            `
            DELETE FROM paises_pib
            WHERE nombre = $1
            `,
            [nombre]
        );

        await client.query(
            `
            DELETE FROM paises
            WHERE nombre = $1
            `,
            [nombre]
        );

        await client.query(
            `
            UPDATE paises_data_web
            SET accion = 0
            WHERE nombre_pais = $1
            `,
            [nombre]
        );

        await client.query('COMMIT');

        res.json({
            ok: true,
            mensaje: 'Pais eliminado correctamente'
        });

    } catch (error) {

        await client.query('ROLLBACK');

        res.status(409).json({
            ok: false,
            mensaje: error.message
        });

    } finally {

        client.release();

    }

});


app.listen(3000, () => {

    console.log(
        'Servidor en http://localhost:3000'
    );

});