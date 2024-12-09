const dataSource = require('../database/models');
const Service = require('./Services.js');

class PessoasService extends Service {
  constructor(){
    super('Pessoa');
    this.matriculaService = new Service('Matricula');
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasAsMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasAsMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo('todosOsRegistros');
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(estudante_id) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro({ ativo: false }, { id: estudante_id }, transacao);
      await this.matriculaService.atualizaRegistro({ status: 'cancelado' }, { estudante_id: estudante_id }, transacao);
    });
  }
}

module.exports = PessoasService;