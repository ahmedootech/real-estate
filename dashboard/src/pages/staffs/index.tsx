import PageHeader from '../../layout/page-header';
import Link from 'next/link';
import StaffList from '../../components/staff/staff-list';

const Staffs = () => {
  return (
    <>
      <PageHeader title="Staff List" description="List and manage staff">
        <Link href="/staffs/add-staff" className="btn btn-success px-4">
          Add New Staff
        </Link>
      </PageHeader>
      <StaffList />
    </>
  );
};

export default Staffs;
