import { Sequelize } from 'sequelize';
import { Pool } from 'pg';

// Usar DATABASE_URL si existe (Render), sino construir desde env vars individuales
let sequelize;

if (process.env.DATABASE_URL) {
	// Detectar si es Render (hostname contiene 'render') para aplicar SSL
	const isRender = process.env.DATABASE_URL.includes('.render.com');

	sequelize = new Sequelize(process.env.DATABASE_URL, {
		dialect: 'postgres',
		logging: false,
		...(isRender && {
			// Solo aplicar SSL si es Render
			dialectOptions: {
				ssl: {
					require: true,
					rejectUnauthorized: false,
				},
			},
		}),
	});
} else {
	// Desarrollo local: sin SSL
	sequelize = new Sequelize(
		process.env.DB_NAME || 'hotels_db',
		process.env.DB_USER || 'postgres',
		process.env.DB_PASS || 'Andres04',
		{
			host: process.env.DB_HOST || 'localhost',
			dialect: 'postgres',
			port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
			logging: false,
		},
	);
}

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
