import { conectarBaseDatos } from './conexion.js';

async function getOrdenes() {
    const connection = await conectarBaseDatos();

    try {
        const result = await connection.execute(
            'SELECT * FROM orden'
        );
        return result.rows;
    } catch (err) {
        console.error("Error al obtener las ordenes: " + err);
        throw err;
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error('Error al cerrar la conexión :', err);
            }
        }
    }
}

getOrdenes();

export { getOrdenes }
