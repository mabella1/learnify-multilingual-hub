
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-md">
        <div className="text-primary text-8xl font-bold mb-6">404</div>
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <div className="space-x-4">
          <Button asChild size="lg">
            <a href="/">Back to Home</a>
          </Button>
          <Button variant="outline" asChild size="lg">
            <a href="/courses">Browse Courses</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
