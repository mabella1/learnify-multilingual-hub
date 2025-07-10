
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, Users, Monitor, Star, Play, Clock, BarChart3 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses, categories } from "@/data/mockData";

const HomePage = () => {
  const { t } = useLanguage();
  const featuredCourses = mockCourses.slice(0, 4);

  return (
    <div className="flex flex-col">
      {/* Hero Section - Udemy Style */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                Learn without limits
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Start, switch, or advance your career with more than 5,000 courses, Professional Certificates, and degrees from world-class universities and companies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 text-lg font-medium">
                  <Link to="/courses">
                    Get started
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg font-medium">
                  <Link to="/register">
                    Try for free
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Hero Image */}
            <div className="relative">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="aspect-video bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  <Play className="h-16 w-16 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Learn React from Scratch</h3>
                <p className="text-gray-600 text-sm mb-3">Master modern React development</p>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="font-medium">4.7</span>
                    <span className="text-gray-500">(12,345)</span>
                  </div>
                  <span className="font-bold text-purple-600">$84.99</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted by companies */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-600 mb-8 font-medium">Trusted by over 15,000 companies and millions of learners around the world</p>
          <div className="flex justify-center items-center gap-12 opacity-60">
            <div className="text-2xl font-bold text-gray-400">Netflix</div>
            <div className="text-2xl font-bold text-gray-400">Volkswagen</div>
            <div className="text-2xl font-bold text-gray-400">Box</div>
            <div className="text-2xl font-bold text-gray-400">Netapp</div>
            <div className="text-2xl font-bold text-gray-400">Eventbrite</div>
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              A broad selection of courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl">
              Choose from over 210,000 online video courses with new additions published every month
            </p>
          </div>
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8 border-b">
            <button className="px-4 py-2 text-purple-600 border-b-2 border-purple-600 font-medium">
              Web Development
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Data Science
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Business
            </button>
            <button className="px-4 py-2 text-gray-600 hover:text-gray-900">
              Design
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          
          <Button variant="outline" asChild className="border-gray-900 text-gray-900 hover:bg-gray-50 font-medium">
            <Link to="/courses">
              Explore Web Development
            </Link>
          </Button>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top categories
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <Link key={category.id} to={`/courses?category=${category.name}`} className="group">
                <Card className="h-full hover:shadow-md transition-shadow border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                      {category.name === "Web Development" ? (
                        <Monitor className="h-8 w-8 text-purple-600" />
                      ) : category.name === "Data Science" ? (
                        <BarChart3 className="h-8 w-8 text-purple-600" />
                      ) : (
                        <BookOpen className="h-8 w-8 text-purple-600" />
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">{category.count}+ courses</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              See how we compare
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from real-world experts, practice with hands-on exercises, and get job-ready skills
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Learn the latest skills
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Keep up with the pace of change with thousands of expert-led, in-demand courses.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Learn at your own pace
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Enjoy lifetime access to courses on Udemy's website and mobile app.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Learn from industry experts
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Select from our top instructors and learn from the best in the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Transform your life through learning
            </h2>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed">
              Learners around the world are launching new careers, advancing in their fields, and enriching their lives.
            </p>
            <Button size="lg" asChild className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg">
              <Link to="/register">
                Get started today
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
