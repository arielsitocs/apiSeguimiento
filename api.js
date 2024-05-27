import express from 'express';
import cors from 'cors';
import { conectarBaseDatos } from './conexion.js';
import { getOrdenes } from './ordenes.js';

const app = express();
app.use(express.json());
app.use(cors())

const ordenes = [];

const cambiarEstado = async (codigo_orden, estado) => {
    const connection = await conectarBaseDatos();
    ordenes = await getOrdenes();

    try {
        for (const orden of ordenes) {
            if (orden[0] == codigo_orden) {
                const update = await connection.execute(
                    'UPDATE orden SET estado = :estado WHERE cod_orden = :codigo_orden',
                    { estado, codigo_orden },
                    { autoCommit: true }
                );

                console.log(`Estado de la orden ${codigo_orden} cambiado a ${estado}.`);
            } 
        }

    } catch (error) {
        console.error('Error al cambiar el estado de la orden:', error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
}

app.post('/cambiar-estado', async (req, res) => {
    const { codigo_orden, estado } = req.body;

    try {
        await cambiarEstado(codigo_orden, estado);

        res.json({ success: true, message: `Estado de la orden ${codigo_orden} cambiado a ${estado}`, ordenes });
    } catch (error) {
        res.status(500).json({ success: false, error: 'Hubo un error al cambiar el estado de la orden' });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto http://localhost:${PORT}`);
});

