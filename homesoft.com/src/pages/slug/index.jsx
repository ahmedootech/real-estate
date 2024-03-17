import { useRouter } from 'next/router';

import SearchForm from '../../components/search/property-search';
import PageHeader from '../../components/layouts/page-header';

const Search = () => {
  const router = useRouter();

  const permittedRoutes = ['for-sale', 'to-rent', 'new-homes'];

  let slug = router.query.slug;
  if (!slug) {
    slug = 'loading...';
  } else {
    if (!permittedRoutes.includes(slug)) {
      router.push('/to-rent');
    }
  }

  return (
    <>
      <PageHeader title={slug} />
      <SearchForm slug={slug} />
    </>
  );
};
export default Search;
