import PageHeader from '../../layout/page-header';
import Link from 'next/link';
import StaffForm from '../../components/staff/staff-form';

const AddStaff = () => {
  return (
    <>
      <PageHeader title="Add New Staff" description="Add new hospital staff">
        <Link href="/staffs" className="btn btn-success px-4">
          Staff List
        </Link>
      </PageHeader>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-lg-9">
            <div className="">
              <StaffForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddStaff;
