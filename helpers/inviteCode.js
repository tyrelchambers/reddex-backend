import voucher_codes from 'voucher-code-generator';


const voucher = () => {
  const token = voucher_codes.generate({
    length: 50,
    count: 1,
    charset: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
  });

  return token[0];
};

module.exports = voucher;