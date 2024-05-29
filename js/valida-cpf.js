// export default function ehUmCPF(campo) {
//     const cpf = campo.value.replace(/\.|-/g, "");
//     if (validaNumerosRepetidos(cpf) || validaPrimeiroDigito(cpf) || validaSegundoDigito(cpf)) {
//         campo.setCustomValidity('Esse cpf não é válido')
//     }
//   }

//   function validaNumerosRepetidos(cpf) {
//     const numerosRepetidos = [
//         '00000000000',
//         '11111111111',
//         '22222222222',
//         '33333333333',
//         '44444444444',
//         '55555555555',
//         '66666666666',
//         '77777777777',
//         '88888888888',
//         '99999999999'
//     ]

//     return numerosRepetidos.includes(cpf)
//   }

//   function validaPrimeiroDigito(cpf) {
//     let soma = 0;
//     let multiplicador = 10;

//     for (let tamanho = 0; tamanho < 9; tamanho++) {
//         soma += cpf[tamanho] * multiplicador;
//         multiplicador--
//     }

//     soma = (soma * 10) % 11;

//     if (soma == 10 || soma == 11) {
//         soma = 0;
//     }

//     return soma != cpf[9];
//   }

//   function validaSegundoDigito(cpf) {
//     let soma = 0;
//     let multiplicador = 11;

//     for (let tamanho = 0; tamanho < 10; tamanho++) {
//         soma += cpf[tamanho] * multiplicador;
//         multiplicador--
//     }

//     soma = (soma * 10) % 11;

//     if (soma == 10 || soma == 11) {
//         soma = 0;
//     }

//     return soma != cpf[10];
//   }

export default function ehUmCPF(campo) {
  const cpf = campo.value.replace(/[^\d]+/g, "");

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  let soma = 0;
  let resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(10, 11))) return false;

  return true;
}
