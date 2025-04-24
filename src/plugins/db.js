import fastifyPlugin from 'fastify-plugin';
import { Sequelize } from 'sequelize';
import AlunoModel from '../models/aluno.js';
import FrequenciaModel from '../models/frequencia.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logging: false,
});

async function dbConnector(fastify, options) {
  try {
    await sequelize.authenticate();

    const Aluno = AlunoModel(sequelize);
    const Frequencia = FrequenciaModel(sequelize);

    // --- ASSOCIAÇÕES ---
    Aluno.hasMany(Frequencia, { foreignKey: 'aluno_id' });
    Frequencia.belongsTo(Aluno, { foreignKey: 'aluno_id' });

    await sequelize.sync({ alter: true });

    // Decorando com Sequelize e o operador Op
    fastify.decorate('sequelize', sequelize);
    fastify.decorate('models', { Aluno, Frequencia });
    fastify.decorate('Op', Sequelize.Op);

    fastify.log.info('Banco conectado e modelos sincronizados.');
  } catch (error) {
    console.error('Erro detalhado na conexão com o banco:', error);
    process.exit(1);
  }
}

export default fastifyPlugin(dbConnector);