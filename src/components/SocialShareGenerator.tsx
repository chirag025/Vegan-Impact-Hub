
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { 
  Twitter, 
  Facebook, 
  Instagram,
  Share2,
  Download,
  RefreshCw
} from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const backgroundOptions = [
  "bg-gradient-to-r from-green-400 to-blue-500",
  "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-r from-purple-500 to-pink-500",
  "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500",
  "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
];

const templateMessages = [
  "I've saved {{number}} animals this month by choosing plant-based meals! 🌱",
  "My vegan choices have saved {{number}} gallons of water this week! 💧",
  "I've reduced my carbon footprint by {{number}} kg of CO₂ this month! 🌎",
  "Going vegan has saved {{number}} square feet of forest this year! 🌳",
  "{{number}} animals are alive today because of my food choices! ❤️",
];

const SocialShareGenerator = () => {
  const [number, setNumber] = useState("10");
  const [message, setMessage] = useState(templateMessages[0].replace("{{number}}", "10"));
  const [background, setBackground] = useState(backgroundOptions[0]);
  const [platform, setPlatform] = useState("twitter");

  const updateMessage = (template: string) => {
    setMessage(template.replace("{{number}}", number));
  };

  const handleNumberChange = (value: string) => {
    setNumber(value);
    setMessage(message.replace(/\d+/, value));
  };

  const randomizeTemplate = () => {
    const randomTemplate = templateMessages[Math.floor(Math.random() * templateMessages.length)];
    updateMessage(randomTemplate);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(message);
    // In a real implementation, you would show a toast notification here
    console.log("Copied to clipboard!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Share Your Impact
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Inspire your friends and family by sharing the positive impact of your food choices.
          Customize your message and share it on social media!
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
            Customize Your Share
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Impact Number
              </label>
              <Input 
                type="number" 
                value={number}
                onChange={(e) => handleNumberChange(e.target.value)}
                min="1"
                max="10000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Message
              </label>
              <div className="flex gap-2 mb-2">
                <Textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="resize-none"
                  rows={3}
                />
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={randomizeTemplate}
                  title="Generate random message"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {templateMessages.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => updateMessage(template)}
                    className="text-xs bg-secondary/30 hover:bg-secondary/50 px-2 py-1 rounded"
                  >
                    {template.substring(0, 20)}...
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Background Style
              </label>
              <div className="flex flex-wrap gap-2">
                {backgroundOptions.map((bg, index) => (
                  <button
                    key={index}
                    onClick={() => setBackground(bg)}
                    className={`w-8 h-8 rounded ${bg} ${
                      background === bg ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Social Platform
              </label>
              <Tabs defaultValue="twitter" onValueChange={setPlatform}>
                <TabsList className="w-full">
                  <TabsTrigger value="twitter" className="flex-1">
                    <Twitter className="h-4 w-4 mr-2" />
                    Twitter
                  </TabsTrigger>
                  <TabsTrigger value="facebook" className="flex-1">
                    <Facebook className="h-4 w-4 mr-2" />
                    Facebook
                  </TabsTrigger>
                  <TabsTrigger value="instagram" className="flex-1">
                    <Instagram className="h-4 w-4 mr-2" />
                    Instagram
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4 text-gray-900 dark:text-gray-100">
            Preview
          </h3>
          
          <div className="border rounded-lg p-4 h-[300px] flex items-center justify-center">
            <motion.div 
              key={background + message}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className={`w-full max-w-[280px] aspect-square rounded-lg ${background} flex items-center justify-center p-6 text-white font-medium text-center shadow-lg`}
            >
              {message}
            </motion.div>
          </div>
          
          <div className="mt-6 flex gap-2 justify-center">
            <Button onClick={handleCopyToClipboard} className="gap-2">
              <Share2 className="h-4 w-4" />
              Copy Text
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShareGenerator;
