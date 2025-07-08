
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Award, Users, Monitor, Star, TrendingUp, Zap, Sparkles, Globe, Target } from "lucide-react";
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
      {/* Modern Hero Section with Advanced Gradient */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(236,72,153,0.3),transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
            {/* Content */}
            <div className="flex-1 max-w-4xl">
              <div className="flex items-center mb-12">
                <div className="relative p-4 bg-white/10 backdrop-blur-xl rounded-3xl mr-8 border border-white/20">
                  <img 
                    src="/lovable-uploads/540172cc-3ce4-4979-bece-e843a24a3cac.png" 
                    alt="KnowledgeHub Logo" 
                    className="h-16 w-16" 
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
                </div>
                <div>
                  <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                      Knowledge
                    </span>
                    <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Hub
                    </span>
                  </h1>
                </div>
              </div>
              
              <div className="space-y-8 mb-16">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white/90 leading-tight">
                  Transform Your Future with 
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Next-Gen Learning</span>
                </h2>
                
                <p className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed">
                  Join the revolution in online education. Master cutting-edge skills, connect with global experts, and accelerate your career with our AI-powered learning platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 mb-16">
                <Button size="lg" asChild className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 text-lg px-12 py-6 rounded-2xl border-0">
                  <Link to="/courses" className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Start Learning Today</span>
                    <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="group border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-lg px-12 py-6 rounded-2xl hover:border-white/50 transition-all duration-300">
                  <Link to="/register" className="flex items-center gap-2">
                    <Globe className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                    <span>Join Free Today</span>
                  </Link>
                </Button>
              </div>
              
              {/* Enhanced Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">50K+</div>
                  <div className="text-white/70 font-medium">Active Learners</div>
                </div>
                <div className="text-center group">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">1000+</div>
                  <div className="text-white/70 font-medium">Expert Courses</div>
                </div>
                <div className="text-center group col-span-2 lg:col-span-1">
                  <div className="text-4xl font-black mb-2 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">98%</div>
                  <div className="text-white/70 font-medium">Career Growth</div>
                </div>
              </div>
            </div>
            
            {/* Modern Visual Element */}
            <div className="flex-1 lg:max-w-2xl mt-16 lg:mt-0">
              <div className="relative">
                <div className="w-96 h-96 mx-auto bg-gradient-to-br from-white/10 via-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-[3rem] shadow-2xl border border-white/20 flex items-center justify-center">
                  <div className="text-8xl animate-bounce">🚀</div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl shadow-2xl flex items-center justify-center animate-pulse">
                  <Star className="h-12 w-12 text-white" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl shadow-2xl flex items-center justify-center">
                  <TrendingUp className="h-10 w-10 text-white animate-bounce" />
                </div>
                <div className="absolute top-20 -left-12 w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-xl flex items-center justify-center animate-spin" style={{animationDuration: '10s'}}>
                  <Target className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Modern Wave Separator */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-20">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="white" opacity="0.1"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" fill="white" opacity="0.3"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Featured Courses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our most popular courses, handpicked by industry experts and loved by students worldwide.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCourses.map((course) => (
              <div key={course.id} className="group hover:scale-105 transition-all duration-500 hover:rotate-1">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild className="group border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 rounded-2xl px-12 py-6 text-lg">
              <Link to="/courses" className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                <span>Explore All Courses</span>
                <ArrowRight className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-blue-900 via-purple-900 to-pink-900 bg-clip-text text-transparent">
                Learning Paths
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Choose your adventure in learning with our comprehensive category system designed for every skill level.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} to={`/courses?category=${category.name}`} className="group">
                <Card className="h-full hover:shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:-rotate-1 border-0 bg-gradient-to-br from-white via-white to-blue-50/50 backdrop-blur-sm">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 border border-blue-100/50">
                      {category.name === "Web Development" ? (
                        <Monitor className="h-12 w-12 text-blue-600" />
                      ) : category.name === "Data Science" ? (
                        <BookOpen className="h-12 w-12 text-purple-600" />
                      ) : (
                        <Award className="h-12 w-12 text-pink-600" />
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-3 group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{category.count} courses available</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black mb-8">
              <span className="bg-gradient-to-r from-purple-900 via-blue-900 to-teal-900 bg-clip-text text-transparent">
                Why Choose KnowledgeHub?
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Experience the future of online learning with our cutting-edge platform designed for success in the digital age.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group text-center p-10 rounded-3xl hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                <BookOpen className="h-14 w-14 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-blue-600 transition-colors duration-300">
                Expert-Led Content
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Learn from industry leaders and top institutions with content that's always up-to-date, relevant, and cutting-edge.
              </p>
            </div>
            
            <div className="group text-center p-10 rounded-3xl hover:bg-gradient-to-br hover:from-green-50 hover:to-teal-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-28 h-28 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                <Award className="h-14 w-14 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-green-600 transition-colors duration-300">
                Industry Certificates
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Earn valuable certificates that are recognized by top employers and boost your career prospects significantly.
              </p>
            </div>
            
            <div className="group text-center p-10 rounded-3xl hover:bg-gradient-to-br hover:from-orange-50 hover:to-pink-50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="w-28 h-28 bg-gradient-to-br from-orange-500 to-pink-600 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl">
                <Users className="h-14 w-14 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-6 group-hover:text-orange-600 transition-colors duration-300">
                Global Network
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Connect with learners worldwide and build your professional network while you study and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent_70%)]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,72,153,0.3),transparent_70%)]"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Ready to Transform
              </span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Your Future?
              </span>
            </h2>
            <p className="text-2xl md:text-3xl mb-12 text-white/80 leading-relaxed max-w-4xl mx-auto">
              Join thousands of ambitious learners who are already advancing their careers and unlocking new opportunities every day.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center">
              <Button size="lg" asChild className="group bg-gradient-to-r from-white to-blue-50 text-slate-900 hover:from-blue-50 hover:to-white shadow-2xl hover:shadow-white/25 transition-all duration-300 text-xl px-16 py-8 rounded-2xl font-bold">
                <Link to="/register" className="flex items-center gap-4">
                  <Zap className="h-8 w-8 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span>Start Your Journey</span>
                  <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="group border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm text-xl px-16 py-8 rounded-2xl hover:border-white/60 transition-all duration-300">
                <Link to="/courses" className="flex items-center gap-3">
                  <BookOpen className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                  <span>Explore Courses</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
