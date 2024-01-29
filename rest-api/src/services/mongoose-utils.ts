import mongoose from 'mongoose';

export const transformDocument = (returnObj: any) => {
  returnObj.id = returnObj._id;
  delete returnObj._id;
  delete returnObj.__v;

  return returnObj;
};
