import fastify from "fastify";
import db from "./plugins/db.js";
import alunosRoutes from "./routes/alunos.js";

const app = fastify({ logger: true });

await app.register(db);
await app.register(alunosRoutes);

export default app;