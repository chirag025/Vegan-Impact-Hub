
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";

type AnimalType = {
  id: string;
  name: string;
  species: string;
  image: string;
  story: string;
};

const animals: AnimalType[] = [
  {
    id: "cow-1",
    name: "Bella",
    species: "Cow",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
    story: "Bella was rescued from a dairy farm where she had been separated from her calves repeatedly. Now she lives peacefully at a sanctuary where she can nurture and protect her young."
  },
  {
    id: "pig-1",
    name: "Oliver",
    species: "Pig",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80",
    story: "Oliver was saved from a factory farm where thousands of pigs lived in crowded, unsanitary conditions. Today, he enjoys mud baths, fresh air, and the company of other rescued pigs."
  },
  {
    id: "chicken-1",
    name: "Luna",
    species: "Chicken",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80",
    story: "Luna was rescued from an egg farm where she lived in a tiny cage. Her feathers were missing and her health was poor. With love and care, she recovered and now enjoys dust baths and sunshine."
  },
  {
    id: "goat-1",
    name: "Charlie",
    species: "Goat",
    image: "https://images.unsplash.com/photo-1438565434616-3ef039228b15?auto=format&fit=crop&w=600&q=80",
    story: "Charlie was rescued from a petting zoo where he was malnourished and suffering from neglect. Now he enjoys climbing rocks and playing with other goats at his sanctuary home."
  },
  {
    id: "sheep-1",
    name: "Daisy",
    species: "Sheep",
    image: "https://images.unsplash.com/photo-1465379944081-7f47de8d74ac?auto=format&fit=crop&w=600&q=80",
    story: "Daisy was rescued just before being sent to slaughter. She had never been properly sheared and was suffering from the weight of her overgrown wool. Now she enjoys the sunshine and grassy fields at her sanctuary."
  }
];

const CompanionCreatePage = () => {
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [selectedName, setSelectedName] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePrevious = () => {
    setCurrentAnimal((prev) => (prev - 1 + animals.length) % animals.length);
    setSelectedName(animals[(currentAnimal - 1 + animals.length) % animals.length].name);
  };

  const handleNext = () => {
    setCurrentAnimal((prev) => (prev + 1) % animals.length);
    setSelectedName(animals[(currentAnimal + 1) % animals.length].name);
  };

  const handleAdopt = () => {
    const companion = {
      ...animals[currentAnimal],
      adoptedAt: new Date().toISOString(),
      level: 1,
      health: 70,
      happiness: 60,
      experience: 0,
      nextLevelExp: 100,
      actions: [],
      milestones: [
        { id: "milestone-1", name: "Adoption Day", achieved: true, date: new Date().toISOString() },
        { id: "milestone-2", name: "First Week Together", achieved: false, requirementType: "days", requirement: 7 },
        { id: "milestone-3", name: "First Month Anniversary", achieved: false, requirementType: "days", requirement: 30 },
        { id: "milestone-4", name: "Log 10 Vegan Meals", achieved: false, requirementType: "meals", requirement: 10 },
        { id: "milestone-5", name: "Share 5 Times", achieved: false, requirementType: "shares", requirement: 5 },
      ],
      unlockedStories: ["intro"],
      lastInteraction: new Date().toISOString()
    };
    
    localStorage.setItem("companion", JSON.stringify(companion));
    toast({
      title: "Companion Adopted!",
      description: `${animals[currentAnimal].name} is now your companion! Take good care of them.`,
      duration: 3000,
    });
    
    navigate("/companion");
  };

  const animal = animals[currentAnimal];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
          Choose Your Animal Companion
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          These animals have been rescued from situations of cruelty and exploitation.
          Choose one to be your virtual companion, and help them thrive through your vegan actions!
        </p>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              onClick={handlePrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <motion.div
              key={animal.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="px-10"
            >
              <Card className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <img 
                      src={animal.image} 
                      alt={animal.name} 
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-6">
                    <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                      {animal.name} the {animal.species}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {animal.story}
                    </p>
                    <div className="flex justify-center">
                      <Button onClick={handleAdopt} className="gap-2">
                        <Heart className="h-4 w-4" />
                        Adopt {animal.name}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
            
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            {animals.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 mx-1 rounded-full ${
                  currentAnimal === index ? "bg-primary" : "bg-gray-300"
                }`}
                onClick={() => setCurrentAnimal(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionCreatePage;
