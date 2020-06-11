export const isValidImage = value => {
  // return true if we have a valid image (i.e value passed in is null)
  if (!value) return true;
  if (typeof value !== 'string') return false;

  // check for file extension name in URL
  const validFormats = ['png', 'jpeg', 'jpg', 'svg'];
  const extension = value.split('.').pop();
  // return true if our extension is one of our stated validFormats
  return validFormats.includes(extension);
};

// 'filename.png'
// ['filename', 'png']
// .pop() returns us 'png'

export const isValidURL = value => {
  if (!value) return true;
  if (typeof value !== 'string') return false;

  const expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(expression);

  // valid URL will return array of single item of passed in URL
  // hence will return true (making check valid)
  return value.match(regex) ? true : false;
};

export const samePassword = (getValues, field) => value => {
  if (!value) return true;
  if (typeof value !== 'string') return false;

  const compareToValue = getValues()[field];
  return compareToValue === value;
};
