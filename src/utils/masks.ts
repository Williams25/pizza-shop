export const mailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const phoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
export const fixePhoneRegex = /^\(\d{2}\) \d{4}-\d{4}$/;
export const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
export const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
export const cepRegex = /^\d{5}-\d{3}$/;
export const regexGtinEan = /^(\d{3}-\d{4}-\d{5}-\d)$/;
export const regexNcm = /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;

export const phoneMask = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{2})(\d)/g, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2');
};

export const CPFMask = (cpf: string) => {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
};

export const CNPJMask = (cnpj: string) => {
  return cnpj
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
};

export const currencyMask = (number: number | string): string => {
  let money: string;
  let intPart: string;
  let centPart: string;

  if (typeof number === 'number') number = number.toFixed(2);

  money = String(number);

  if (money.indexOf('c') !== -1 || money.indexOf('C') !== -1) {
    money = '0';
  }

  money = money.replace(/\D/g, '');
  if (money === '') {
    money = '0';
  }
  money = parseInt(money).toString();

  if (money.length > 13) {
    money = money.substring(0, 14);
  }

  if (money.length < 3 && money === '0') {
    money = '000';
  } else {
    for (let i = money.length; i < 3; i++) {
      money = '0' + money;
    }
  }

  intPart = money
    .slice(0, money.length - 2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  centPart = money.slice(-2);

  money = intPart + ',' + centPart;

  return money;
};

export const maskNumbers = (value: string) => {
  if (!value) return '';
  return value.replace(/[^0-9]/g, '');
};
