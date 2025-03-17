import Navbar from "@/components/Navbar";
import RecipeSection from "../components/RecipeSection";

const RecipesPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <RecipeSection />
    </div>
  );
};

export default RecipesPage;