
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Droplet, Sparkles, Award } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type CompanionType = {
  id: string;
  name: string;
  species: string;
  image: string;
  story: string;
  adoptedAt: string;
  level: number;
  health: number;
  happiness: number;
  experience: number;
  nextLevelExp: number;
  actions: Array<{
    id: string;
    type: string;
    description: string;
    timestamp: string;
    expGained: number;
  }>;
  milestones: Array<{
    id: string;
    name: string;
    achieved: boolean;
    date?: string;
    requirementType?: string;
    requirement?: number;
  }>;
  unlockedStories: string[];
  lastInteraction: string;
};

const emptyCompanion: CompanionType = {
  id: "",
  name: "",
  species: "",
  image: "",
  story: "",
  adoptedAt: "",
  level: 1,
  health: 70,
  happiness: 60,
  experience: 0,
  nextLevelExp: 100,
  actions: [],
  milestones: [],
  unlockedStories: [],
  lastInteraction: "",
};

const VirtualCompanion = () => {
  const [companion, setCompanion] = useState<CompanionType>(emptyCompanion);
  const [isLoading, setIsLoading] = useState(true);
  const [animation, setAnimation] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Load companion data from localStorage
  useEffect(() => {
    const storedCompanion = localStorage.getItem("companion");
    if (storedCompanion) {
      try {
        const parsedCompanion = JSON.parse(storedCompanion);
        setCompanion(parsedCompanion);
        
        // Check for daily health/happiness decrease
        const lastInteraction = new Date(parsedCompanion.lastInteraction);
        const now = new Date();
        const daysDiff = Math.floor((now.getTime() - lastInteraction.getTime()) / (1000 * 60 * 60 * 24));
        
        if (daysDiff >= 1) {
          let newHealth = Math.max(parsedCompanion.health - (daysDiff * 5), 30);
          let newHappiness = Math.max(parsedCompanion.happiness - (daysDiff * 7), 20);
          
          const updatedCompanion = {
            ...parsedCompanion,
            health: newHealth,
            happiness: newHappiness,
            lastInteraction: now.toISOString(),
          };
          
          setCompanion(updatedCompanion);
          localStorage.setItem("companion", JSON.stringify(updatedCompanion));
          
          if (daysDiff >= 3) {
            toast({
              title: `${parsedCompanion.name} misses you!`,
              description: `It's been ${daysDiff} days since your last visit. Your companion needs attention!`,
              duration: 5000,
            });
          }
        }
      } catch (error) {
        console.error("Error parsing companion data:", error);
        navigate("/companion/create");
      }
    } else {
      navigate("/companion/create");
    }
    setIsLoading(false);
  }, [navigate, toast]);

  // Function to add a new action
  const addAction = (actionType: string, description: string, expGained: number) => {
    const newAction = {
      id: `action-${Date.now()}`,
      type: actionType,
      description: description,
      timestamp: new Date().toISOString(),
      expGained: expGained,
    };
    
    const newExp = companion.experience + expGained;
    let newLevel = companion.level;
    let nextLevelExp = companion.nextLevelExp;
    let leveledUp = false;
    
    // Check if leveled up
    if (newExp >= companion.nextLevelExp) {
      newLevel += 1;
      nextLevelExp = companion.nextLevelExp + 100 * newLevel;
      leveledUp = true;
    }
    
    // Update health and happiness based on action
    let newHealth = Math.min(companion.health + (actionType === "feed" ? 15 : 5), 100);
    let newHappiness = Math.min(companion.happiness + (actionType === "play" ? 20 : 7), 100);
    
    const updatedCompanion = {
      ...companion,
      level: newLevel,
      health: newHealth,
      happiness: newHappiness,
      experience: newExp,
      nextLevelExp: nextLevelExp,
      actions: [newAction, ...companion.actions],
      lastInteraction: new Date().toISOString(),
    };
    
    setCompanion(updatedCompanion);
    localStorage.setItem("companion", JSON.stringify(updatedCompanion));
    
    if (leveledUp) {
      toast({
        title: "Level Up!",
        description: `${companion.name} has reached level ${newLevel}!`,
        duration: 3000,
      });
      setAnimation("levelUp");
      setTimeout(() => setAnimation(null), 2000);
    } else {
      setAnimation(actionType);
      setTimeout(() => setAnimation(null), 1000);
    }
  };

  // Handle different interactions
  const handleFeed = () => {
    addAction("feed", `You fed ${companion.name} a healthy vegan meal`, 10);
  };
  
  const handlePet = () => {
    addAction("pet", `You showed affection to ${companion.name}`, 5);
  };
  
  const handlePlay = () => {
    addAction("play", `You played with ${companion.name}`, 15);
  };

  if (isLoading) {
    return <div className="p-12 text-center">Loading your companion...</div>;
  }

  const getCompanionState = () => {
    if (companion.health < 40 || companion.happiness < 30) return "sad";
    if (companion.health > 80 && companion.happiness > 80) return "thriving";
    return "normal";
  };

  const companionState = getCompanionState();

  return (
    <div className="w-full max-w-md">
      <Card className="bg-gradient-to-b from-primary/5 to-transparent border-2 overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center">
          <div className="mb-2 flex items-center gap-2">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold text-gray-900 dark:text-gray-100">
              Level {companion.level}
            </span>
          </div>
          
          <div className="relative w-full h-64 mb-4 flex items-center justify-center overflow-hidden">
            <AnimatePresence>
              <motion.div
                key={companionState + companion.level + (animation || "idle")}
                initial={{ scale: animation === "levelUp" ? 0.8 : 1 }}
                animate={{ 
                  scale: animation === "levelUp" ? 1.2 : 1,
                  y: animation === "play" ? [0, -20, 0] : 0,
                  rotate: animation === "play" ? [0, 5, -5, 0] : 0
                }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <img 
                  src={companion.image}
                  alt={companion.name}
                  className={`rounded-lg w-48 h-48 object-cover transition-all duration-300 ${
                    companionState === "sad" ? "brightness-75 grayscale-[30%]" : 
                    companionState === "thriving" ? "brightness-110 saturate-125" : ""
                  }`}
                />
                
                {animation === "levelUp" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-primary/30 backdrop-blur-sm rounded-full p-8 flex items-center justify-center">
                      <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                  </motion.div>
                )}
                
                {animation === "feed" && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute bottom-0 right-0"
                  >
                    <span className="text-xl">🌱</span>
                  </motion.div>
                )}
                
                {animation === "pet" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-0 right-0"
                  >
                    <span className="text-xl">❤️</span>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
          
          <h3 className="text-xl font-bold text-center mb-2">
            {companion.name} the {companion.species}
          </h3>
          
          <div className="w-full space-y-3 mb-4">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Heart className="h-4 w-4 text-red-500" /> Health
                </span>
                <span>{companion.health}%</span>
              </div>
              <Progress value={companion.health} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Sparkles className="h-4 w-4 text-amber-500" /> Happiness
                </span>
                <span>{companion.happiness}%</span>
              </div>
              <Progress value={companion.happiness} className="h-2" />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-1">
                  <Award className="h-4 w-4 text-blue-500" /> Experience
                </span>
                <span>{companion.experience}/{companion.nextLevelExp}</span>
              </div>
              <Progress value={(companion.experience / companion.nextLevelExp) * 100} className="h-2" />
            </div>
          </div>
          
          <div className="flex gap-2 mt-2">
            <Button onClick={handleFeed} variant="outline" size="sm" className="flex items-center gap-1">
              <span className="text-sm">🌱</span> Feed
            </Button>
            <Button onClick={handlePet} variant="outline" size="sm" className="flex items-center gap-1">
              <Heart className="h-3 w-3" /> Pet
            </Button>
            <Button onClick={handlePlay} variant="outline" size="sm" className="flex items-center gap-1">
              <span className="text-sm">🎾</span> Play
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VirtualCompanion;
