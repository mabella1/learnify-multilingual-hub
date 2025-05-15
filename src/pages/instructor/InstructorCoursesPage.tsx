
import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { instructorCourses } from "@/data/mockData";
import { Link } from "react-router-dom";

const InstructorCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Filter courses based on search query and status
  const filteredCourses = instructorCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
  };
  
  const handleDeleteCourse = () => {
    console.log("Deleting course:", selectedCourse);
    // In a real app, this would make an API call to delete the course
    setIsDeleteDialogOpen(false);
    setSelectedCourse(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Courses</h1>
          <p className="text-muted-foreground">Manage and update your courses</p>
        </div>
        
        <Button asChild>
          <Link to="/instructor/courses/create">
            <Plus className="h-4 w-4 mr-2" />
            Create New Course
          </Link>
        </Button>
      </div>
      
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="relative w-full sm:w-80">
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
        
        <div className="flex gap-2">
          <Select 
            value={statusFilter}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Courses Table */}
      <div className="rounded-md border">
        {filteredCourses.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left font-medium">Course</th>
                <th className="py-3 px-4 text-left font-medium">Students</th>
                <th className="py-3 px-4 text-left font-medium">Rating</th>
                <th className="py-3 px-4 text-left font-medium">Revenue</th>
                <th className="py-3 px-4 text-left font-medium">Status</th>
                <th className="py-3 px-4 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id} className="border-b">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={course.coverImage} 
                        alt={course.title} 
                        className="w-12 h-8 rounded object-cover" 
                      />
                      <div>
                        <div className="font-medium">{course.title}</div>
                        <div className="text-xs text-muted-foreground">{course.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{course.students.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    {course.rating > 0 ? (
                      <div className="flex items-center">
                        {course.rating.toFixed(1)}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4 ml-1 text-yellow-500"
                        >
                          <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                        </svg>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No ratings</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    ${course.revenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant={course.status === "published" ? "default" : "secondary"}>
                      {course.status === "published" ? "Published" : "Draft"}
                    </Badge>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link to={`/courses/${course.id}`}>View Course</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to={`/instructor/courses/edit/${course.id}`}>Edit Course</Link>
                        </DropdownMenuItem>
                        {course.status === "draft" && (
                          <DropdownMenuItem>Publish Course</DropdownMenuItem>
                        )}
                        {course.status === "published" && (
                          <DropdownMenuItem>Unpublish Course</DropdownMenuItem>
                        )}
                        <DropdownMenuItem>Duplicate Course</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-destructive focus:text-destructive"
                          onClick={() => {
                            setSelectedCourse(course.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          Delete Course
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-12 text-center">
            <h3 className="text-lg font-medium mb-2">No courses found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery 
                ? "Try adjusting your search terms or filters."
                : "You haven't created any courses yet."}
            </p>
            <Button asChild>
              <Link to="/instructor/courses/create">Create Your First Course</Link>
            </Button>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Course</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this course? This action cannot be undone and all course content will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCourse}>
              Delete Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructorCoursesPage;
