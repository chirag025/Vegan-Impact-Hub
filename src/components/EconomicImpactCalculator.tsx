
import { useState } from "react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Card, CardContent } from "./ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Coins, TrendingUp, Building, Leaf } from "lucide-react";
import { Badge } from "./ui/badge";

// Economic impact data per meal
const ECONOMIC_IMPACT = {
  // Cost savings (USD)
  savings: {
    beef: 5.2,
    pork: 3.8,
    lamb: 7.1,
    chicken: 2.5,
    turkey: 3.2,
    fish: 4.8,
    eggs: 1.2,
    cheese: 2.5,
    milk: 0.8,
    yogurt: 1.1,
  },
  // Jobs created (x0.001)
  jobs: {
    beef: 2.1,
    pork: 1.8,
    lamb: 2.6,
    chicken: 1.2,
    turkey: 1.5,
    fish: 1.9,
    eggs: 0.9,
    cheese: 1.3,
    milk: 0.7,
    yogurt: 0.8,
  },
  // Market growth contribution (USD)
  market: {
    beef: 8.5,
    pork: 5.7,
    lamb: 9.2,
    chicken: 3.8,
    turkey: 4.6,
    fish: 6.3,
    eggs: 2.1,
    cheese: 3.5,
    milk: 1.5,
    yogurt: 1.9,
  },
  // Healthcare savings (USD)
  healthcare: {
    beef: 6.8,
    pork: 4.9,
    lamb: 7.2,
    chicken: 3.1,
    turkey: 3.7,
    fish: 4.2,
    eggs: 1.8,
    cheese: 3.2,
    milk: 1.2,
    yogurt: 1.5,
  },
};

// Color scheme for charts
const COLORS = {
  beef: "#E63946",
  pork: "#F3A0A0",
  lamb: "#C1121F",
  chicken: "#FFB703",
  turkey: "#FB8500",
  fish: "#219EBC",
  eggs: "#FFEF8D",
  cheese: "#FBC687",
  milk: "#F1FAEE",
  yogurt: "#F2E8CF",
};

type AnimalProduct = keyof typeof ECONOMIC_IMPACT.savings;
type EconomicCategory = keyof typeof ECONOMIC_IMPACT;

type ConsumptionData = {
  [key in AnimalProduct]: number;
};

const EconomicImpactCalculator = () => {
  const [consumption, setConsumption] = useState<ConsumptionData>({
    beef: 0,
    pork: 0,
    lamb: 0,
    chicken: 0,
    turkey: 0,
    fish: 0,
    eggs: 0,
    cheese: 0,
    milk: 0,
    yogurt: 0,
  });

  // Tab state for different impact categories
  const [activeCategory, setActiveCategory] = useState<EconomicCategory>("savings");

  // Chart type toggling
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  // Calculate impact for the selected category
  const calculateImpact = (category: EconomicCategory) => {
    const impactData = ECONOMIC_IMPACT[category];
    
    const results = Object.entries(consumption)
      .map(([product, amount]) => ({
        name: product.charAt(0).toUpperCase() + product.slice(1),
        value: amount * impactData[product as AnimalProduct],
        amount: amount,
      }))
      .filter((item) => item.amount > 0);
    
    return results.length > 0 ? results : [];
  };

  // Calculate totals for each impact category
  const totals = {
    savings: calculateImpact("savings").reduce((acc, curr) => acc + curr.value, 0),
    jobs: calculateImpact("jobs").reduce((acc, curr) => acc + curr.value, 0),
    market: calculateImpact("market").reduce((acc, curr) => acc + curr.value, 0),
    healthcare: calculateImpact("healthcare").reduce((acc, curr) => acc + curr.value, 0),
  };

  // Calculate total economic points
  const totalEconomicPoints = Math.round(
    totals.savings * 2 +
    totals.jobs * 500 +
    totals.market * 1.5 +
    totals.healthcare * 1.8
  );

  // Units for each impact category
  const units = {
    savings: "USD",
    jobs: "jobs (x0.001)",
    market: "USD",
    healthcare: "USD",
  };

  // Icons for each impact category
  const CategoryIcon = () => {
    switch (activeCategory) {
      case "savings":
        return <Coins className="h-5 w-5 text-amber-500" />;
      case "jobs":
        return <Building className="h-5 w-5 text-blue-500" />;
      case "market":
        return <TrendingUp className="h-5 w-5 text-green-600" />;
      case "healthcare":
        return <Leaf className="h-5 w-5 text-purple-500" />;
      default:
        return <Coins className="h-5 w-5 text-amber-500" />;
    }
  };

  // Format numbers for display
  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + "k" : num.toLocaleString();
  };

  // Handle slider change
  const handleSliderChange = (product: AnimalProduct, value: number[]) => {
    setConsumption({
      ...consumption,
      [product]: value[0],
    });
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="economic-calculator">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900 dark:text-gray-100">
            Calculate Your Economic Impact
          </h2>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how your weekly plant-based food choices contribute to economic growth, job creation, 
            and healthcare savings.
          </p>

          <div className="flex items-center justify-center mb-8">
            <div className="bg-primary/10 rounded-full px-6 py-3 flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="text-xl font-bold text-primary">
                {formatNumber(totalEconomicPoints)} Economic Impact Points
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Weekly Plant-Based Substitutions
              </h3>
              
              {/* Product sliders */}
              <div className="space-y-5">
                {Object.keys(consumption).map((product) => (
                  <div key={product} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label
                        htmlFor={product}
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize"
                      >
                        Plant-based alternatives to {product} (meals per week)
                      </label>
                      <span className="text-sm font-medium text-primary">
                        {consumption[product as AnimalProduct]}
                      </span>
                    </div>
                    <Slider
                      id={product}
                      min={0}
                      max={10}
                      step={1}
                      value={[consumption[product as AnimalProduct]]}
                      onValueChange={(value) => handleSliderChange(product as AnimalProduct, value)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-secondary/10 dark:bg-secondary/5 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={activeCategory === "savings" ? "default" : "outline"}
                    onClick={() => setActiveCategory("savings")}
                    className="flex items-center gap-1"
                  >
                    <Coins className="h-4 w-4" />
                    <span className="hidden sm:inline">Savings</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={activeCategory === "jobs" ? "default" : "outline"}
                    onClick={() => setActiveCategory("jobs")}
                    className="flex items-center gap-1"
                  >
                    <Building className="h-4 w-4" />
                    <span className="hidden sm:inline">Jobs</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={activeCategory === "market" ? "default" : "outline"}
                    onClick={() => setActiveCategory("market")}
                    className="flex items-center gap-1"
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span className="hidden sm:inline">Market</span>
                  </Button>
                  <Button
                    size="sm"
                    variant={activeCategory === "healthcare" ? "default" : "outline"}
                    onClick={() => setActiveCategory("healthcare")}
                    className="flex items-center gap-1"
                  >
                    <Leaf className="h-4 w-4" />
                    <span className="hidden sm:inline">Healthcare</span>
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={chartType === "bar" ? "default" : "outline"}
                    onClick={() => setChartType("bar")}
                    className="h-8 px-2 text-xs"
                  >
                    Bar
                  </Button>
                  <Button
                    size="sm"
                    variant={chartType === "pie" ? "default" : "outline"}
                    onClick={() => setChartType("pie")}
                    className="h-8 px-2 text-xs"
                  >
                    Pie
                  </Button>
                </div>
              </div>

              {/* Impact data content */}
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <CategoryIcon />
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Impact
                    </h3>
                  </div>
                  <p className="text-4xl font-bold text-primary mb-2">
                    {activeCategory === "jobs" 
                      ? (totals[activeCategory] * 1000).toFixed(0) 
                      : formatNumber(totals[activeCategory])} {units[activeCategory]}
                  </p>
                </div>

                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    {chartType === "bar" ? (
                      <BarChart data={calculateImpact(activeCategory)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => [
                            activeCategory === "jobs" 
                              ? (Number(value) * 1000).toFixed(0) 
                              : value, 
                            `Impact`
                          ]}
                          labelFormatter={(name) => `${name}`}
                        />
                        <Bar dataKey="value" name={`${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Impact`}>
                          {calculateImpact(activeCategory).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as AnimalProduct]} />
                          ))}
                        </Bar>
                      </BarChart>
                    ) : (
                      <PieChart>
                        <Pie
                          data={calculateImpact(activeCategory)}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                          label={({ name, percent }) => 
                            percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                          }
                        >
                          {calculateImpact(activeCategory).map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as AnimalProduct]} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [
                            activeCategory === "jobs" 
                              ? (Number(value) * 1000).toFixed(0) 
                              : value, 
                            `Impact`
                          ]}
                          labelFormatter={(name) => `${name}`}
                        />
                        <Legend />
                      </PieChart>
                    )}
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Coins className="h-5 w-5 text-primary" />
                Economic Benefits Explained
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Coins className="h-4 w-4 text-amber-500 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Cost Savings</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Plant-based diets typically cost less than meat-heavy diets, saving households money while reducing environmental impact.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="h-4 w-4 text-blue-500 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Job Creation</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The plant-based food sector is growing rapidly, creating new jobs in food production, processing, and innovation.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Market Growth</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        The global plant-based food market is expected to reach $162 billion by 2030, driving economic growth and innovation.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Leaf className="h-4 w-4 text-purple-500 mt-1 shrink-0" />
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">Healthcare Savings</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Plant-based diets can reduce the risk of chronic diseases, potentially saving billions in healthcare costs globally.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default EconomicImpactCalculator;
