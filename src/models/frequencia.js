import { DataTypes } from 'sequelize';

const FrequenciaModel = (sequelize) => {
  return sequelize.define('Frequencia', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    aluno_id: { // Campo que será a chave estrangeira
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Alunos', // Nome da tabela (no plural) onde a chave estrangeira se referencia
        key: 'id', // A chave primária da tabela 'Alunos'
      },
      onDelete: 'CASCADE', // Se um aluno for deletado, as frequências relacionadas também serão deletadas
    },
    data: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('presente', 'falta', 'reposicao'),
      allowNull: false,
    },
    observacao: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};

export default FrequenciaModel;
