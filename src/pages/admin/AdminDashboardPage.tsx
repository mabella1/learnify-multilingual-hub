
import { BarChart, Users, BookOpen, DollarSign } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { mockCourses } from "@/data/mockData";

const AdminDashboardPage = () => {
  const { currentUser } = useAuth();
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {currentUser?.name}! Here's an overview of your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,249</div>
            <p className="text-xs text-muted-foreground pt-1">
              +357 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground pt-1">
              +42 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,293,842</div>
            <p className="text-xs text-muted-foreground pt-1">
              +$48,245 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
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
            <div className="text-2xl font-bold">4,385</div>
            <p className="text-xs text-muted-foreground pt-1">
              +253 from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Revenue trends for the past 12 months</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <BarChart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Revenue chart visualization would appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="h-full">
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New user registrations over time</CardDescription>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-16 w-16 text-muted-foreground mx-auto mb-4"
                >
                  <path d="M21 8v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8" />
                  <path d="M6 2h12a2 2 0 0 1 2 2v4H4V4a2 2 0 0 1 2-2z" />
                  <path d="M4 10h16" />
                  <path d="m9 16 3-3 3 3" />
                </svg>
                <p className="text-muted-foreground">
                  User growth chart visualization would appear here.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Activity */}
      <div>
        <Tabs defaultValue="users" className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="users">Recent Users</TabsTrigger>
              <TabsTrigger value="courses">Recent Courses</TabsTrigger>
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/users">View All Users</a>
              </Button>
              <Button variant="outline" size="sm" asChild>
                <a href="/admin/courses">View All Courses</a>
              </Button>
            </div>
          </div>
          
          <TabsContent value="users">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">User</th>
                    <th className="py-3 px-4 text-left font-medium">Email</th>
                    <th className="py-3 px-4 text-left font-medium">Role</th>
                    <th className="py-3 px-4 text-left font-medium">Join Date</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://i.pravatar.cc/150?img=${i + 5}`} 
                            alt="User avatar" 
                            className="w-8 h-8 rounded-full object-cover" 
                          />
                          <div className="font-medium">User {i}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">user{i}@example.com</td>
                      <td className="py-3 px-4">{i % 3 === 0 ? "Instructor" : i % 3 === 1 ? "Student" : "Admin"}</td>
                      <td className="py-3 px-4">May {i + 10}, 2025</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Course</th>
                    <th className="py-3 px-4 text-left font-medium">Instructor</th>
                    <th className="py-3 px-4 text-left font-medium">Category</th>
                    <th className="py-3 px-4 text-left font-medium">Students</th>
                    <th className="py-3 px-4 text-right font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockCourses.slice(0, 5).map((course) => (
                    <tr key={course.id} className="border-b">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={course.coverImage} 
                            alt={course.title} 
                            className="w-12 h-8 rounded object-cover" 
                          />
                          <div className="font-medium line-clamp-1">{course.title}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">{course.instructor}</td>
                      <td className="py-3 px-4">{course.category}</td>
                      <td className="py-3 px-4">{course.students.toLocaleString()}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="transactions">
            <div className="rounded-md border">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="py-3 px-4 text-left font-medium">Transaction ID</th>
                    <th className="py-3 px-4 text-left font-medium">User</th>
                    <th className="py-3 px-4 text-left font-medium">Course</th>
                    <th className="py-3 px-4 text-left font-medium">Amount</th>
                    <th className="py-3 px-4 text-left font-medium">Date</th>
                    <th className="py-3 px-4 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="border-b">
                      <td className="py-3 px-4">TRX-{Math.floor(Math.random() * 1000000)}</td>
                      <td className="py-3 px-4">User {i}</td>
                      <td className="py-3 px-4 line-clamp-1">{mockCourses[i % mockCourses.length].title}</td>
                      <td className="py-3 px-4">${(19.99 + i * 10).toFixed(2)}</td>
                      <td className="py-3 px-4">May {15 - i}, 2025</td>
                      <td className="py-3 px-4 text-right">
                        <span className={`px-2 py-1 rounded-full text-xs ${i % 3 === 0 ? "bg-green-100 text-green-800" : i % 3 === 1 ? "bg-yellow-100 text-yellow-800" : "bg-blue-100 text-blue-800"}`}>
                          {i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Processing"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Platform Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>All systems operational</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>API</span>
                </div>
                <span className="text-sm text-muted-foreground">100% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Web App</span>
                </div>
                <span className="text-sm text-muted-foreground">100% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Database</span>
                </div>
                <span className="text-sm text-muted-foreground">100% uptime</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Storage</span>
                </div>
                <span className="text-sm text-muted-foreground">100% uptime</span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View Detailed Status</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Storage Usage</CardTitle>
            <CardDescription>Current storage allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between mb-1">
                <span>Videos</span>
                <span>68%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-primary h-full rounded-full" style={{ width: "68%" }}></div>
              </div>
              
              <div className="flex justify-between mb-1">
                <span>Documents</span>
                <span>12%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "12%" }}></div>
              </div>
              
              <div className="flex justify-between mb-1">
                <span>Images</span>
                <span>15%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-yellow-500 h-full rounded-full" style={{ width: "15%" }}></div>
              </div>
              
              <div className="flex justify-between mb-1">
                <span>Other</span>
                <span>5%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="bg-gray-500 h-full rounded-full" style={{ width: "5%" }}></div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <div className="text-sm text-muted-foreground">
              <span className="font-medium">8.2TB</span> of <span className="font-medium">10TB</span> used
            </div>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>Content flags and user reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-1">
                    <div className="font-medium">Content Flag #{i}</div>
                    <span className="text-xs text-muted-foreground">1 hour ago</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {i === 1 
                      ? "Inappropriate content in course discussion" 
                      : i === 2 
                        ? "Copyright violation reported" 
                        : "Spam in forum thread"
                    }
                  </p>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" size="sm">Dismiss</Button>
                    <Button size="sm">Review</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">View All Reports</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
