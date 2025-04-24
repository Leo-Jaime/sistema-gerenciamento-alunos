// src/routes/frequencia.js
async function frequenciaRoutes(fastify, options) {
    const { Frequencia, Aluno } = fastify.models;
  
    // Registrar presença ou falta
    fastify.post('/frequencias', async (request, reply) => {
      try {
        const { aluno_id, status, data } = request.body;
  
        if (!aluno_id || !status || !data) {
          return reply.code(400).send({ error: 'Campos alunoId, status e data são obrigatórios.' });
        }
  
        // Verifica se o aluno existe
        const aluno = await Aluno.findByPk(aluno_id);
        if (!aluno) {
          return reply.code(404).send({ error: 'Aluno não encontrado.' });
        }
  
        // Cria a frequência
        const novaFrequencia = await Frequencia.create({
          aluno_id,
          status, // presença ou falta
          data,
        });
  
        reply.code(201).send(novaFrequencia);
      } catch (error) {
        console.error('Erro ao registrar frequência:', error);
        reply.code(500).send({ error: 'Erro ao registrar frequência' });
      }
    });
  
    // Listar todas as frequências
    fastify.get('/frequencias', async (request, reply) => {
      try {
        const frequencias = await Frequencia.findAll({
          include: [{
            model: Aluno,
            attributes: ['nome', 'curso'],
          }],
        });
  
        reply.send(frequencias);
      } catch (error) {
        console.error('Erro ao listar frequências:', error);
        reply.code(500).send({ error: 'Erro ao listar frequências' });
      }
    });
  }
  
  export default frequenciaRoutes;
  