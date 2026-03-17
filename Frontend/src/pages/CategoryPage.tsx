import { useParams } from '@tanstack/react-router';

const CategoryPage = () => {
  const { categorie } = useParams({ from: '/films/$categorie' });

  return (
    <div>
      <h1>Catégorie : {categorie}</h1>
      <p>Films de cette catégorie</p>
    </div>
  );
};

export default CategoryPage;