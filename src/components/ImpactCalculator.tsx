
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent } from "./ui/card";
import { Slider } from "./ui/slider";
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
import { Leaf, Droplet, TreePine, CloudSun } from "lucide-react";

// Impact data per meal
const IMPACT_DATA = {
  // Water usage (gallons)
  water: {
    beef: 660,
    pork: 330,
    lamb: 520,
    chicken: 100,
    turkey: 130,
    fish: 220,
    eggs: 53,
    cheese: 50,
    milk: 30,
    yogurt: 35,
  },
  // CO2 emissions (kg)
  carbon: {
    beef: 27,
    pork: 12.1,
    lamb: 39.2,
    chicken: 6.9,
    turkey: 10.9,
    fish: 6.1,
    eggs: 4.8,
    cheese: 13.5,
    milk: 3.2,
    yogurt: 3.8,
  },
  // Land use (sq ft)
  land: {
    beef: 96.9,
    pork: 15.0,
    lamb: 85.1,
    chicken: 7.1,
    turkey: 12.5,
    fish: 3.7,
    eggs: 5.7,
    cheese: 13.8,
    milk: 8.9,
    yogurt: 9.2,
  },
  // Grain usage (lbs)
  grain: {
    beef: 13.0,
    pork: 5.9,
    lamb: 21.0,
    chicken: 2.7,
    turkey: 3.8,
    fish: 5.2,
    eggs: 3.0,
    cheese: 6.0,
    milk: 1.9,
    yogurt: 2.1,
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

// Conversion factors for saving calculations
const SAVINGS_CONVERSION = {
  water: {
    showers: 0.05, // 20 gallons per shower
    drinking: 0.5, // 2 gallons per day drinking water
  },
  carbon: {
    driving: 0.25, // 4kg CO2 per mile driven
    trees: 21, // 1 tree absorbs ~21kg CO2 per year
  },
  land: {
    parks: 0.00023, // 1 small park ~4300 sq ft
    fields: 0.000091, // 1 soccer field ~11,000 sq ft
  },
  grain: {
    meals: 0.33, // ~3 pounds of grain makes a meal
  },
};

type AnimalProduct = keyof typeof IMPACT_DATA.water;
type ImpactCategory = keyof typeof IMPACT_DATA;

type ConsumptionData = {
  [key in AnimalProduct]: number;
};

const ImpactCalculator = () => {
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
  const [activeCategory, setActiveCategory] = useState<ImpactCategory>("water");

  // Chart type toggling
  const [chartType, setChartType] = useState<"bar" | "pie">("bar");

  // Calculate impact for the selected category
  const calculateImpact = (category: ImpactCategory) => {
    const impactData = IMPACT_DATA[category];
    
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
    water: calculateImpact("water").reduce((acc, curr) => acc + curr.value, 0),
    carbon: calculateImpact("carbon").reduce((acc, curr) => acc + curr.value, 0),
    land: calculateImpact("land").reduce((acc, curr) => acc + curr.value, 0),
    grain: calculateImpact("grain").reduce((acc, curr) => acc + curr.value, 0),
  };

  // Calculate potential savings
  const calculateSavings = () => {
    const waterSaved = totals.water;
    const carbonSaved = totals.carbon;
    const landSaved = totals.land;
    const grainSaved = totals.grain;

    return {
      water: {
        showers: Math.round(waterSaved * SAVINGS_CONVERSION.water.showers),
        drinking: Math.round(waterSaved * SAVINGS_CONVERSION.water.drinking),
      },
      carbon: {
        driving: Math.round(carbonSaved * SAVINGS_CONVERSION.carbon.driving),
        trees: Math.round(carbonSaved / SAVINGS_CONVERSION.carbon.trees),
      },
      land: {
        parks: Math.round(landSaved * SAVINGS_CONVERSION.land.parks),
        fields: Math.round(landSaved * SAVINGS_CONVERSION.land.fields),
      },
      grain: {
        meals: Math.round(grainSaved * SAVINGS_CONVERSION.grain.meals),
      },
    };
  };

  const savings = calculateSavings();

  // Units for each impact category
  const units = {
    water: "gallons",
    carbon: "kg CO₂",
    land: "sq ft",
    grain: "lbs",
  };

  // Icons for each impact category
  const CategoryIcon = () => {
    switch (activeCategory) {
      case "water":
        return <Droplet className="h-5 w-5 text-blue-500" />;
      case "carbon":
        return <CloudSun className="h-5 w-5 text-gray-500" />;
      case "land":
        return <TreePine className="h-5 w-5 text-green-600" />;
      case "grain":
        return <Leaf className="h-5 w-5 text-amber-500" />;
      default:
        return <Droplet className="h-5 w-5 text-blue-500" />;
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
    <section className="py-16 bg-white dark:bg-gray-900" id="calculator">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-900 dark:text-gray-100">
            Calculate Your Environmental Impact
          </h2>
          <p className="text-center mb-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            See how your weekly food choices affect water usage, carbon emissions, land use, and grain consumption.
            Adjust the sliders to match your typical consumption.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Weekly Consumption
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
                        {product} meals per week
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
              <Tabs
                defaultValue="water"
                onValueChange={(value) => setActiveCategory(value as ImpactCategory)}
              >
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="water" className="flex items-center gap-1">
                      <Droplet className="h-4 w-4" />
                      <span className="hidden sm:inline">Water</span>
                    </TabsTrigger>
                    <TabsTrigger value="carbon" className="flex items-center gap-1">
                      <CloudSun className="h-4 w-4" />
                      <span className="hidden sm:inline">Carbon</span>
                    </TabsTrigger>
                    <TabsTrigger value="land" className="flex items-center gap-1">
                      <TreePine className="h-4 w-4" />
                      <span className="hidden sm:inline">Land</span>
                    </TabsTrigger>
                    <TabsTrigger value="grain" className="flex items-center gap-1">
                      <Leaf className="h-4 w-4" />
                      <span className="hidden sm:inline">Grain</span>
                    </TabsTrigger>
                  </TabsList>
                  
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

                {/* Impact data content for each tab */}
                {(["water", "carbon", "land", "grain"] as const).map((category) => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <CategoryIcon />
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                          {category.charAt(0).toUpperCase() + category.slice(1)} Impact
                        </h3>
                      </div>
                      <p className="text-4xl font-bold text-primary mb-2">
                        {formatNumber(totals[category])} {units[category]}
                      </p>
                    </div>

                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        {chartType === "bar" ? (
                          <BarChart data={calculateImpact(category)}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip 
                              formatter={(value) => [`${value} ${units[category]}`, `Impact`]}
                              labelFormatter={(name) => `${name}`}
                            />
                            <Bar dataKey="value" name={`${category.charAt(0).toUpperCase() + category.slice(1)} Impact`}>
                              {calculateImpact(category).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as AnimalProduct]} />
                              ))}
                            </Bar>
                          </BarChart>
                        ) : (
                          <PieChart>
                            <Pie
                              data={calculateImpact(category)}
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
                              {calculateImpact(category).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[entry.name.toLowerCase() as AnimalProduct]} />
                              ))}
                            </Pie>
                            <Tooltip 
                              formatter={(value) => [`${value} ${units[category]}`, `Impact`]}
                              labelFormatter={(name) => `${name}`}
                            />
                            <Legend />
                          </PieChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Environmental Savings
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  If you replaced these animal products with plant-based alternatives, you would save:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Droplet className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{formatNumber(totals.water)}</strong> gallons of water
                      <span className="block text-gray-500 dark:text-gray-400">
                        Equivalent to {savings.water.showers} showers or {savings.water.drinking} days of drinking water
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CloudSun className="h-4 w-4 text-gray-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{formatNumber(totals.carbon)}</strong> kg of CO₂ emissions
                      <span className="block text-gray-500 dark:text-gray-400">
                        Equivalent to driving {savings.carbon.driving} miles or what {savings.carbon.trees} trees absorb in a year
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <TreePine className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>
                      <strong>{formatNumber(totals.land)}</strong> sq ft of land
                      <span className="block text-gray-500 dark:text-gray-400">
                        Equivalent to {savings.land.parks} small parks or {savings.land.fields} soccer fields
                      </span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Leaf className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                    <span>
                      <strong>{formatNumber(totals.grain)}</strong> lbs of grain
                      <span className="block text-gray-500 dark:text-gray-400">
                        Enough to make {savings.grain.meals} meals for people
                      </span>
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <Leaf className="h-5 w-5 text-primary" />
                  Did You Know?
                </h3>
                <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                  <li>One beef meal uses as much water as 60 showers</li>
                  <li>
                    Switching one beef meal to a plant-based option saves enough water
                    to supply a household for a week
                  </li>
                  <li>
                    The water saved from reducing meat consumption can help combat
                    global water scarcity
                  </li>
                  <li>
                    Animal agriculture is responsible for more greenhouse gas emissions than all transportation combined
                  </li>
                  <li>
                    It takes 6 pounds of grain to produce 1 pound of beef
                  </li>
                  <li>
                    A plant-based diet requires 1/3 the land needed to support a meat-based diet
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button variant="default" className="bg-primary">
              <Leaf className="h-4 w-4 mr-2" />
              Explore Vegan Recipes
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactCalculator;
