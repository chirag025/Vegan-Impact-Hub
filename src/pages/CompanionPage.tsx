
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import VirtualCompanion from "@/components/VirtualCompanion";
import CompanionActions from "@/components/CompanionActions";
import CompanionStory from "@/components/CompanionStory";
import CompanionProgress from "@/components/CompanionProgress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Share2, BookOpen, Trophy, Heart } from "lucide-react";

const CompanionPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>("interact");

  useEffect(() => {
    // Check if the user has a companion already
    const hasCompanion = localStorage.getItem("companion");
    if (!hasCompanion) {
      navigate("/companion/create");
    }
  }, [navigate]);

  const handleShare = () => {
    toast({
      title: "Sharing Companion",
      description: "Your companion's progress has been shared!",
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-24">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900 dark:text-gray-100">
          Your Animal Companion
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Meet your virtual rescued animal friend! Take actions to help them thrive
          and grow while learning about animal welfare.
        </p>
        
        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-2 flex flex-col items-center">
            <VirtualCompanion />
            
            <div className="mt-4 w-full flex justify-center gap-2">
              <Button onClick={handleShare} variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button 
                onClick={() => navigate("/calculator")} 
                variant="default" 
                size="sm" 
                className="flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                Log Impact
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Tabs defaultValue="interact" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="interact" className="flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Interact
                </TabsTrigger>
                <TabsTrigger value="story" className="flex items-center gap-1">
                  <BookOpen className="h-4 w-4" />
                  Story
                </TabsTrigger>
                <TabsTrigger value="progress" className="flex items-center gap-1">
                  <Trophy className="h-4 w-4" />
                  Progress
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="interact" className="mt-4">
                <CompanionActions />
              </TabsContent>
              
              <TabsContent value="story" className="mt-4">
                <CompanionStory />
              </TabsContent>
              
              <TabsContent value="progress" className="mt-4">
                <CompanionProgress />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanionPage;
