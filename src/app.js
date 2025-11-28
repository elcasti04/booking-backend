import express from 'express';
import cors from 'cors';
import db from './database/db.js';

// Routers
import cityRoutes from './routes/city.routes.js';
import hotelRoutes from './routes/hotel.routes.js';
import authRoutes from './routes/auth.routes.js';
import bookingRoutes from './routes/booking.routes.js';
import reviewRoutes from './routes/review.routes.js';
import roomRoutes from './routes/room.routes.js';
import userRoutes from './routes/user.routes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('¡Bienvenido a mi API del hotel!'));

// Mount routers
app.use('/cities', cityRoutes);
app.use('/hotels', hotelRoutes);
app.use('/auth', authRoutes);
app.use('/bookings', bookingRoutes);
app.use('/reviews', reviewRoutes);
app.use('/rooms', roomRoutes);
app.use('/users', userRoutes);

// Conexión a la base de datos y levantar el servidor
(async () => {
	try {
		// No eliminar secuencias/tipos automáticamente: evita pérdida de datos.
		// Intentamos adaptar tablas sin borrar datos existentes.
		await db.sync({ alter: true });
		console.log('Conexión a PostgreSQL exitosa 📦 (sync { alter: true })');
		const PORT = process.env.PORT || 3000;
		app.listen(PORT, () => {
			console.log(`Servidor corriendo en puerto ${PORT}`);
		});
	} catch (error) {
		console.error('Error al conectar a la base de datos:', error);
	}
})();

export default app;
