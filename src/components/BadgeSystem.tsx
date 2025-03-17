
import { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Award, Share2, Download, Trophy, Star, Target, Zap } from "lucide-react";
import { Badge } from "./ui/badge";
import { useToast } from "@/hooks/use-toast";
import confetti from 'canvas-confetti';

// Define badge tiers and requirements
const BADGE_TIERS = {
  novice: {
    threshold: 100,
    color: "bg-zinc-400",
    textColor: "text-zinc-900",
    title: "Plant Beginner",
    icon: <Award className="h-5 w-5" />,
  },
  bronze: {
    threshold: 500,
    color: "bg-amber-700",
    textColor: "text-amber-50",
    title: "Bronze Impactor",
    icon: <Award className="h-5 w-5" />,
  },
  silver: {
    threshold: 1500,
    color: "bg-zinc-300",
    textColor: "text-zinc-900",
    title: "Silver Saver",
    icon: <Star className="h-5 w-5" />,
  },
  gold: {
    threshold: 5000,
    color: "bg-amber-400",
    textColor: "text-amber-950",
    title: "Gold Guardian",
    icon: <Trophy className="h-5 w-5" />,
  },
  platinum: {
    threshold: 15000,
    color: "bg-emerald-600",
    textColor: "text-white",
    title: "Platinum Protector",
    icon: <Target className="h-5 w-5" />,
  },
  diamond: {
    threshold: 50000,
    color: "bg-blue-500",
    textColor: "text-white",
    title: "Diamond Defender",
    icon: <Zap className="h-5 w-5" />,
  },
};

// Additional achievement badges
const ACHIEVEMENT_BADGES = [
  {
    id: "water-saver",
    title: "Water Guardian",
    description: "Save 1,000 gallons of water",
    color: "bg-blue-500",
    textColor: "text-white",
    icon: <Award className="h-5 w-5" />,
    requirement: (values: any) => values.water >= 1000,
  },
  {
    id: "carbon-hero",
    title: "Carbon Champion",
    description: "Prevent 100kg of CO2 emissions",
    color: "bg-green-600",
    textColor: "text-white",
    icon: <Award className="h-5 w-5" />,
    requirement: (values: any) => values.carbon >= 100,
  },
  {
    id: "eco-innovator",
    title: "Economic Innovator",
    description: "Generate 1,000 economic impact points",
    color: "bg-amber-500",
    textColor: "text-white",
    icon: <Award className="h-5 w-5" />,
    requirement: (values: any) => values.economic >= 1000,
  },
];

type BadgeSystemProps = {
  environmentalValues: {
    water: number;
    carbon: number;
    land: number;
    grain: number;
  };
  economicPoints: number;
};

const BadgeSystem = ({ environmentalValues, economicPoints }: BadgeSystemProps) => {
  const { toast } = useToast();
  const [currentBadge, setCurrentBadge] = useState<keyof typeof BADGE_TIERS>("novice");
  const [earnedAchievements, setEarnedAchievements] = useState<string[]>([]);
  const [newBadgeEarned, setNewBadgeEarned] = useState(false);
  
  // Calculate total impact points
  const totalPoints = Math.round(
    environmentalValues.water * 0.1 + 
    environmentalValues.carbon * 10 + 
    environmentalValues.land * 0.5 + 
    environmentalValues.grain * 5 +
    economicPoints
  );

  // Determine current badge tier
  useEffect(() => {
    let highestEarnedTier: keyof typeof BADGE_TIERS = "novice";
    
    Object.entries(BADGE_TIERS).forEach(([tier, data]) => {
      if (totalPoints >= data.threshold) {
        highestEarnedTier = tier as keyof typeof BADGE_TIERS;
      }
    });
    
    if (highestEarnedTier !== currentBadge) {
      setCurrentBadge(highestEarnedTier);
      setNewBadgeEarned(true);
      
      // Trigger confetti effect for new badge
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      toast({
        title: "New Badge Earned!",
        description: `Congratulations! You've earned the ${BADGE_TIERS[highestEarnedTier].title} badge!`,
        duration: 5000,
      });
    }
  }, [totalPoints]);
  
  // Check for achievement badges
  useEffect(() => {
    const values = {
      ...environmentalValues,
      economic: economicPoints,
    };
    
    ACHIEVEMENT_BADGES.forEach((badge) => {
      if (badge.requirement(values) && !earnedAchievements.includes(badge.id)) {
        setEarnedAchievements((prev) => [...prev, badge.id]);
        
        toast({
          title: "Achievement Unlocked!",
          description: `You've earned the ${badge.title} achievement!`,
          duration: 5000,
        });
      }
    });
  }, [environmentalValues, economicPoints]);

  // Get next badge information
  const getNextBadge = () => {
    const tiers = Object.keys(BADGE_TIERS) as Array<keyof typeof BADGE_TIERS>;
    const currentIndex = tiers.indexOf(currentBadge);
    
    if (currentIndex < tiers.length - 1) {
      const nextTier = tiers[currentIndex + 1];
      return {
        title: BADGE_TIERS[nextTier].title,
        pointsNeeded: BADGE_TIERS[nextTier].threshold - totalPoints,
      };
    }
    
    return null;
  };
  
  const nextBadge = getNextBadge();
  
  // Progress percentage to next badge
  const calculateProgress = () => {
    const tiers = Object.keys(BADGE_TIERS) as Array<keyof typeof BADGE_TIERS>;
    const currentIndex = tiers.indexOf(currentBadge);
    
    if (currentIndex < tiers.length - 1) {
      const nextTier = tiers[currentIndex + 1];
      const currentThreshold = BADGE_TIERS[currentBadge].threshold;
      const nextThreshold = BADGE_TIERS[nextTier].threshold;
      
      const pointsInCurrentTier = totalPoints - currentThreshold;
      const tierRange = nextThreshold - currentThreshold;
      
      return Math.min(Math.round((pointsInCurrentTier / tierRange) * 100), 100);
    }
    
    return 100;
  };
  
  // Generate shareable badge image (mock implementation)
  const shareBadge = () => {
    toast({
      title: "Sharing Badge",
      description: "Your badge has been shared to social media!",
      duration: 3000,
    });
  };
  
  // Download badge image (mock implementation)
  const downloadBadge = () => {
    toast({
      title: "Downloading Badge",
      description: "Your badge image has been downloaded!",
      duration: 3000,
    });
  };
  
  return (
    <section className="py-16 bg-primary/5 dark:bg-primary/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900 dark:text-gray-100 flex items-center justify-center gap-2">
            <Trophy className="h-7 w-7 text-primary" />
            Your Impact Badges
          </h2>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Earn badges as you increase your positive impact on animals, the planet, and the global economy.
            Share your achievements with friends!
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <Card className="overflow-hidden">
              <div className={`p-6 ${BADGE_TIERS[currentBadge].color} ${BADGE_TIERS[currentBadge].textColor}`}>
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">Current Rank</h3>
                  <Badge variant="outline" className="border-current bg-white/20">
                    {totalPoints.toLocaleString()} Points
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center ${BADGE_TIERS[currentBadge].color} ${BADGE_TIERS[currentBadge].textColor}`}>
                    {BADGE_TIERS[currentBadge].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                      {BADGE_TIERS[currentBadge].title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {newBadgeEarned ? "Newly Earned!" : "Current Badge"}
                    </p>
                  </div>
                </div>
                
                {nextBadge && (
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress to {nextBadge.title}</span>
                      <span>{calculateProgress()}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-primary h-2.5 rounded-full" 
                        style={{ width: `${calculateProgress()}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {nextBadge.pointsNeeded.toLocaleString()} more points needed
                    </p>
                  </div>
                )}
                
                <div className="flex gap-3 mt-6">
                  <Button 
                    onClick={shareBadge} 
                    className="flex-1"
                    variant="outline"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Badge
                  </Button>
                  <Button 
                    onClick={downloadBadge} 
                    className="flex-1"
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Achievements Unlocked
              </h3>
              
              <div className="grid grid-cols-1 gap-4">
                {ACHIEVEMENT_BADGES.map((badge) => {
                  const isEarned = earnedAchievements.includes(badge.id);
                  
                  return (
                    <div 
                      key={badge.id}
                      className={`p-4 rounded-lg border ${
                        isEarned 
                          ? `${badge.color} ${badge.textColor}` 
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500'
                      } transition-colors`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                          {badge.icon}
                        </div>
                        <div>
                          <h4 className="font-bold">
                            {badge.title}
                          </h4>
                          <p className="text-sm opacity-90">
                            {badge.description}
                          </p>
                        </div>
                        {isEarned && (
                          <Badge className="ml-auto bg-white/30 text-current">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-primary/20">
                <h4 className="font-semibold mb-2 text-gray-900 dark:text-gray-100">How Points Are Calculated</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Water savings: 0.1 points per gallon</li>
                  <li>• Carbon reduction: 10 points per kg CO₂</li>
                  <li>• Land conservation: 0.5 points per sq ft</li>
                  <li>• Grain savings: 5 points per lb</li>
                  <li>• Economic impact: 1 point per impact point</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Keep tracking your impact to earn more badges and achievements!
            </p>
            <Button variant="default" className="bg-primary">
              <Award className="h-4 w-4 mr-2" />
              Share Your Badges
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BadgeSystem;
