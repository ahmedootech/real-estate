import CategoryForm from '../../components/category/category-form';
import CategoryList from '../../components/category/category-list';
import PropertyForm from '../../components/property/property-form';
import PageHeader from '../../layout/page-header';
import Link from 'next/link';

const Categories = () => {
  return (
    <>
      <PageHeader title="Categories">
        <Link href="/categories/add-category" className="btn btn-dark px-4">
          Add New Category
        </Link>
      </PageHeader>
      <div className="container-fluid g-0">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              <CategoryList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Categories;
