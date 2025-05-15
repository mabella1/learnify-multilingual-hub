import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Play, Users, Star, Clock, Globe, Award, Check, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/context/LanguageContext";
import { courseDetails } from "@/data/mockData";

const CourseDetailsPage = () => {
  const { courseId } = useParams();
  const { t } = useLanguage();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  // In a real app, you would fetch the course based on the courseId
  const course = courseDetails;

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionTitle)
        ? prev.filter(section => section !== sectionTitle)
        : [...prev, sectionTitle]
    );
  };

  const totalLessons = course.curriculum.reduce(
    (total, section) => total + section.lessons.length,
    0
  );

  const totalDuration = course.curriculum.reduce(
    (total, section) => 
      total + section.lessons.reduce(
        (sectionTotal, lesson) => {
          const [minutes, seconds] = lesson.duration.split(':').map(Number);
          return sectionTotal + minutes + seconds / 60;
        }, 
        0
      ),
    0
  );

  const totalHours = Math.floor(totalDuration / 60);
  const totalMinutes = Math.round(totalDuration % 60);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Course Header */}
      <section className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge className="mb-4">{course.category}</Badge>
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              
              <p className="mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                  <span>{course.rating.toFixed(1)} ({course.reviews.length} reviews)</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{course.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{totalHours}h {totalMinutes}m total</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 mr-1" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-1" />
                  <span>{course.level}</span>
                </div>
              </div>
              
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={course.instructorAvatar} />
                  <AvatarFallback>{course.instructor.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm text-gray-300">Created by</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg text-gray-900 lg:self-start">
              <div className="relative mb-6 rounded-md overflow-hidden">
                <img 
                  src={course.coverImage} 
                  alt={course.title} 
                  className="w-full aspect-video object-cover"
                />
                <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
                  <DialogTrigger asChild>
                    <Button className="absolute inset-0 m-auto h-12 w-12 rounded-full bg-primary/90 hover:bg-primary text-white">
                      <Play className="h-6 w-6" fill="currentColor" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[720px]">
                    <DialogHeader>
                      <DialogTitle>Course Preview</DialogTitle>
                      <DialogDescription>
                        Get a taste of what this course has to offer
                      </DialogDescription>
                    </DialogHeader>
                    <div className="video-container">
                      <iframe 
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                        title="Course Preview" 
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              
              <div className="mb-6">
                <div className="text-3xl font-bold mb-4">${course.price.toFixed(2)}</div>
              </div>
              
              <div className="space-y-4">
                <Button className="w-full" size="lg">{t("course.enroll")}</Button>
                <Button variant="outline" className="w-full" size="lg">Add to Wishlist</Button>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold mb-3">This course includes:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>{totalHours}h {totalMinutes}m on-demand video</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>{totalLessons} lessons</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>Full lifetime access</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>Access on mobile and TV</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-primary mt-0.5 mr-2" />
                    <span>Certificate of completion</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="curriculum">
                <TabsList className="w-full mb-8">
                  <TabsTrigger value="curriculum" className="flex-1">{t("course.curriculum")}</TabsTrigger>
                  <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                  <TabsTrigger value="instructor" className="flex-1">{t("course.instructor")}</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">{t("course.reviews")}</TabsTrigger>
                </TabsList>
                
                <TabsContent value="curriculum">
                  <div className="bg-white rounded-lg shadow">
                    <div className="p-4 border-b">
                      <h3 className="text-lg font-semibold">Course Content</h3>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                        <span>{course.curriculum.length} sections • {totalLessons} lessons • {totalHours}h {totalMinutes}m total length</span>
                      </div>
                    </div>
                    
                    {course.curriculum.map((section, index) => (
                      <div key={index} className="border-b last:border-b-0">
                        <div 
                          className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                          onClick={() => toggleSection(section.title)}
                        >
                          <div>
                            <h4 className="font-medium">{section.title}</h4>
                            <div className="text-sm text-muted-foreground mt-1">
                              {section.lessons.length} lessons
                            </div>
                          </div>
                          {expandedSections.includes(section.title) ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </div>
                        
                        {expandedSections.includes(section.title) && (
                          <div className="px-4 pb-4">
                            <ul className="space-y-3">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <li key={lessonIndex} className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50">
                                  <div className="flex items-center">
                                    {lesson.type === "video" ? (
                                      <Play className="h-4 w-4 mr-3" />
                                    ) : lesson.type === "quiz" ? (
                                      <Award className="h-4 w-4 mr-3" />
                                    ) : (
                                      <FileText className="h-4 w-4 mr-3" />
                                    )}
                                    <span className={lesson.preview ? "" : "text-muted-foreground"}>
                                      {lesson.title}
                                      {lesson.preview && (
                                        <Badge variant="outline" className="ml-2">Preview</Badge>
                                      )}
                                    </span>
                                  </div>
                                  <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="overview">
                  <div className="bg-white rounded-lg shadow p-6 space-y-8">
                    <div>
                      <h3 className="text-xl font-semibold mb-4">What you'll learn</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {course.whatYouWillLearn.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Check className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4">Requirements</h3>
                      <ul className="space-y-2">
                        {course.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 mr-3" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="instructor">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={course.instructorDetails.avatar} />
                        <AvatarFallback>{course.instructorDetails.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{course.instructorDetails.name}</h3>
                        <div className="text-muted-foreground">{course.instructorDetails.courses} courses • {course.instructorDetails.students.toLocaleString()} students</div>
                        <div className="flex items-center mt-1">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                          <span>{course.instructorDetails.rating.toFixed(1)} Instructor Rating</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <p>{course.instructorDetails.bio}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews">
                  <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="flex items-center">
                          <span className="text-3xl font-bold mr-2">{course.rating.toFixed(1)}</span>
                          <div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className="h-5 w-5 text-yellow-500" 
                                  fill={i < Math.floor(course.rating) ? "currentColor" : "none"}
                                />
                              ))}
                            </div>
                            <div className="text-sm text-muted-foreground">Course Rating</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button>Write a Review</Button>
                    </div>
                    
                    <div className="space-y-6">
                      {course.reviews.map(review => (
                        <div key={review.id} className="pb-6 border-b last:border-b-0 last:pb-0">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={review.avatar} />
                              <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-1">
                              <div className="font-medium">{review.user}</div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className="h-4 w-4 text-yellow-500" 
                                    fill={i < review.rating ? "currentColor" : "none"}
                                  />
                                ))}
                                <span className="text-sm text-muted-foreground ml-2">
                                  {new Date(review.date).toLocaleDateString()}
                                </span>
                              </div>
                              <p className="mt-2">{review.content}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="lg:block hidden">
              {/* Similar courses or related content can go here */}
              <div className="sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Similar Courses</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-medium mb-1">Advanced JavaScript: Modern Techniques</h4>
                    <div className="text-sm text-muted-foreground mb-2">By Jane Smith</div>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm">4.7</span>
                    </div>
                    <div className="font-bold">$79.99</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-medium mb-1">Python for Data Science</h4>
                    <div className="text-sm text-muted-foreground mb-2">By Michael Johnson</div>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm">4.8</span>
                    </div>
                    <div className="font-bold">$89.99</div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg shadow">
                    <h4 className="font-medium mb-1">Modern React with Redux</h4>
                    <div className="text-sm text-muted-foreground mb-2">By Stephen Grider</div>
                    <div className="flex items-center mb-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                      <span className="text-sm">4.9</span>
                    </div>
                    <div className="font-bold">$94.99</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CourseDetailsPage;
