import { conectarBaseDatos } from './conexion.js';
import { getOrdenes } from './ordenes.js';

const cambiarEstado = async (codigo_orden, estado) => {
    const connection = await conectarBaseDatos();
    const ordenes = await getOrdenes();
    
    try {
        for (const orden of ordenes) {
            if (orden[0] === codigo_orden) {
                const update = await connection.execute(
                    'UPDATE orden SET estado = :estado WHERE cod_orden = :codigo_orden',
                    { estado, codigo_orden },
                    { autoCommit: true }
                );
        
                console.log(`Estado de la orden ${codigo_orden} cambiado a ${estado}.`);
                return update;
            }
        }
        
        console.log('No se encontró una orden con el número:', codigo_orden);
        return null;
    } catch (error) {
        console.error('Error al cambiar el estado de la orden:', error);
        throw error;
    } finally {
        if (connection) {
            try {
                await connection.close();
                console.log('Conexión cerrada');
            } catch (error) {
                console.error('Error al cerrar la conexión:', error);
            }
        }
    }
}

// cambiarEstado(62, 'COMPLETADO');
