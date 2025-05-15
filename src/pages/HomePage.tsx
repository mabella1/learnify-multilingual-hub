
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, Users, Monitor } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses, categories } from "@/data/mockData";

const HomePage = () => {
  const { t } = useLanguage();
  const featuredCourses = mockCourses.slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl hero-animation">
            <div className="flex items-center mb-6">
              <img 
                src="/lovable-uploads/06319f5f-4518-41dc-b801-8e4b4f24ab10.png" 
                alt="KnowledgeHub Logo" 
                className="h-16 w-16 mr-4" 
              />
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
                KnowledgeHub
              </h1>
            </div>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              {t("home.hero.subtitle")}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
                <Link to="/courses">{t("home.hero.cta")}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/register">Join For Free</Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}></div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">{t("home.featured")}</h2>
            <Button variant="ghost" asChild className="flex items-center gap-1">
              <Link to="/courses">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-10">{t("home.categories")}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/courses?category=${category.name}`}>
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {/* Dynamic icon based on category */}
                      {category.name === "Web Development" ? (
                        <Monitor className="h-8 w-8 text-primary" />
                      ) : category.name === "Data Science" ? (
                        <BookOpen className="h-8 w-8 text-primary" />
                      ) : (
                        <Award className="h-8 w-8 text-primary" />
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} courses</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose KnowledgeHub?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The ultimate learning platform designed to help you master new skills, advance your career, and explore your creativity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality Content</h3>
              <p className="text-muted-foreground">
                Access high-quality courses developed by industry experts and top institutions.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Certifications</h3>
              <p className="text-muted-foreground">
                Earn recognized certificates to showcase your new skills and knowledge.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-muted-foreground">
                Join a global community of learners and educators to enhance your learning experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("home.join")}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start learning today and join thousands of students already expanding their knowledge.
          </p>
          <Button size="lg" asChild className="bg-white text-primary hover:bg-gray-100">
            <Link to="/register">Create Free Account</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
