
import { BarChart, BookOpen, Clock, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseCard from "@/components/courses/CourseCard";
import { useAuth } from "@/context/AuthContext";
import { enrolledCourses } from "@/data/mockData";

const UserDashboardPage = () => {
  const { currentUser } = useAuth();

  // Sort courses by last accessed
  const recentCourses = [...enrolledCourses]
    .sort((a, b) => b.lastAccessed.getTime() - a.lastAccessed.getTime())
    .slice(0, 2);

  // Calculate overall progress
  const overallProgress = Math.round(
    enrolledCourses.reduce((sum, course) => sum + course.progress, 0) / enrolledCourses.length
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {currentUser?.name}!</h1>
          <p className="text-muted-foreground">Here's an overview of your learning progress</p>
        </div>
        
        <Button>Browse More Courses</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground pt-1">
              {enrolledCourses.length > 0 ? 'Continue learning' : 'Browse courses'}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Learned</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24.5</div>
            <p className="text-xs text-muted-foreground pt-1">
              +2.5 hours this week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress}%</div>
            <Progress value={overallProgress} className="h-2 mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Certificates</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground pt-1">
              2 in progress
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity and Courses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="in-progress" className="bg-white rounded-lg shadow">
            <div className="px-6 pt-6">
              <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="in-progress" className="p-6 pt-4">
              <div className="space-y-6">
                {enrolledCourses.filter(course => course.progress < 100).map(course => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex items-start gap-4">
                      <img 
                        src={course.coverImage} 
                        alt={course.title} 
                        className="w-24 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{course.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{course.instructor}</p>
                        <div className="flex justify-between items-center">
                          <div className="text-sm">{course.progress}% complete</div>
                          <Button size="sm" variant="outline">Continue</Button>
                        </div>
                        <Progress value={course.progress} className="h-2 mt-2" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="p-6 pt-4">
              <div className="text-center py-6">
                <p className="text-muted-foreground">You haven't completed any courses yet.</p>
                <Button variant="link">View all courses</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-1">Live Webinar: Advanced React Patterns</div>
                  <div className="text-xs text-muted-foreground mb-2">Tomorrow at 3:00 PM</div>
                  <Button size="sm" variant="outline" className="w-full">Add to Calendar</Button>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="text-sm font-medium mb-1">Assignment Due: JavaScript Basics</div>
                  <div className="text-xs text-muted-foreground mb-2">Friday at 11:59 PM</div>
                  <Button size="sm" variant="outline" className="w-full">View Assignment</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Continue Learning */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recentCourses.map(course => (
            <CourseCard key={course.id} course={course} showProgress={true} />
          ))}
        </div>
      </div>
      
      {/* Recommended Courses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Recommended For You</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Mock recommended courses based on enrolled courses */}
          <CourseCard 
            course={{
              id: "7",
              title: "Advanced JavaScript: Modern Techniques",
              instructor: "Jane Smith",
              coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
              rating: 4.7,
              students: 45000,
              price: 79.99,
              category: "Web Development",
              level: "Advanced",
              language: "English"
            }} 
          />
          <CourseCard 
            course={{
              id: "8",
              title: "React & Redux: Building Complex Applications",
              instructor: "Stephen Grider",
              coverImage: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
              rating: 4.9,
              students: 65000,
              price: 94.99,
              category: "Web Development",
              level: "Intermediate",
              language: "English"
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
