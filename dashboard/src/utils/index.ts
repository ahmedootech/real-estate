import Cookies from 'js-cookie';
export const isAuthorized = (roles: string[]) => {
  const role = Cookies.get('role');
  return roles.includes(role);
};
