
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { mockCourses, categories } from "@/data/mockData";

// Define form validation schema
const basicInfoSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  subtitle: z.string().min(10, "Subtitle must be at least 10 characters"),
  description: z.string().min(30, "Description must be at least 30 characters"),
  category: z.string().min(1, "Please select a category"),
  level: z.string().min(1, "Please select a level"),
  language: z.string().min(1, "Please select a language"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
});

type BasicInfoFormValues = z.infer<typeof basicInfoSchema>;

const CourseEditPage = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  
  // Find the course in our mock data
  const course = mockCourses.find(course => course.id === courseId);
  
  // Initialize form
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: course?.title || "",
      subtitle: "The complete guide to mastering this subject with hands-on projects",
      description: "This comprehensive course covers everything from the fundamentals to advanced concepts. You'll learn through practical, hands-on projects that reinforce your understanding and help you build a portfolio of work.",
      category: course?.category || "",
      level: course?.level || "",
      language: course?.language || "",
      price: course?.price || 0,
    },
  });
  
  useEffect(() => {
    // Set the cover image
    if (course) {
      setCoverImage(course.coverImage);
    }
  }, [course]);
  
  const onSubmit = (data: BasicInfoFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Course update data:", data);
      
      toast({
        title: "Course updated",
        description: "Your course has been updated successfully.",
      });
      
      setIsSubmitting(false);
    }, 1500);
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCoverImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handlePublish = () => {
    toast({
      title: "Course published",
      description: "Your course is now live and available to students.",
    });
    setIsPublishDialogOpen(false);
    navigate("/instructor/courses");
  };
  
  // If course not found
  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Course Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/instructor/courses">Back to Courses</a>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit Course</h1>
          <p className="text-muted-foreground">
            Update your course details and curriculum
          </p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate(`/courses/${courseId}`)}>
            Preview
          </Button>
          <Button onClick={() => setIsPublishDialogOpen(true)}>
            Publish Course
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="basic" className="space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Update the essential information about your course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              A clear, specific title that describes what you'll teach
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="subtitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Subtitle</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              A brief, compelling description of your course
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Course Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                className="min-h-32"
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              A detailed description of your course content, learning outcomes, and intended audience
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {categories.map(category => (
                                    <SelectItem key={category.id} value={category.name}>
                                      {category.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="level"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Level</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a level" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="Beginner">Beginner</SelectItem>
                                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                                  <SelectItem value="Advanced">Advanced</SelectItem>
                                  <SelectItem value="All Levels">All Levels</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="language"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Language</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a language" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="English">English</SelectItem>
                                  <SelectItem value="French">French</SelectItem>
                                  <SelectItem value="Arabic">Arabic</SelectItem>
                                  <SelectItem value="Spanish">Spanish</SelectItem>
                                  <SelectItem value="German">German</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="price"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Price (USD)</FormLabel>
                              <FormControl>
                                <Input type="number" min="0" step="0.01" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="flex justify-end pt-6">
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? "Saving..." : "Save Changes"}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <Card className="sticky top-6">
                <CardHeader>
                  <CardTitle>Cover Image</CardTitle>
                  <CardDescription>
                    Update your course cover image
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-md border border-gray-200">
                      {coverImage ? (
                        <img 
                          src={coverImage} 
                          alt="Course Cover Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full bg-gray-50">
                          No image
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cover-image" className="block text-sm font-medium mb-2">
                        Change Image
                      </label>
                      <Input
                        id="cover-image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Recommended size: 1280×720 pixels (16:9 ratio)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Course Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Status:</span>
                      <span className="text-amber-600 font-medium">Draft</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Created:</span>
                      <span>May 1, 2025</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Last Updated:</span>
                      <span>May 15, 2025</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => setIsPublishDialogOpen(true)} 
                    className="w-full"
                  >
                    Publish Course
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="curriculum">
          <Card>
            <CardHeader>
              <CardTitle>Course Curriculum</CardTitle>
              <CardDescription>
                Organize your course content into sections and lessons
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="mx-auto h-12 w-12 text-muted-foreground"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-medium">Start building your curriculum</h3>
                <p className="mt-2 text-muted-foreground">
                  Add sections and lessons to structure your course content
                </p>
                <div className="mt-6">
                  <Button>Add Section</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Course Settings</CardTitle>
              <CardDescription>
                Configure additional settings for your course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="welcome-message" className="text-sm font-medium">
                    Welcome Message
                  </label>
                  <Textarea 
                    id="welcome-message" 
                    placeholder="Enter a welcome message for your students..."
                    className="min-h-24"
                  />
                  <p className="text-xs text-muted-foreground">
                    This message will be sent to students when they enroll in your course.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="completion-message" className="text-sm font-medium">
                    Completion Message
                  </label>
                  <Textarea 
                    id="completion-message" 
                    placeholder="Enter a message for students who complete your course..."
                    className="min-h-24"
                  />
                  <p className="text-xs text-muted-foreground">
                    This message will be shown to students when they complete your course.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Course Visibility</label>
                <Select defaultValue="private">
                  <SelectTrigger>
                    <SelectValue placeholder="Select visibility" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Public - Visible to everyone</SelectItem>
                    <SelectItem value="private">Private - Only visible to enrolled students</SelectItem>
                    <SelectItem value="password">Password Protected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Enrollment Options</label>
                <Select defaultValue="open">
                  <SelectTrigger>
                    <SelectValue placeholder="Select enrollment option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open - Anyone can enroll</SelectItem>
                    <SelectItem value="invite">Invite Only - Students need an invitation</SelectItem>
                    <SelectItem value="approval">Approval - Enrollment requires approval</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button>Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Publish Course Dialog */}
      <Dialog open={isPublishDialogOpen} onOpenChange={setIsPublishDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Publish Course</DialogTitle>
            <DialogDescription>
              Are you ready to publish your course and make it available to students?
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="rounded-md bg-yellow-50 p-4 text-sm text-yellow-800">
              <div className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-3 h-5 w-5 text-yellow-700 mt-0.5"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                <div>
                  <h3 className="font-medium mb-1">Before you publish</h3>
                  <p>Publishing your course means:</p>
                  <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>Students will be able to enroll and purchase your course</li>
                    <li>Your course will appear in search results</li>
                    <li>Major changes may require re-approval from our team</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPublishDialogOpen(false)}>
              Not Yet
            </Button>
            <Button onClick={handlePublish}>
              Publish Course
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CourseEditPage;
