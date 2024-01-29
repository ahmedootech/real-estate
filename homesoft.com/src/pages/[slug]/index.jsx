import { useRouter } from 'next/router';

import SearchForm from '../../components/search/property-search';
import CurrentPage from '../../components/layouts/current-page';

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
      <CurrentPage pageTitle={slug} />
      <SearchForm slug={slug} />
    </>
  );
};
export default Search;
