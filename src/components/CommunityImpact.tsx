
import { Card, CardContent } from "./ui/card";
import { Award, Users, Trophy, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { motion } from "framer-motion";

// Sample community impact data
const communityData = {
  animalsSaved: 25720,
  waterSaved: 15200000, // gallons
  co2Reduced: 128500, // kg
  participants: 1845,
  totalMeals: 48720
};

// Sample weekly challenge data
const challengeData = [
  { name: "Mon", participants: 245 },
  { name: "Tue", participants: 312 },
  { name: "Wed", participants: 287 },
  { name: "Thu", participants: 356 },
  { name: "Fri", participants: 389 },
  { name: "Sat", participants: 412 },
  { name: "Sun", participants: 378 },
];

// Sample monthly progress data
const monthlyData = [
  { name: "Jan", animalsSaved: 1220, co2Reduced: 5400 },
  { name: "Feb", animalsSaved: 1680, co2Reduced: 7200 },
  { name: "Mar", animalsSaved: 2120, co2Reduced: 9400 },
  { name: "Apr", animalsSaved: 2590, co2Reduced: 11200 },
  { name: "May", animalsSaved: 3240, co2Reduced: 14600 },
  { name: "Jun", animalsSaved: 4120, co2Reduced: 19200 },
];

// Top contributors data
const topContributors = [
  { name: "Sarah J.", impact: 215, badge: "Earth Protector" },
  { name: "Michael T.", impact: 187, badge: "Animal Advocate" },
  { name: "Elena R.", impact: 162, badge: "Compassion Champion" },
  { name: "David K.", impact: 145, badge: "Plant Pioneer" },
];

// Current challenge data
const currentChallenge = {
  title: "7-Day Plant Protein Challenge",
  description: "Try a different plant protein source every day this week: tofu, lentils, chickpeas, seitan, tempeh, beans, and quinoa!",
  participants: 487,
  daysLeft: 3
};

const formatNumber = (num: number) => {
  return num >= 1000000 
    ? (num / 1000000).toFixed(1) + "M" 
    : num >= 1000 
    ? (num / 1000).toFixed(1) + "K" 
    : num.toString();
};

const CommunityImpact = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 text-gray-900 dark:text-gray-100">
          Our Collective Impact
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Together, we're creating a kinder world. See how our community is making a difference for animals and the planet.
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(communityData.animalsSaved)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Animals Saved</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center mx-auto mb-2">
                <div className="text-blue-500">💧</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(communityData.waterSaved)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gallons of Water</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-2">
                <div className="text-green-500">🌎</div>
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(communityData.co2Reduced)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">kg CO₂ Reduced</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                <Users className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {formatNumber(communityData.participants)}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Community Members</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100 flex items-center">
              <Trophy className="h-4 w-4 mr-2 text-amber-500" />
              Leaderboard
            </h3>
            <div className="space-y-3">
              {topContributors.map((contributor, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">{contributor.name}</p>
                      <span className="text-xs bg-secondary/20 px-2 py-0.5 rounded">
                        {contributor.badge}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900 dark:text-gray-100">{contributor.impact}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">meals</p>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full mt-2">
                View Full Leaderboard
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100 flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-green-500" />
              Current Challenge
            </h3>
            <div className="p-4 rounded-lg bg-secondary/10 mb-4">
              <h4 className="font-bold text-gray-900 dark:text-gray-100 mb-1">
                {currentChallenge.title}
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                {currentChallenge.description}
              </p>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">
                  {currentChallenge.participants} participants
                </span>
                <span className="text-gray-500 dark:text-gray-400">
                  {currentChallenge.daysLeft} days left
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full" 
                  style={{ width: `${((7 - currentChallenge.daysLeft) / 7) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={challengeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="participants" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <Button className="w-full mt-4">
              Join This Challenge
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-8">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">
            Community Progress
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line 
                  yAxisId="left"
                  type="monotone" 
                  dataKey="animalsSaved" 
                  stroke="#8884d8" 
                  name="Animals Saved"
                />
                <Line 
                  yAxisId="right"
                  type="monotone" 
                  dataKey="co2Reduced" 
                  stroke="#82ca9d" 
                  name="CO₂ Reduced (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <div className="text-center">
        <Button size="lg" className="gap-2">
          <Users className="h-4 w-4" />
          Join Our Community
        </Button>
      </div>
    </div>
  );
};

export default CommunityImpact;
