import ThemeToggle from "@/components/ui/ThemeToggle";
import { useNavigate } from "react-router-dom";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Top Right Theme Toggle */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <div className="text-center space-y-6">
        {/* Big 404 */}
        <h1 className="text-7xl md:text-8xl font-bold tracking-tight">404</h1>

        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold">
            Page not found 😕
          </h2>

          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            The page you are looking for does not exist or was moved.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-md border 
                       bg-white text-black 
                       dark:bg-gray-800 dark:text-white dark:border-gray-600
                       hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
          >
            Go back
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-md 
                       bg-black text-white 
                       dark:bg-white dark:text-black
                       hover:opacity-90 transition cursor-pointer"
          >
            Go home
          </button>
        </div>

        {/* Decorative Element */}
        <div className="pt-6">
          <div className="mx-auto h-1 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
