
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useToast } from "@/components/ui/use-toast";
import { categories } from "@/data/mockData";

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

const CourseCreationPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);

  // Initialize form
  const form = useForm<BasicInfoFormValues>({
    resolver: zodResolver(basicInfoSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      description: "",
      category: "",
      level: "",
      language: "",
      price: 0,
    },
  });

  const onSubmit = (data: BasicInfoFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call delay
    setTimeout(() => {
      console.log("Course data:", data);
      
      toast({
        title: "Course created",
        description: "Your course has been created successfully.",
      });
      
      navigate("/instructor/courses");
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

  const saveAsDraft = () => {
    if (form.getValues().title) {
      toast({
        title: "Draft saved",
        description: "Your course has been saved as a draft.",
      });
      navigate("/instructor/courses");
    } else {
      toast({
        title: "Error",
        description: "Please enter at least a course title before saving.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
        <p className="text-muted-foreground">Create and publish your course to reach students worldwide</p>
      </div>
      
      <Tabs defaultValue="basic" className="space-y-6">
        <div className="bg-white rounded-lg shadow p-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="curriculum" disabled>Curriculum</TabsTrigger>
            <TabsTrigger value="settings" disabled>Settings</TabsTrigger>
          </TabsList>
          
          <div className="text-sm text-muted-foreground">
            <span className="text-primary font-medium">Step 1 of 3:</span> Fill in the basic information about your course
          </div>
        </div>
        
        <TabsContent value="basic">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Course Details</CardTitle>
                  <CardDescription>
                    Provide the essential information about your course
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
                              <Input placeholder="e.g. The Complete Web Development Bootcamp" {...field} />
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
                              <Input placeholder="e.g. Learn web development from scratch with practical projects" {...field} />
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
                                placeholder="Describe what students will learn and why they should take your course"
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
                      
                      <div className="flex justify-between pt-6">
                        <Button variant="outline" type="button" onClick={saveAsDraft}>
                          Save as Draft
                        </Button>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" type="button" onClick={() => navigate("/instructor/courses")}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Creating..." : "Continue to Curriculum"}
                          </Button>
                        </div>
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
                    Upload an engaging image for your course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="aspect-video overflow-hidden rounded-md border-2 border-dashed border-gray-200 flex items-center justify-center bg-gray-50">
                      {coverImage ? (
                        <img 
                          src={coverImage} 
                          alt="Course Cover Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center p-6">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="mx-auto h-10 w-10 text-gray-400"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                            />
                          </svg>
                          <p className="mt-2 text-sm text-gray-500">No image uploaded</p>
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="cover-image" className="block text-sm font-medium mb-2">
                        Upload Image
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
                <CardFooter className="flex-col space-y-4">
                  <div className="text-sm font-medium">Tips for a great cover image:</div>
                  <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
                    <li>Use high-quality, engaging visuals</li>
                    <li>Clearly represent your course content</li>
                    <li>Avoid too much text in the image</li>
                    <li>Ensure good contrast and readability</li>
                  </ul>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseCreationPage;
