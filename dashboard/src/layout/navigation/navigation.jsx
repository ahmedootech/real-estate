// import { useAuth } from '../../../auth/hooks/use-auth';

const navigation = () => {
  // const auth = useAuth();

  if (['Manager', 'Admin'].includes('Admin')) {
    return [
      {
        label: 'Properties',
        children: [
          { label: 'Property List', path: '/properties/' },
          { label: 'Add New Property', path: '/properties/add-property' },
        ],
      },

      {
        label: 'Staff',
        children: [
          { label: 'Staff List', path: '/staffs/' },
          { label: 'Add New Staff', path: '/staffs/add-staff' },
        ],
      },
      {
        label: 'Customers',
        children: [
          { label: 'Customer List', path: '/customers/' },
          { label: 'Add New Customer', path: '/customers/add-customer' },
        ],
      },
      {
        label: 'Reports',
        children: [
          { label: 'Today', path: '/reports/today' },
          { label: 'Range Report', path: '/reports/range-report' },
        ],
      },

      // {
      //   label: 'Sales',
      //   path: '/reports',
      //   children: [
      //     { label: 'Sales point', path: '/sales/sales-point' },
      //     { label: 'Today sales', path: '/sales/today' },
      //     { label: 'Sales list', path: '/sales' },
      //   ],
      // },
      // {
      //   label: 'Products',
      //   path: '/products',
      //   children: [
      //     { label: 'Stock in', path: '/products/stock-in' },
      //     { label: 'Products', path: '/products' },
      //     { label: 'Categories', path: '/products/categories' },
      //   ],
      // },
      // {
      //   label: 'Users',
      //   path: '/users',
      //   children: [{ label: 'Users', path: '/users' }],
      // },
      // {
      //   label: 'Suppliers',
      //   path: '/suppliers',
      // },
      // {
      //   label: 'Customers',
      //   path: '/suppliers',
      // },
    ];
  } else if (['Sales'].includes(auth.user.role)) {
    return [
      {
        label: 'Sales',
        path: '/reports',
        children: [
          { label: 'Sales point', path: '/sales/sales-point' },
          { label: 'My sales', path: '/sales/my-sales' },
        ],
      },
    ];
  }

  return [];
};
export default navigation;
