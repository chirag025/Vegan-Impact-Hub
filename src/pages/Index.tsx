
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SDGSection from "@/components/SDGSection";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Book, Utensils, TrendingUp, Building, Coins } from "lucide-react";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Hero />
      
      {/* Why Go Vegan Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100"
            >
              Why Choose Compassion?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              Every meal is a choice that affects countless lives. Here's why veganism is the most powerful way to create positive change.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ReasonCard 
              icon={<Users className="w-10 h-10 text-primary" />}
              title="For the Animals"
              description="Over 70 billion land animals and trillions of marine animals are killed annually for food. Each vegan saves nearly 200 animals per year from suffering."
              index={1}
            />
            <ReasonCard 
              icon={<Book className="w-10 h-10 text-primary" />}
              title="For Our Planet"
              description="Animal agriculture is responsible for up to 18% of greenhouse gas emissions, 80% of Amazon deforestation, and uses 1/3 of the Earth's fresh water."
              index={2}
            />
            <ReasonCard 
              icon={<Utensils className="w-10 h-10 text-primary" />}
              title="For Your Health"
              description="Well-planned vegan diets can reduce your risk of heart disease by 32%, type 2 diabetes by 23%, and certain cancers by up to 15%."
              index={3}
            />
          </div>
        </div>
      </section>
      
      {/* New Economic Impact Section */}
      <section className="py-20 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100"
            >
              Plant-Based Economy: A Path to Global Prosperity
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300"
            >
              The shift to plant-based food systems offers tremendous economic benefits, 
              from increased efficiency to reduced inequality and enhanced sustainability.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <ReasonCard 
              icon={<TrendingUp className="w-10 h-10 text-primary" />}
              title="Resource Efficiency"
              description="Plant-based food production requires 18x less land, 10x less water, and 9x less fuel than animal products, creating more economically efficient food systems."
              index={1}
            />
            <ReasonCard 
              icon={<Building className="w-10 h-10 text-primary" />}
              title="Food Security"
              description="Feeding crops directly to people instead of animals could free up enough grain to feed an additional 4 billion people, addressing global food scarcity and economic inequality."
              index={2}
            />
            <ReasonCard 
              icon={<Coins className="w-10 h-10 text-primary" />}
              title="Reduced Subsidies"
              description="Governments spend billions subsidizing livestock and dairy industries. Shifting towards plant-based policies can redirect funds toward sustainable economic initiatives."
              index={3}
            />
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="inline-block p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md mb-8 max-w-3xl">
              <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Economic Impact of Your Choices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                By 2030, the plant-based food market is projected to reach $162 billion, 
                creating new jobs and economic opportunities. Meanwhile, the economic damage 
                from climate change—significantly driven by animal agriculture—is estimated 
                to cost the global economy up to $23 trillion annually by 2050.
              </p>
            </div>
            <Link to="/calculator">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Calculate Your Economic Impact
                <ArrowRight className="ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
      
      <SDGSection />
      
      {/* Call to Action Section */}
      <section className="py-20 bg-primary/5 dark:bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100"
            >
              Ready to Make a Difference?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8"
            >
              Join thousands of others who are creating a kinder, more sustainable, and economically prosperous world through their daily choices. Every meal matters. Every person matters. You matter.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link to="/calculator">
                <Button size="lg" className="bg-primary hover:bg-primary/90 group">
                  Start Your Journey
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/companion/create">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Create Your Companion
                </Button>
              </Link>
              <Link to="/quiz">
                <Button size="lg" variant="secondary">
                  Take the Quiz
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ReasonCard = ({ 
  icon, 
  title, 
  description,
  index
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  index: number;
}) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="p-8 rounded-2xl bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-all duration-300 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-6 mx-auto">
      {icon}
    </div>
    <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </motion.div>
);

export default HomePage;
