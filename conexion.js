import oracledb from 'oracledb';

async function conectarBaseDatos() {
    try {
        const connection = await oracledb.getConnection({
            user: 'sportfit',
            password: 'sportfit',
            connectString: 'localhost:1521/orcl'
        });
        return connection;
    } catch(err) {
        console.error("Error al conectar a Oracle: " + err);
        throw err;
    }
}

export { conectarBaseDatos }