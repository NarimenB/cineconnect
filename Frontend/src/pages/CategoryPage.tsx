
import { useParams } from '@tanstack/react-router';

const CategoryPage = () => {
  const params = useParams({ from: 'category' }); // pour récupérer $categorie
  return (
    <div>
      <h1>Catégorie : {params.categorie}</h1>
      <p>Films de cette catégorie</p>
    </div>
  );
};

export default CategoryPage;