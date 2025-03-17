
import Navbar from "@/components/Navbar";
import RestaurantMap from "@/components/RestaurantMap";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RestaurantsPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto py-8 pt-24 mt-2">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">Vegan Restaurants Near You</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the best plant-based dining options in your area. From full vegan restaurants to places with great vegan options.
          </p>
          <div className="mt-4">
            <Link to="/calculator">
              <Button className="bg-primary hover:bg-primary/90">
                Calculate Your Impact
              </Button>
            </Link>
          </div>
        </div>
        <RestaurantMap />
      </div>
    </div>
  );
};

export default RestaurantsPage;
