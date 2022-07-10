const nameValidation = (value) => {
  const regex = /^[a-zA-ZÁ-ÿ\u00f1\u00d1\s]{2,30}$/;
  return regex.test(value);
};

const usernameValidation = (value) => {
  const regex = /^([a-z0-9]|[-._](?![-._])){4,15}$/;
  return regex.test(value);
};

const emailValidation = (value) => {
  const regex =
    /^[a-zA-Z0-9À-ÿ\u00f1\u00d1\-\_]+@[a-zA-Z0-9Á-ÿ\u00f1\u00d1\-\_]+\.[a-zA-Z0-9Ä-ÿ\u00f1\u00d1\-\_]+$/;
  return regex.test(value);
};

module.exports = {
  nameValidation,
  usernameValidation,
  emailValidation,
};
