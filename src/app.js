import fastify from "fastify";
import db from "./plugins/db.js";
import alunosRoutes from "./routes/alunos.js";
import frequenciaRoutes from "./routes/frequencia.js";

const app = fastify({ logger: true });

await app.register(db);
await app.register(alunosRoutes);
await app.register(frequenciaRoutes);

export default app;