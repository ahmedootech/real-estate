export const toUpperCaseWords = (str: string = '') => {
  return str.replace(/\b\w/g, (char) => {
    return char.toUpperCase();
  });
};

export const replaceLongWords = (sentence: string, maxLength: number) => {
  if (sentence?.length <= maxLength) {
    return sentence;
  }
  return sentence?.slice(0, maxLength) + '...';
};

export const isEmpty = (obj: Object) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false; // If the object has any own property, it's not empty
    }
  }
  return true; // If the loop finishes without finding any own property, the object is empty
};
