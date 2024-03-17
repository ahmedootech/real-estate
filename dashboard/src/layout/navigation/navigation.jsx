import Cookies from 'js-cookie';

const navigation = () => {
  const role = Cookies.get('role');

  let myNav = [];

  if (['Agent', 'Admin'].includes(role)) {
    myNav = myNav.concat([
      {
        label: 'Properties',
        children: [
          { label: 'Property List', path: '/properties/' },
          { label: 'Add New Property', path: '/properties/add-property' },
        ],
      },

      {
        label: 'Customers',
        children: [
          { label: 'Inspections', path: '/customers/inspections' },
          // { label: 'Add New Customer', path: '/customers/add-customer' },
        ],
      },
    ]);
  }
  if (['Admin'].includes(role)) {
    myNav = myNav.concat([
      {
        label: 'Categories',
        children: [
          { label: 'Category List', path: '/categories/' },
          { label: 'Add New Category', path: '/categories/add-category' },
        ],
      },
      {
        label: 'Staff',
        children: [
          { label: 'Staff List', path: '/staffs/' },
          { label: 'Add New Staff', path: '/staffs/add-staff' },
        ],
      },
    ]);
  }

  return myNav;
};
export default navigation;
