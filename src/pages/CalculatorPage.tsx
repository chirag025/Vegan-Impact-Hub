
import Navbar from "@/components/Navbar";
import ImpactCalculator from "@/components/ImpactCalculator";
import EconomicImpactCalculator from "@/components/EconomicImpactCalculator";
import BadgeSystem from "@/components/BadgeSystem";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Award, Users, Coins } from "lucide-react";
import { useState, useEffect } from "react";
import ImpactStories from "@/components/ImpactStories";
import SocialShareGenerator from "@/components/SocialShareGenerator";
import CommunityImpact from "@/components/CommunityImpact";
import { Link } from "react-router-dom";

const CalculatorPage = () => {
  const [activeSection, setActiveSection] = useState<"calculator" | "economic" | "stories" | "share" | "community" | "badges">("calculator");
  const [environmentalValues, setEnvironmentalValues] = useState({
    water: 0,
    carbon: 0,
    land: 0,
    grain: 0,
  });
  const [economicPoints, setEconomicPoints] = useState(0);

  // Mock data updating (in a real app, this would come from actual calculations)
  useEffect(() => {
    // Simulate environmental impact data
    const timer = setInterval(() => {
      setEnvironmentalValues({
        water: Math.round(Math.random() * 2000) + 500,
        carbon: Math.round(Math.random() * 300) + 50,
        land: Math.round(Math.random() * 1000) + 200,
        grain: Math.round(Math.random() * 500) + 100,
      });
      
      setEconomicPoints(Math.round(Math.random() * 3000) + 500);
    }, 30000); // Update every 30 seconds
    
    // Initial values
    setEnvironmentalValues({
      water: 850,
      carbon: 75,
      land: 450,
      grain: 200,
    });
    
    setEconomicPoints(750);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="bg-gradient-to-b from-primary/5 to-transparent py-12 px-4 pt-24 mt-2">
        <div className="container mx-auto max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Your Choices <span className="text-primary">Change Lives</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Every meal is an opportunity to create a kinder world. 
            Discover how your daily food choices impact animals, the planet, and your health.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <Button 
            variant={activeSection === "calculator" ? "default" : "outline"}
            onClick={() => setActiveSection("calculator")}
            className="flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            Impact Calculator
          </Button>
          <Button 
            variant={activeSection === "economic" ? "default" : "outline"}
            onClick={() => setActiveSection("economic")}
            className="flex items-center gap-2"
          >
            <Coins className="h-4 w-4" />
            Economic Impact
          </Button>
          <Button 
            variant={activeSection === "badges" ? "default" : "outline"}
            onClick={() => setActiveSection("badges")}
            className="flex items-center gap-2"
          >
            <Award className="h-4 w-4" />
            My Badges
          </Button>
          <Button 
            variant={activeSection === "stories" ? "default" : "outline"}
            onClick={() => setActiveSection("stories")}
            className="flex items-center gap-2"
          >
            <Heart className="h-4 w-4" />
            Animal Stories
          </Button>
          <Button 
            variant={activeSection === "share" ? "default" : "outline"}
            onClick={() => setActiveSection("share")}
            className="flex items-center gap-2"
          >
            <Share2 className="h-4 w-4" />
            Share Your Impact
          </Button>
          <Button 
            variant={activeSection === "community" ? "default" : "outline"}
            onClick={() => setActiveSection("community")}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Community Impact
          </Button>
        </div>
        
        {activeSection === "calculator" && <ImpactCalculator />}
        {activeSection === "economic" && <EconomicImpactCalculator />}
        {activeSection === "badges" && <BadgeSystem 
          environmentalValues={environmentalValues} 
          economicPoints={economicPoints} 
        />}
        {activeSection === "stories" && <ImpactStories />}
        {activeSection === "share" && <SocialShareGenerator />}
        {activeSection === "community" && <CommunityImpact />}
      </div>
    </div>
  );
};

export default CalculatorPage;
