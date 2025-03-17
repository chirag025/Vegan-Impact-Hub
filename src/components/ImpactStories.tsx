
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type Story = {
  id: number;
  title: string;
  content: string;
  image: string;
  animalName: string;
};

const stories: Story[] = [
  {
    id: 1,
    title: "Bella's Journey to Freedom",
    content: "Bella was rescued from a dairy farm where she had been separated from her calves repeatedly. Now she lives peacefully at a sanctuary where she can nurture and protect her young. Every plant-based milk choice helps more cows like Bella find freedom.",
    image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&w=600&q=80",
    animalName: "Bella the cow"
  },
  {
    id: 2,
    title: "Oliver's Second Chance",
    content: "Oliver was saved from a factory farm where thousands of pigs lived in crowded, unsanitary conditions. Today, he enjoys mud baths, fresh air, and the company of other rescued pigs. Your choice to reduce pork consumption directly helps pigs like Oliver.",
    image: "https://images.unsplash.com/photo-1517022812141-23620dba5c23?auto=format&fit=crop&w=600&q=80",
    animalName: "Oliver the pig"
  },
  {
    id: 3,
    title: "Luna's Path to Recovery",
    content: "Luna was rescued from an egg farm where she lived in a tiny cage. Her feathers were missing and her health was poor. With love and care, she recovered and now enjoys dust baths and sunshine. Every plant-based egg choice helps hens like Luna.",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?auto=format&fit=crop&w=600&q=80",
    animalName: "Luna the hen"
  }
];

const ImpactStories = () => {
  const [currentStory, setCurrentStory] = useState(0);

  const nextStory = () => {
    setCurrentStory((prev) => (prev + 1) % stories.length);
  };

  const prevStory = () => {
    setCurrentStory((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Lives You're Helping Save
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Behind every statistic is a living, feeling individual. Meet some of the animals whose lives have been changed thanks to compassionate food choices.
        </p>
      </div>

      <div className="relative">
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          onClick={prevStory}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <motion.div
          key={stories[currentStory].id}
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
                  src={stories[currentStory].image} 
                  alt={stories[currentStory].animalName} 
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                  {stories[currentStory].title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {stories[currentStory].content}
                </p>
                <div className="flex justify-center">
                  <Button className="gap-2">
                    <Heart className="h-4 w-4" />
                    Take Action For Animals
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
          onClick={nextStory}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex justify-center mt-4">
        {stories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentStory === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentStory(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImpactStories;
