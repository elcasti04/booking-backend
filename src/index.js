// src/index.js
import 'dotenv/config';
import app from './app.js';
import db from './database/db.js';

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await db.sync({ alter: true });
    console.log("Conexión a PostgreSQL exitosa");
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
  }
})();
