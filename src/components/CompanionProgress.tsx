
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Award, Trophy, Calendar, CheckCircle2, Clock, Heart } from "lucide-react";

const CompanionProgress = () => {
  const [companionData, setCompanionData] = useState<any>(null);
  const [chartType, setChartType] = useState<"activities" | "milestones" | "timeline">("activities");

  useEffect(() => {
    const storedCompanion = localStorage.getItem("companion");
    if (storedCompanion) {
      setCompanionData(JSON.parse(storedCompanion));
    }
  }, []);

  if (!companionData) {
    return <div>Loading progress...</div>;
  }

  // Calculate days since adoption
  const adoptedDate = new Date(companionData.adoptedAt);
  const today = new Date();
  const daysSinceAdoption = Math.floor((today.getTime() - adoptedDate.getTime()) / (1000 * 60 * 60 * 24));

  // Calculate next level progress
  const levelProgress = (companionData.experience / companionData.nextLevelExp) * 100;

  // Process activities data for charts
  const getActivityData = () => {
    const activityCounts: Record<string, number> = {};
    
    companionData.actions.forEach((action: any) => {
      if (activityCounts[action.type]) {
        activityCounts[action.type]++;
      } else {
        activityCounts[action.type] = 1;
      }
    });
    
    return Object.entries(activityCounts).map(([type, count]) => ({
      name: type.charAt(0).toUpperCase() + type.slice(1),
      value: count,
    }));
  };

  // Process milestone data
  const getMilestoneData = () => {
    return companionData.milestones.map((milestone: any) => ({
      name: milestone.name,
      value: milestone.achieved ? 100 : 0,
      state: milestone.achieved ? "Completed" : "Incomplete",
    }));
  };

  // Colors for charts
  const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658'];

  // Get recent activities
  const getRecentActivities = () => {
    return companionData.actions.slice(0, 5).map((action: any) => ({
      ...action,
      date: new Date(action.timestamp).toLocaleDateString(),
      time: new Date(action.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }));
  };

  const recentActivities = getRecentActivities();
  const activityData = getActivityData();
  const milestoneData = getMilestoneData();

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
        {companionData.name}'s Progress
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-center">
              {daysSinceAdoption}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Days Together
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-center">
              {companionData.level}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Current Level
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <Trophy className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-center">
              {companionData.actions.length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Activities
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full bg-primary/10 mb-2">
              <CheckCircle2 className="h-5 w-5 text-primary" />
            </div>
            <div className="text-2xl font-bold text-center">
              {companionData.milestones.filter((m: any) => m.achieved).length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
              Milestones
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              <h4 className="font-medium">Level Progress</h4>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {companionData.experience} / {companionData.nextLevelExp} XP
            </div>
          </div>
          <Progress value={levelProgress} className="h-3" />
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">
            {Math.round(companionData.nextLevelExp - companionData.experience)} XP needed for level {companionData.level + 1}
          </div>
        </CardContent>
      </Card>
      
      <Tabs defaultValue="activities" onValueChange={(value) => setChartType(value as any)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="activities" className="flex items-center gap-1">
            <Heart className="h-4 w-4" />
            Activities
          </TabsTrigger>
          <TabsTrigger value="milestones" className="flex items-center gap-1">
            <Trophy className="h-4 w-4" />
            Milestones
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Timeline
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="activities" className="mt-4">
          {activityData.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={activityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" name="Count">
                    {activityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No activities recorded yet. Try interacting with your companion!
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="milestones" className="mt-4">
          <div className="grid gap-3">
            {companionData.milestones.map((milestone: any, index: number) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={milestone.achieved ? "border-green-300 bg-green-50 dark:bg-green-900/20" : ""}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className={`p-2 rounded-full ${milestone.achieved ? "bg-green-100 dark:bg-green-800/30" : "bg-gray-100 dark:bg-gray-800"}`}>
                      {milestone.achieved ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <Trophy className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{milestone.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {milestone.achieved
                          ? `Achieved on ${new Date(milestone.date).toLocaleDateString()}`
                          : milestone.requirementType === "days"
                          ? `Requires ${milestone.requirement} days with your companion`
                          : milestone.requirementType === "meals"
                          ? `Log ${milestone.requirement} vegan meals`
                          : `Share your progress ${milestone.requirement} times`}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="timeline" className="mt-4">
          {recentActivities.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-medium">Recent Activities</h4>
              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 pl-5 space-y-6 ml-2">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[21px] top-1"></div>
                    <div className="flex flex-col">
                      <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {activity.date} at {activity.time}
                      </div>
                      <div className="font-medium mt-1">{activity.description}</div>
                      <div className="text-sm text-primary mt-1">+{activity.expGained} XP</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No activities recorded yet. Try interacting with your companion!
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CompanionProgress;
