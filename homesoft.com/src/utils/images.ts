export const prepareImageUrl = (imageUrl) => {
  return String(imageUrl).replace('public/', '');
};
