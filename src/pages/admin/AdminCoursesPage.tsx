
import { useState } from "react";
import { Search, Filter, MoreHorizontal, Download, Check, X } from "lucide-react";
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
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { mockCourses } from "@/data/mockData";

const AdminCoursesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  
  // Enhanced mock courses with status and dates
  const courses = mockCourses.map((course, index) => ({
    ...course,
    status: index % 5 === 0 ? "pending" : index % 10 === 0 ? "rejected" : "approved",
    createdAt: new Date(2025, 0, index + 1).toLocaleDateString(),
    updatedAt: new Date(2025, 1, index + 5).toLocaleDateString(),
    revenue: Math.floor(course.price * course.students * 0.7)
  }));
  
  // Get unique categories
  const categories = [...new Set(courses.map(course => course.category))];
  
  // Filter courses based on search query and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    
    const matchesStatus = statusFilter === "all" || course.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });
  
  const handleReviewCourse = (action: 'approve' | 'reject') => {
    console.log(`${action} course:`, selectedCourse);
    // In a real app, this would make an API call to update the course status
    setIsReviewDialogOpen(false);
    setSelectedCourse(null);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Courses Management</h1>
          <p className="text-muted-foreground">Manage all courses across the platform</p>
        </div>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Courses Report
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
            value={categoryFilter}
            onValueChange={setCategoryFilter}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select 
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[180px]">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Filter by status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
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
                <th className="py-3 px-4 text-left font-medium">Instructor</th>
                <th className="py-3 px-4 text-left font-medium">Students</th>
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
                        <div className="font-medium line-clamp-1">{course.title}</div>
                        <div className="text-xs text-muted-foreground">{course.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">{course.instructor}</td>
                  <td className="py-3 px-4">{course.students.toLocaleString()}</td>
                  <td className="py-3 px-4">${course.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <Badge variant={
                      course.status === "approved" 
                        ? "success" 
                        : course.status === "pending" 
                          ? "outline" 
                          : "destructive"
                    }>
                      {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
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
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>View Curriculum</DropdownMenuItem>
                        {course.status === "pending" && (
                          <>
                            <DropdownMenuItem onClick={() => {
                              setSelectedCourse(course.id);
                              setIsReviewDialogOpen(true);
                            }}>
                              Review Course
                            </DropdownMenuItem>
                          </>
                        )}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          Remove Course
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
              Try adjusting your search terms or filters.
            </p>
            <Button onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setStatusFilter("all");
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      
      {/* Review Course Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Review Course</DialogTitle>
            <DialogDescription>
              Review this course and decide whether to approve or reject it.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="review-notes" className="text-sm font-medium">
                Review Notes
              </label>
              <textarea 
                id="review-notes" 
                className="w-full min-h-32 p-3 border rounded-md"
                placeholder="Enter your review notes and feedback for the instructor..."
              ></textarea>
            </div>
          </div>
          
          <DialogFooter>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsReviewDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => handleReviewCourse('reject')}
                className="flex items-center"
              >
                <X className="h-4 w-4 mr-2" />
                Reject Course
              </Button>
              <Button
                className="flex items-center"
                onClick={() => handleReviewCourse('approve')}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve Course
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCoursesPage;
