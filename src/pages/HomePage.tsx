
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, Users, Monitor, Star, TrendingUp, Zap } from "lucide-react";
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
      {/* Modern Hero Section with Gradient Background */}
      <section className="relative min-h-screen bg-gradient-to-br from-primary via-purple-600 to-blue-700 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
            {/* Content */}
            <div className="flex-1 max-w-3xl hero-animation">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-white/10 backdrop-blur-sm rounded-2xl mr-6">
                  <img 
                    src="/lovable-uploads/540172cc-3ce4-4979-bece-e843a24a3cac.png" 
                    alt="KnowledgeHub Logo" 
                    className="h-12 w-12" 
                  />
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  KnowledgeHub
                </h1>
              </div>
              
              <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 font-light leading-relaxed">
                Transform your future with world-class online learning
              </p>
              
              <p className="text-lg mb-12 text-white/70 max-w-2xl leading-relaxed">
                Join thousands of learners worldwide in mastering new skills, advancing careers, and unlocking potential through our comprehensive course platform.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-4 rounded-full">
                  <Link to="/courses" className="flex items-center gap-2">
                    <span>Start Learning Now</span>
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-8 py-4 rounded-full">
                  <Link to="/register">Join Free Today</Link>
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-white/70">Active Students</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">1000+</div>
                  <div className="text-white/70">Expert Courses</div>
                </div>
                <div className="text-center col-span-2 lg:col-span-1">
                  <div className="text-3xl font-bold mb-1">98%</div>
                  <div className="text-white/70">Success Rate</div>
                </div>
              </div>
            </div>
            
            {/* Visual Element */}
            <div className="flex-1 lg:max-w-lg mt-12 lg:mt-0">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl flex items-center justify-center">
                  <div className="text-6xl">🎓</div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl flex items-center justify-center animate-pulse">
                  <Star className="h-8 w-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl shadow-xl flex items-center justify-center animate-bounce">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-16">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our most popular courses, handpicked by industry experts and loved by students worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <div key={course.id} className="group hover:scale-105 transition-transform duration-300">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild className="border-2 hover:bg-primary hover:text-white transition-all duration-300 rounded-full px-8">
              <Link to="/courses" className="flex items-center gap-2">
                <span>View All Courses</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Learning Categories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore diverse learning paths designed to fit your goals and interests.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/courses?category=${category.name}`} className="group">
                <Card className="h-full hover:shadow-2xl transition-all duration-300 group-hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-purple-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {category.name === "Web Development" ? (
                        <Monitor className="h-10 w-10 text-primary" />
                      ) : category.name === "Data Science" ? (
                        <BookOpen className="h-10 w-10 text-primary" />
                      ) : (
                        <Award className="h-10 w-10 text-primary" />
                      )}
                    </div>
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} courses</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Why Choose KnowledgeHub?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of online learning with our cutting-edge platform designed for success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                Expert Content
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Learn from industry leaders and top institutions with content that's always up-to-date and relevant.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                Recognized Certificates
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Earn valuable certificates that are recognized by employers and boost your career prospects.
              </p>
            </div>
            
            <div className="group text-center p-8 rounded-3xl hover:bg-white hover:shadow-2xl transition-all duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                Global Community
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Connect with learners worldwide and build your professional network while you study.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-purple-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Future?
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Join thousands of students who are already advancing their careers and unlocking new opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button size="lg" asChild className="bg-white text-primary hover:bg-white/90 shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-12 py-4 rounded-full">
                <Link to="/register" className="flex items-center gap-2">
                  <span>Start Free Today</span>
                  <Zap className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-12 py-4 rounded-full">
                <Link to="/courses">Browse Courses</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
