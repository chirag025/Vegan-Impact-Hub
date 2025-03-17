import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Recipe {
  id: number;
  title: string;
  image: string;
  summary: string;
  extendedIngredients: Array<{ original: string }>;
  instructions: string;
  sourceUrl: string;
}

const RecipeSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const SPOONACULAR_KEY = import.meta.env.VITE_SPOONACULAR_KEY;

  const { data, isLoading, error } = useQuery({
    queryKey: ["recipes", submittedSearch],
    queryFn: async () => {
      if (!submittedSearch.trim()) return [];
      
      const searchResponse = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?query=${submittedSearch}&diet=vegan&apiKey=${SPOONACULAR_KEY}`
      );
      const searchData = await searchResponse.json();
      
      const detailsPromises = searchData.results.map(async (recipe: any) => {
        const detailResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${SPOONACULAR_KEY}`
        );
        return detailResponse.json();
      });
      
      return Promise.all(detailsPromises);
    },
    enabled: !!submittedSearch, // Only fetch when submittedSearch has value
    retry: false
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(searchTerm.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear results immediately when input is emptied
    if (value.trim() === "") {
      setSubmittedSearch("");
    }
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="recipes">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
            Find Vegan Recipes
          </h2>
          
          <form onSubmit={handleSearch} className="flex gap-4 mb-12">
            <Input
              type="text"
              placeholder="Enter ingredients (e.g., tofu, lentils)"
              value={searchTerm}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Button 
              type="submit" 
              className="bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="animate-pulse">Searching...</span>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </form>

          {error && (
            <div className="text-center text-red-500 mb-4">
              Error: {error.message}
            </div>
          )}

          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, index) => (
                <div 
                  key={index}
                  className="animate-pulse bg-white dark:bg-gray-800 rounded-xl p-4"
                >
                  <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="flex gap-2 mt-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!isLoading && data && data.length === 0 && (
            <div className="text-center text-gray-600 dark:text-gray-300">
              No recipes found. Try different ingredients!
            </div>
          )}

          {!isLoading && data && data.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {data.map((recipe) => (
                <motion.div
                  key={recipe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer h-full"
                    onClick={() => setSelectedRecipe(recipe)}
                  >
                    <div className="aspect-square relative">
                      <img
                        src={recipe.image}
                        alt={recipe.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                        {recipe.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {recipe.extendedIngredients?.slice(0, 3).map((ingredient, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full"
                          >
                            {ingredient.original.split(',')[0]}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedRecipe} onOpenChange={() => setSelectedRecipe(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedRecipe && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">{selectedRecipe.title}</h2>
              
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
                className="w-full h-64 object-cover rounded-lg"
              />

              <div className="prose dark:prose-invert max-w-none">
                <h3 className="text-xl font-semibold mb-4">Ingredients</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {selectedRecipe.extendedIngredients.map((ingredient, i) => (
                    <li key={i} className="flex items-center">
                      <span className="mr-2">•</span>
                      {ingredient.original}
                    </li>
                  ))}
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">Instructions</h3>
                <div dangerouslySetInnerHTML={{ __html: selectedRecipe.instructions }} />

                <div className="mt-8">
                  <a
                    href={selectedRecipe.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    View Full Recipe
                    <Search className="w-4 h-4 ml-2" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default RecipeSection;