
import { CourseProps } from "@/components/courses/CourseCard";

// Mock course data
export const mockCourses: CourseProps[] = [
  {
    id: "1",
    title: "The Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 4.8,
    students: 125000,
    price: 94.99,
    category: "Web Development",
    level: "Beginner",
    language: "English"
  },
  {
    id: "2",
    title: "Machine Learning A-Z: Hands-On Python & R",
    instructor: "Kirill Eremenko",
    coverImage: "https://images.unsplash.com/photo-1526378800651-c32d170fe6f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 4.7,
    students: 98500,
    price: 89.99,
    category: "Machine Learning",
    level: "Intermediate",
    language: "English"
  },
  {
    id: "3",
    title: "The Complete Digital Marketing Course",
    instructor: "Rob Percival",
    coverImage: "https://images.unsplash.com/photo-1532622785990-d2c36a76f5a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 4.5,
    students: 75000,
    price: 84.99,
    category: "Digital Marketing",
    level: "Beginner",
    language: "English"
  },
  {
    id: "4",
    title: "Développement Web avec JavaScript et React",
    instructor: "Jean Dupont",
    coverImage: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 4.6,
    students: 45000,
    price: 79.99,
    category: "Web Development",
    level: "Intermediate",
    language: "French"
  },
  {
    id: "5",
    title: "الدورة الشاملة لتطوير تطبيقات الموبايل",
    instructor: "أحمد خالد",
    coverImage: "https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 4.7,
    students: 38000,
    price: 74.99,
    category: "Mobile Development",
    level: "Beginner",
    language: "Arabic"
  },
  {
    id: "6",
    title: "Advanced Data Science and Analytics",
    instructor: "Sarah Johnson",
    coverImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 4.9,
    students: 65000,
    price: 99.99,
    category: "Data Science",
    level: "Advanced",
    language: "English"
  }
];

// Mock categories
export const categories = [
  { id: "1", name: "Web Development", count: 230 },
  { id: "2", name: "Data Science", count: 195 },
  { id: "3", name: "Mobile Development", count: 180 },
  { id: "4", name: "Machine Learning", count: 142 },
  { id: "5", name: "Digital Marketing", count: 128 },
  { id: "6", name: "Graphic Design", count: 121 },
  { id: "7", name: "Business", count: 118 },
  { id: "8", name: "Photography", count: 97 },
];

// Mock student enrolled courses with progress
export const enrolledCourses = [
  {
    ...mockCourses[0],
    progress: 75,
    lastAccessed: new Date(2025, 4, 10)
  },
  {
    ...mockCourses[2],
    progress: 35,
    lastAccessed: new Date(2025, 4, 12)
  },
  {
    ...mockCourses[5],
    progress: 10,
    lastAccessed: new Date(2025, 4, 14)
  }
];

// Mock instructor courses
export const instructorCourses = [
  {
    ...mockCourses[1],
    students: 24560,
    revenue: 1256789.45,
    status: "published"
  },
  {
    ...mockCourses[3],
    students: 12340,
    revenue: 567890.30,
    status: "published"
  },
  {
    id: "7",
    title: "Advanced React Patterns and Performance",
    instructor: "Kirill Eremenko",
    coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
    rating: 0,
    students: 0,
    price: 89.99,
    category: "Web Development",
    level: "Advanced",
    revenue: 0,
    status: "draft"
  }
];

// Mock course details with curriculum
export const courseDetails = {
  id: "1",
  title: "The Complete Web Development Bootcamp",
  instructor: "Dr. Angela Yu",
  instructorAvatar: "https://i.pravatar.cc/150?img=5",
  coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1544&q=80",
  rating: 4.8,
  students: 125000,
  price: 94.99,
  category: "Web Development",
  level: "Beginner",
  language: "English",
  description: "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB, and more!",
  whatYouWillLearn: [
    "Build 16 web development projects for your portfolio, ready to apply for junior developer jobs",
    "Learn the latest technologies, including Javascript, React, Node, and more",
    "Master frontend development with React",
    "Master backend development with Node",
    "Learn professional developer best practices"
  ],
  requirements: [
    "No programming experience needed - I'll teach you everything you need to know",
    "A computer with access to the internet",
    "No paid software required",
    "I'll walk you through, step-by-step, how to get all the software installed and set up"
  ],
  curriculum: [
    {
      title: "Introduction to Web Development",
      lessons: [
        { title: "Course Overview", duration: "07:15", preview: true, type: "video" },
        { title: "How the Internet Works", duration: "12:30", preview: false, type: "video" },
        { title: "Introduction Quiz", duration: "10:00", preview: false, type: "quiz" }
      ]
    },
    {
      title: "HTML Fundamentals",
      lessons: [
        { title: "HTML Structure", duration: "15:45", preview: true, type: "video" },
        { title: "HTML Elements", duration: "18:20", preview: false, type: "video" },
        { title: "Practical Exercise: Build Your First Webpage", duration: "30:00", preview: false, type: "exercise" }
      ]
    },
    {
      title: "CSS Styling",
      lessons: [
        { title: "CSS Basics", duration: "20:15", preview: false, type: "video" },
        { title: "Styling HTML Elements", duration: "22:30", preview: false, type: "video" },
        { title: "CSS Layout", duration: "25:45", preview: false, type: "video" },
        { title: "CSS Project: Style Your Webpage", duration: "45:00", preview: false, type: "exercise" }
      ]
    },
    {
      title: "JavaScript Essentials",
      lessons: [
        { title: "JavaScript Syntax", duration: "18:30", preview: false, type: "video" },
        { title: "DOM Manipulation", duration: "24:15", preview: false, type: "video" },
        { title: "JavaScript Events", duration: "20:00", preview: false, type: "video" },
        { title: "JavaScript Quiz", duration: "15:00", preview: false, type: "quiz" }
      ]
    }
  ],
  reviews: [
    {
      id: "r1",
      user: "Michael Smith",
      avatar: "https://i.pravatar.cc/150?img=11",
      rating: 5,
      date: "2025-03-15",
      content: "This course was amazing! I went from knowing nothing about web development to building full-stack applications. The instructor explains everything clearly and the projects are really engaging."
    },
    {
      id: "r2",
      user: "Sophia Garcia",
      avatar: "https://i.pravatar.cc/150?img=12",
      rating: 4,
      date: "2025-02-28",
      content: "Great course overall. I especially loved the React section, though I felt the Node.js part could have been more detailed. Still, I learned a lot and would recommend it."
    },
    {
      id: "r3",
      user: "David Kim",
      avatar: "https://i.pravatar.cc/150?img=13",
      rating: 5,
      date: "2025-02-10",
      content: "One of the best online courses I've taken. The instructor's teaching style made complex concepts easy to understand. I now feel confident in my web development skills."
    }
  ],
  instructorDetails: {
    name: "Dr. Angela Yu",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.",
    students: 1500000,
    courses: 12,
    rating: 4.8
  }
};
