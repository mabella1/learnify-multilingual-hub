
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { enrolledCourses } from "@/data/mockData";

const UserCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter courses based on search query
  const filteredCourses = enrolledCourses.filter(course => 
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const inProgressCourses = filteredCourses.filter(course => course.progress < 100);
  const completedCourses = filteredCourses.filter(course => course.progress === 100);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Courses</h1>
        <p className="text-muted-foreground">Manage and track your enrolled courses</p>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Input
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <Button>Browse New Courses</Button>
      </div>
      
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList>
          <TabsTrigger value="all">All Courses ({filteredCourses.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressCourses.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedCourses.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))
          ) : (
            <EmptyState query={searchQuery} />
          )}
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-6">
          {inProgressCourses.length > 0 ? (
            inProgressCourses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))
          ) : (
            <EmptyState type="in-progress" query={searchQuery} />
          )}
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-6">
          {completedCourses.length > 0 ? (
            completedCourses.map(course => (
              <CourseItem key={course.id} course={course} />
            ))
          ) : (
            <EmptyState type="completed" query={searchQuery} />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CourseItemProps {
  course: typeof enrolledCourses[0];
}

const CourseItem = ({ course }: CourseItemProps) => {
  return (
    <Card className="p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img 
          src={course.coverImage} 
          alt={course.title} 
          className="w-full md:w-48 h-32 object-cover rounded-md"
        />
        
        <div className="flex-1 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <span className="text-sm text-muted-foreground">
                Last accessed: {course.lastAccessed.toLocaleDateString()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{course.instructor}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress: {course.progress}%</span>
              <span className="text-xs text-muted-foreground">
                {course.progress === 100 ? 'Completed' : 'In Progress'}
              </span>
            </div>
            <Progress value={course.progress} className="h-2" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm">Continue Learning</Button>
            <Button size="sm" variant="outline">View Certificate</Button>
            <Button size="sm" variant="outline">Course Details</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface EmptyStateProps {
  type?: 'all' | 'in-progress' | 'completed';
  query: string;
}

const EmptyState = ({ type = 'all', query }: EmptyStateProps) => {
  let message = '';
  
  if (query) {
    message = `No courses match your search: "${query}"`;
  } else {
    switch (type) {
      case 'in-progress':
        message = "You don't have any courses in progress.";
        break;
      case 'completed':
        message = "You haven't completed any courses yet.";
        break;
      default:
        message = "You haven't enrolled in any courses yet.";
    }
  }
  
  return (
    <div className="text-center py-12">
      <h3 className="text-lg font-medium mb-2">{message}</h3>
      <p className="text-muted-foreground mb-6">
        {query 
          ? "Try adjusting your search terms or browse all courses."
          : "Explore our catalog to find courses that interest you."
        }
      </p>
      <Button>Browse Courses</Button>
    </div>
  );
};

export default UserCoursesPage;
