import { DataTypes } from 'sequelize';

const AlunoModel = (sequelize) => {
  return sequelize.define("Aluno", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    curso: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dias_semana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('ativo', 'inativo'),
      defaultValue: 'ativo',
    },
    data_matricula: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },    
    data_termino: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    motivo_saida: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    bairro: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cidade: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cep: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rg: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contato_emergencia_nome: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contato_emergencia_telefone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    plano_pagamento: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    origem: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};

export default AlunoModel;
