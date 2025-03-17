import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Index";
import CalculatorPage from "./pages/CalculatorPage";
import QuizPage from "./pages/QuizPage";
import RecipesPage from "./pages/RecipesPage";
import RestaurantsPage from "./pages/RestaurantsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
          <Route path="/restaurants" element={<RestaurantsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;