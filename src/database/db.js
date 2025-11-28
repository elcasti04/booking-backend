import { Sequelize } from 'sequelize';
import { Pool } from 'pg';

export const sequelize = new Sequelize(
	process.env.DB_NAME || 'hotels_db', // BD
	process.env.DB_USER || 'postgres', // usuario
	process.env.DB_PASS || 'Andres04', // contraseña
	{
		host: process.env.DB_HOST || 'localhost',
		dialect: 'postgres',
		port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
		logging: false,
	},
);

// Pool for raw queries used by controllers that expect `pool.query`
export const pool = new Pool({
	user: process.env.DB_USER || 'postgres',
	host: process.env.DB_HOST || 'localhost',
	database: process.env.DB_NAME || 'hotels_db',
	password: process.env.DB_PASS || 'Andres04',
	port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

(async () => {
	try {
		await sequelize.authenticate();
		console.log('Conexión a PostgreSQL exitosa 🚀');
	} catch (error) {
		console.error('❌ Error al conectar a PostgreSQL:', error);
	}
})();

export default sequelize;
