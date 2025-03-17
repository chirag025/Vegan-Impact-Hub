import Navbar from "@/components/Navbar";
import Quiz from "@/components/Quiz";

const QuizPage = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <Quiz />
    </div>
  );
};

export default QuizPage;