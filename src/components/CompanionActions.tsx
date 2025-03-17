
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Utensils, Share2, Droplet, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";

type Action = {
  id: string;
  icon: JSX.Element;
  title: string;
  description: string;
  expReward: number;
  action: () => void;
  linkTo?: string;
};

const CompanionActions = () => {
  const { toast } = useToast();
  const [companionData, setCompanionData] = useState<any>(null);
  const [dailyActionsCompleted, setDailyActionsCompleted] = useState<string[]>([]);

  useEffect(() => {
    const storedCompanion = localStorage.getItem("companion");
    const storedDailyActions = localStorage.getItem("dailyActions");
    
    if (storedCompanion) {
      setCompanionData(JSON.parse(storedCompanion));
    }
    
    if (storedDailyActions) {
      const parsedActions = JSON.parse(storedDailyActions);
      const today = new Date().toDateString();
      
      // Check if stored actions are from today
      if (parsedActions.date === today) {
        setDailyActionsCompleted(parsedActions.actions);
      } else {
        // Reset daily actions for a new day
        localStorage.setItem("dailyActions", JSON.stringify({
          date: today,
          actions: []
        }));
      }
    } else {
      // Initialize daily actions tracking
      localStorage.setItem("dailyActions", JSON.stringify({
        date: new Date().toDateString(),
        actions: []
      }));
    }
  }, []);

  const completeAction = (actionId: string, expReward: number) => {
    if (!companionData) return;
    
    // Update companion data with experience
    const updatedCompanion = {
      ...companionData,
      experience: companionData.experience + expReward,
      happiness: Math.min(companionData.happiness + 5, 100),
      lastInteraction: new Date().toISOString()
    };
    
    // Check for level up
    if (updatedCompanion.experience >= updatedCompanion.nextLevelExp) {
      updatedCompanion.level += 1;
      updatedCompanion.nextLevelExp = updatedCompanion.nextLevelExp + 100 * updatedCompanion.level;
      
      toast({
        title: "Level Up!",
        description: `${companionData.name} has reached level ${updatedCompanion.level}!`,
        duration: 3000,
      });
    }
    
    // Save updated companion
    localStorage.setItem("companion", JSON.stringify(updatedCompanion));
    setCompanionData(updatedCompanion);
    
    // Mark action as completed for today
    const today = new Date().toDateString();
    const updatedDailyActions = [...dailyActionsCompleted, actionId];
    localStorage.setItem("dailyActions", JSON.stringify({
      date: today,
      actions: updatedDailyActions
    }));
    setDailyActionsCompleted(updatedDailyActions);
    
    toast({
      title: "Action Completed!",
      description: `${companionData.name} gained ${expReward} experience points!`,
      duration: 3000,
    });
  };

  const actions: Action[] = [
    {
      id: "log-meal",
      icon: <Utensils className="h-5 w-5 text-green-500" />,
      title: "Log Vegan Meal",
      description: "Record what you ate today to track your impact",
      expReward: 15,
      action: () => completeAction("log-meal", 15),
      linkTo: "/calculator"
    },
    {
      id: "share-impact",
      icon: <Share2 className="h-5 w-5 text-blue-500" />,
      title: "Share Your Impact",
      description: "Share your progress with friends and family",
      expReward: 20,
      action: () => completeAction("share-impact", 20),
      linkTo: "/calculator"
    },
    {
      id: "water-saved",
      icon: <Droplet className="h-5 w-5 text-cyan-500" />,
      title: "Track Water Savings",
      description: "See how much water you've saved by choosing plant-based",
      expReward: 10,
      action: () => completeAction("water-saved", 10),
      linkTo: "/calculator"
    },
    {
      id: "daily-challenge",
      icon: <Trophy className="h-5 w-5 text-amber-500" />,
      title: "Complete Daily Challenge",
      description: "Try a new vegan recipe or product today",
      expReward: 25,
      action: () => completeAction("daily-challenge", 25),
    },
    {
      id: "daily-check-in",
      icon: <Calendar className="h-5 w-5 text-purple-500" />,
      title: "Daily Check-in",
      description: "Check in with your companion every day",
      expReward: 5,
      action: () => completeAction("daily-check-in", 5),
    }
  ];

  if (!companionData) {
    return <div>Loading actions...</div>;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        Help {companionData.name} Thrive!
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">
        Complete these actions to improve your companion's health and happiness while making a positive impact.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const isCompleted = dailyActionsCompleted.includes(action.id);
          
          return (
            <Card key={action.id} className={isCompleted ? "bg-gray-100 dark:bg-gray-800/50" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    {action.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1 flex items-center">
                      {action.title}
                      {isCompleted && <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {action.description}
                    </p>
                    {action.linkTo ? (
                      <Link to={action.linkTo}>
                        <Button 
                          size="sm" 
                          variant={isCompleted ? "outline" : "default"}
                          onClick={isCompleted ? undefined : action.action}
                          disabled={isCompleted}
                        >
                          {isCompleted ? "Completed" : "Complete"}
                          {!isCompleted && <span className="ml-2 text-xs">+{action.expReward} XP</span>}
                        </Button>
                      </Link>
                    ) : (
                      <Button 
                        size="sm" 
                        variant={isCompleted ? "outline" : "default"}
                        onClick={isCompleted ? undefined : action.action}
                        disabled={isCompleted}
                      >
                        {isCompleted ? "Completed" : "Complete"}
                        {!isCompleted && <span className="ml-2 text-xs">+{action.expReward} XP</span>}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default CompanionActions;
