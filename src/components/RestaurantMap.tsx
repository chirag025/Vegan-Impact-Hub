
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { MapPin, Navigation, Search, Loader2 } from "lucide-react";

interface Restaurant {
  id: number;
  name: string;
  address: string;
  distance: string;
  rating: number;
  type: string;
}

const SAMPLE_DATA: Restaurant[] = [
  {
    id: 1,
    name: "Green Garden",
    address: "123 Vegan St, Plantville",
    distance: "0.6 miles",
    rating: 4.8,
    type: "Full Vegan",
  },
  {
    id: 2,
    name: "Plant Power",
    address: "456 Greens Ave, Eco City",
    distance: "1.2 miles",
    rating: 4.6,
    type: "Vegetarian/Vegan Options",
  },
  {
    id: 3,
    name: "Leafy Delights",
    address: "789 Natural Rd, Greentown",
    distance: "2.1 miles",
    rating: 4.5,
    type: "Full Vegan",
  },
  {
    id: 4,
    name: "Veggie Heaven",
    address: "101 Plant Blvd, Freshville",
    distance: "0.8 miles",
    rating: 4.9,
    type: "Full Vegan",
  },
  {
    id: 5,
    name: "Nature's Plate",
    address: "202 Earth St, Sustainatown",
    distance: "1.5 miles",
    rating: 4.7,
    type: "Vegetarian/Vegan Options",
  },
];

const RestaurantMap = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>(SAMPLE_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  const mapContainerRef = useRef<HTMLDivElement>(null);

  // Simulate getting user location
  useEffect(() => {
    const getLocation = () => {
      setIsLoading(true);
      // Simulate geolocation API delay
      setTimeout(() => {
        setUserLocation("Current Location");
        setIsLoading(false);
      }, 1500);
    };

    getLocation();
  }, []);

  const handleSearch = () => {
    setIsLoading(true);
    // Simulate search delay
    setTimeout(() => {
      if (searchTerm.trim() === "") {
        setRestaurants(SAMPLE_DATA);
      } else {
        const filtered = SAMPLE_DATA.filter((restaurant) =>
          restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setRestaurants(filtered);
      }
      setIsLoading(false);
    }, 800);
  };

  const StarRating = ({ rating }: { rating: number }) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={i < fullStars ? "text-yellow-400" : (i === fullStars && hasHalfStar ? "text-yellow-400/50" : "text-gray-300")}>
            ★
          </span>
        ))}
        <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="grid md:grid-cols-5 gap-6 p-4">
      {/* Left Column - Search & Listings */}
      <div className="md:col-span-2 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Search vegan restaurants..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Button onClick={handleSearch} className="bg-primary">
            <Search className="h-4 w-4 mr-1" />
            Search
          </Button>
        </div>
        
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-2">
          <MapPin className="h-4 w-4 mr-1 text-primary" />
          {isLoading ? (
            <div className="flex items-center">
              <Loader2 className="h-3 w-3 mr-1 animate-spin" />
              Getting location...
            </div>
          ) : (
            userLocation || "Set your location"
          )}
        </div>
        
        <div className="space-y-3 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
          {restaurants.length === 0 ? (
            <p className="text-center py-8 text-gray-500">No restaurants found. Try a different search.</p>
          ) : (
            restaurants.map((restaurant) => (
              <Card key={restaurant.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {restaurant.type}
                    </span>
                  </div>
                  <StarRating rating={restaurant.rating} />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {restaurant.address}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm flex items-center">
                      <Navigation className="h-3 w-3 mr-1 text-primary" />
                      {restaurant.distance}
                    </span>
                    <Button variant="outline" size="sm" className="text-xs h-7">
                      Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
      
      {/* Right Column - Map */}
      <div className="md:col-span-3 rounded-lg bg-gray-200 dark:bg-gray-700 min-h-[500px] overflow-hidden">
        <div ref={mapContainerRef} className="w-full h-full relative">
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <MapPin className="h-12 w-12 mx-auto mb-3 text-primary opacity-50" />
              <h3 className="text-lg font-medium mb-2">Restaurant Map</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This would display an interactive map with restaurant locations.
                For a real implementation, integrate with Google Maps or Mapbox.
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs text-center">
                <div className="p-2 rounded bg-primary/10 text-primary">
                  <div className="font-bold">{restaurants.length}</div>
                  <div>Nearby</div>
                </div>
                <div className="p-2 rounded bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400">
                  <div className="font-bold">3</div>
                  <div>Full Vegan</div>
                </div>
                <div className="p-2 rounded bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400">
                  <div className="font-bold">2</div>
                  <div>Vegan Options</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMap;
