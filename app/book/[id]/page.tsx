import Footer from '../../../components/sections/Footer';
import BookDetailsPage from '../../../components/hostelandresto/BookDetailsPage';

export default function BookPage({ params }: { params: { id: string } }) {
  return <><BookDetailsPage id={params.id} /><Footer /></>;
}
