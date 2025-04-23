export default async function (fastify, opts) {
    const { Aluno } = fastify.models;
  
    fastify.post('/alunos', async (request, reply) => {
      try {
        const novoAlunoData = {
          ...request.body,  
          status: request.body.status || 'ativo'  
        };
 
        const novoAluno = await Aluno.create(novoAlunoData);
  
        reply.code(201).send(novoAluno);
      } catch (err) {
        reply.code(500).send({ error: 'Erro ao criar aluno', detalhes: err.message });
      }
    });
  
    
    fastify.get('/alunos', async (request, reply) => {
      try {
        const alunos = await Aluno.findAll();
        reply.send(alunos);
      } catch (err) {
        reply.code(500).send({ error: 'Erro ao buscar alunos', detalhes: err.message });
      }
    });
  
    
    fastify.put('/alunos/:id', async (request, reply) => {
      try {
        const { id } = request.params;
        const dados = request.body;
  
        const aluno = await Aluno.findByPk(id);
        if (!aluno) return reply.code(404).send({ error: 'Aluno não encontrado' });
  
        await aluno.update(dados);
        reply.send(aluno);
      } catch (err) {
        reply.code(500).send({ error: 'Erro ao atualizar aluno', detalhes: err.message });
      }
    });
  
   
    fastify.delete('/alunos/:id', async (request, reply) => {
      try {
        const { id } = request.params;
  
        const aluno = await Aluno.findByPk(id);
        if (!aluno) return reply.code(404).send({ error: 'Aluno não encontrado' });
  
        await aluno.destroy();
        reply.send({ mensagem: 'Aluno excluído com sucesso' });
      } catch (err) {
        reply.code(500).send({ error: 'Erro ao deletar aluno', detalhes: err.message });
      }
    });

    fastify.get('/alunos/dia/:dia', async (request, reply) => {
        try {
        const { dia } = request.params;
    
        const alunos = await fastify.models.Aluno.findAll({
            where: {
            dias_semana: {
                [fastify.Op.like]: `%${dia}%`  // Usando fastify.Op
            }
            }
        });
    
        reply.send({
            total: alunos.length,
            alunos
        });
        } catch (err) {
        reply.code(500).send({ error: 'Erro ao buscar alunos por dia', detalhes: err.message });
        }
    });
    
    fastify.get('/alunos/dia-horario/:dia/:hora_inicio/:hora_fim', async (request, reply) => {
        try {
        const { dia, hora_inicio, hora_fim } = request.params;
    
        const alunos = await fastify.models.Aluno.findAll({
            where: {
            dias_semana: {
                [fastify.Op.like]: `%${dia}%`  // Filtro pelo dia
            },
            horario: {
                [fastify.Op.gte]: `${hora_inicio}`,  // Filtro pelo horário de início
                [fastify.Op.lte]: `${hora_fim}`     // Filtro pelo horário de fim
            }
            }
        });
    
        reply.send({
            total: alunos.length,
            alunos
        });
        } catch (err) {
        reply.code(500).send({ error: 'Erro ao buscar alunos por dia e horário', detalhes: err.message });
        }
    });
  
  }
  