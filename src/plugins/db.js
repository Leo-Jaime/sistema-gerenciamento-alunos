// src/plugins/db.js
import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import AlunoModel from '../models/aluno.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

async function dbConnector(fastify, options) {
  try {
    await sequelize.authenticate();

    const Aluno = AlunoModel(sequelize);
    await sequelize.sync({ alter: true });

    // Decorando com Sequelize e o operador Op
    fastify.decorate('sequelize', sequelize);
    fastify.decorate('models', { Aluno });
    fastify.decorate('Op', Sequelize.Op);  // Decorando o Op

    fastify.log.info('Banco conectado e modelos sincronizados.');
  } catch (error) {
    fastify.log.error('Erro na conexão:', error);
    process.exit(1);
  }
}

export default fastifyPlugin(dbConnector);
