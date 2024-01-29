import PageHeader from '../../layout/page-header';
import Link from 'next/link';
import StaffList from '../../components/staff/staff-list';
import PropertyList from '../../components/property/property-list';

const Properties = () => {
  return (
    <>
      <PageHeader
        title="Property List"
        description="List and manage properties"
      >
        <Link href="/properties/add-property" className="btn btn-dark px-4">
          Add New Property
        </Link>
      </PageHeader>
      <PropertyList />
    </>
  );
};

export default Properties;
