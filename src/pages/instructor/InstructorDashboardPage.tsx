
import { BarChart, LineChart, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { instructorCourses } from "@/data/mockData";

const InstructorDashboardPage = () => {
  const { currentUser } = useAuth();
  
  // Calculate statistics
  const totalStudents = instructorCourses.reduce((sum, course) => sum + course.students, 0);
  const totalRevenue = instructorCourses.reduce((sum, course) => sum + course.revenue, 0);
  const publishedCourses = instructorCourses.filter(course => course.status === "published").length;
  const draftCourses = instructorCourses.filter(course => course.status === "draft").length;
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Instructor Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {currentUser?.name}! Here's an overview of your courses and earnings.</p>
        </div>
        
        <Button asChild>
          <a href="/instructor/courses/create">Create New Course</a>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStudents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground pt-1">
              +{Math.round(totalStudents * 0.05).toLocaleString()} from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
            <p className="text-xs text-muted-foreground pt-1">
              +${Math.round(totalRevenue * 0.03).toLocaleString()} from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Published Courses</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publishedCourses}</div>
            <p className="text-xs text-muted-foreground pt-1">
              {draftCourses} draft{draftCourses !== 1 ? 's' : ''}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8</div>
            <p className="text-xs text-muted-foreground pt-1">
              Based on 1,240 reviews
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-6">
        <div className="lg:col-span-4">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Revenue chart visualization would appear here.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Showing data for the last 12 months
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Revenue by Course</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Revenue distribution chart would appear here.
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Breakdown by course
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* Courses */}
      <div>
        <Tabs defaultValue="published" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="published">Published Courses</TabsTrigger>
              <TabsTrigger value="draft">Draft Courses</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" asChild>
              <a href="/instructor/courses">View All Courses</a>
            </Button>
          </div>
          
          <TabsContent value="published">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Course</th>
                    <th className="py-3 px-4 text-left font-medium">Students</th>
                    <th className="py-3 px-4 text-left font-medium">Rating</th>
                    <th className="py-3 px-4 text-left font-medium">Revenue</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorCourses
                    .filter(course => course.status === "published")
                    .map(course => (
                    <tr key={course.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.coverImage} 
                            alt={course.title} 
                            className="w-10 h-10 rounded object-cover" 
                          />
                          <div>
                            <div className="font-medium">{course.title}</div>
                            <div className="text-xs text-muted-foreground">{course.category}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{course.students.toLocaleString()}</td>
                      <td className="py-3 px-4">{course.rating.toFixed(1)}</td>
                      <td className="py-3 px-4">${course.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/instructor/courses/edit/${course.id}`}>Edit</a>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="draft">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Course</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Last Update</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {instructorCourses
                    .filter(course => course.status === "draft")
                    .map(course => (
                    <tr key={course.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.coverImage} 
                            alt={course.title} 
                            className="w-10 h-10 rounded object-cover" 
                          />
                          <div className="font-medium">{course.title}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{course.category}</td>
                      <td className="py-3 px-4">May 15, 2025</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" asChild className="mr-2">
                          <a href={`/instructor/courses/edit/${course.id}`}>Continue Editing</a>
                        </Button>
                        <Button variant="outline" size="sm">Publish</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Latest Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Latest Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-4 pb-6 border-b last:border-b-0 last:pb-0">
                <img 
                  src={`https://i.pravatar.cc/150?img=${10 + i}`} 
                  alt="User avatar" 
                  className="w-10 h-10 rounded-full object-cover" 
                />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Student {i}</h4>
                    <div className="flex">
                      {Array(5).fill(0).map((_, j) => (
                        <svg
                          key={j}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={j < 5 - i % 2 ? "currentColor" : "none"}
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          className="h-4 w-4 text-yellow-500"
                        >
                          <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-sm">{instructorCourses[i % 2].title}</p>
                  <p className="text-sm text-muted-foreground">
                    This course was very informative and well-structured. I learned a lot and would recommend it to others interested in this topic.
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-muted-foreground">May {10 + i}, 2025</span>
                    <Button variant="ghost" size="sm">Reply</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorDashboardPage;
