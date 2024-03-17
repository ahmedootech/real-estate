import CategoryForm from '../../components/category/category-form';
import PropertyForm from '../../components/property/property-form';
import PageHeader from '../../layout/page-header';
import Link from 'next/link';

const AddCategory = () => {
  return (
    <>
      <PageHeader title="Add New Category">
        <Link href="/categories" className="btn btn-dark px-4">
          Category List
        </Link>
      </PageHeader>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-lg-5">
            <div className="">
              <CategoryForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddCategory;
