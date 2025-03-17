
import { LeafyGreen, TreePine, Footprints, Heart, Utensils, Droplets, TrendingUp, ShieldPlus, Building } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const SDGSection = () => {
  return (
    <section className="py-16 bg-secondary/30 dark:bg-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Supporting UN Sustainable Development Goals
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Each vegan meal you choose directly contributes to global sustainability goals, creates a more compassionate world, and drives economic growth and prosperity.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <SDGCard 
              icon={<LeafyGreen className="w-6 h-6 text-primary" />}
              title="SDG 12: Responsible Consumption"
              description="Adopting a plant-based diet significantly reduces the resources needed to produce your food, promoting sustainable consumption patterns."
              index={1}
            />
            <SDGCard 
              icon={<TreePine className="w-6 h-6 text-primary" />}
              title="SDG 13: Climate Action"
              description="Animal agriculture produces more greenhouse gases than all transportation combined. Your vegan choices directly combat climate change."
              index={2}
            />
            <SDGCard 
              icon={<Droplets className="w-6 h-6 text-primary" />}
              title="SDG 6: Clean Water"
              description="A single vegan saves approximately 1,100 gallons of water daily compared to the standard Western diet."
              index={3}
            />
            <SDGCard 
              icon={<Footprints className="w-6 h-6 text-primary" />}
              title="SDG 15: Life On Land"
              description="By reducing demand for animal products, you help prevent deforestation and habitat destruction caused by animal agriculture."
              index={4}
            />
            <SDGCard 
              icon={<Heart className="w-6 h-6 text-primary" />}
              title="SDG 3: Good Health"
              description="Plant-based diets are associated with lower rates of heart disease, certain cancers, and type 2 diabetes."
              index={5}
            />
            <SDGCard 
              icon={<Utensils className="w-6 h-6 text-primary" />}
              title="SDG 2: Zero Hunger"
              description="Plant foods require significantly less land to produce the same amount of protein as animal products, helping address global food insecurity."
              index={6}
            />
            
            {/* New Economic Growth SDG Cards */}
            <SDGCard 
              icon={<TrendingUp className="w-6 h-6 text-primary" />}
              title="SDG 8: Economic Growth"
              description="Plant-based food production requires less land, water, and resources, making agriculture more efficient and boosting economic output."
              index={7}
            />
            <SDGCard 
              icon={<Building className="w-6 h-6 text-primary" />}
              title="SDG 10: Reduced Inequalities"
              description="Feeding crops directly to people instead of animals could free up grain to feed 4 billion more people, reducing global economic inequality."
              index={8}
            />
            <SDGCard 
              icon={<ShieldPlus className="w-6 h-6 text-primary" />}
              title="SDG 9: Industry & Innovation"
              description="The plant-based food market is driving innovation and creating sustainable jobs, with a projected value of $162 billion by 2030."
              index={9}
            />
          </div>
          
          {/* Economic Impact Callout */}
          <div className="mt-10 p-6 bg-primary/10 dark:bg-primary/5 rounded-xl border border-primary/20">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-gray-100">
              Economic Benefits of Plant-Based Choices
            </h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li className="flex items-start gap-2">
                <TrendingUp className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong>Sustainable Economic Growth:</strong> Redirecting agricultural subsidies from animal farming to plant-based industries could save governments billions while creating more sustainable jobs.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Building className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong>Climate Damage Prevention:</strong> Animal agriculture contributes significantly to climate change, which threatens to cost the global economy up to $23 trillion annually by 2050.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldPlus className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span>
                  <strong>Resource Efficiency:</strong> Plant-based foods require up to 93% less land and significantly less water, creating more economically efficient food systems.
                </span>
              </li>
            </ul>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Ready to maximize your positive impact on animals, the planet, and the global economy?
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/calculator">
                <Button className="bg-primary hover:bg-primary/90">Calculate Your Impact</Button>
              </Link>
              <Link to="/companion/create">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  Create Your Companion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SDGCard = ({ 
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
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300"
  >
    <div className="w-12 h-12 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center mb-4 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100 text-center">
      {title}
    </h3>
    <p className="text-gray-600 dark:text-gray-300 text-center">
      {description}
    </p>
  </motion.div>
);

export default SDGSection;
