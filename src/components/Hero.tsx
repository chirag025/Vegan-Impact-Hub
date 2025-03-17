
import { Button } from "./ui/button";
import { Sprout, Heart, LineChart, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center bg-gradient-to-b from-secondary/30 to-white dark:from-secondary/5 dark:to-gray-900 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="m-8 animate-fade-in-up"
          >
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
              Together For Animal Liberation
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Your Choices Create a{" "}
              <span className="text-primary">Kinder World</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8">
              Every vegan meal spares animals from suffering, reduces environmental damage, 
              and contributes to a more compassionate world. Your decision matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/calculator">
                <Button size="lg" className="bg-primary hover:bg-primary/90 group transition-all">
                  Calculate Your Impact
                  <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/quiz">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/10"
                >
                  Take Our Quiz
                </Button>
              </Link>
              <Link to="/recipes">
                <Button
                  size="lg"
                  variant="secondary"
                  className="bg-accent hover:bg-accent/80"
                >
                  Explore Recipes
                </Button>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 animate-fade-in">
            <FeatureCard
              icon={<Sprout className="w-8 h-8 text-primary" />}
              title="End Animal Suffering"
              description="Each day, a vegan saves nearly 30 animals from cruel factory farming conditions and slaughter."
            />
            <FeatureCard
              icon={<Heart className="w-8 h-8 text-primary" />}
              title="Heal Our Planet"
              description="Animal agriculture creates more greenhouse gases than all transportation combined. Your choice matters."
            />
            <FeatureCard
              icon={<LineChart className="w-8 h-8 text-primary" />}
              title="Join The Movement"
              description="Be part of a growing community of compassionate individuals creating real change for animals."
            />
          </div>

          <div className="mt-20 p-8 bg-primary/5 rounded-2xl">
            <h2 className="text-2xl font-bold mb-4">Did You Know?</h2>
            <p className="text-lg mb-6">
              A single person going vegan saves approximately 
              <span className="font-bold text-primary"> 1,100 gallons of water</span>, 
              <span className="font-bold text-primary"> 45 pounds of grain</span>, 
              <span className="font-bold text-primary"> 30 square feet of forest</span>, 
              and <span className="font-bold text-primary">20 lbs CO₂</span> equivalent 
              <span className="italic"> every day</span>.
            </p>
            <Link to="/calculator">
              <Button className="bg-primary hover:bg-primary/90">
                See Your Personal Impact
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/5" />
      </div>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <motion.div 
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default Hero;
