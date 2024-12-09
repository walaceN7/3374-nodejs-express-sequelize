function ehUmCPF(cpf) {
  const cpfFornecido = cpf.replace(/\.|-/g, '');

  if (cpfFornecido.length !== 11) return false;

  if (validaNumerosRepetidos(cpfFornecido) || validaDigito(cpfFornecido, 1) || validaDigito(cpfFornecido, 2)) return false;

  return true;
}

function validaNumerosRepetidos(cpfFornecido) {
  const numerosRepetidos = ['00000000000', '11111111111', '22222222222', '33333333333', '44444444444', '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'];
  return numerosRepetidos.includes(cpfFornecido);
}

function validaDigito(cpfFornecido, digito) {
  let soma = 0;
  let multiplicador = 10;
  let tamanho = 9;

  if (digito === 2){
    multiplicador = 11;
    tamanho = 10;
  }

  for (let i = 0; i < tamanho; i++) {
    soma += cpfFornecido[i] * multiplicador;
    multiplicador--;        
  }

  soma = (soma * 10) % 11;

  if (soma === 10 || soma === 11) soma = 0;

  return soma != cpfFornecido[tamanho];
}

module.exports = (cpf) => {
  if (!ehUmCPF(cpf)) return false;
  return true;
};