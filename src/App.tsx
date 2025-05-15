
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";

// Layouts
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailsPage from "./pages/CourseDetailsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";

// User Dashboard Pages
import UserDashboardPage from "./pages/dashboard/UserDashboardPage";
import UserProfilePage from "./pages/dashboard/UserProfilePage";
import UserCoursesPage from "./pages/dashboard/UserCoursesPage";

// Instructor Pages
import InstructorDashboardPage from "./pages/instructor/InstructorDashboardPage";
import InstructorCoursesPage from "./pages/instructor/InstructorCoursesPage";
import CourseCreationPage from "./pages/instructor/CourseCreationPage";
import CourseEditPage from "./pages/instructor/CourseEditPage";

// Admin Pages
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";
import AdminCoursesPage from "./pages/admin/AdminCoursesPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="courses/:courseId" element={<CourseDetailsPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>

              {/* User Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<UserDashboardPage />} />
                <Route path="profile" element={<UserProfilePage />} />
                <Route path="my-courses" element={<UserCoursesPage />} />
              </Route>

              {/* Instructor Routes */}
              <Route path="/instructor" element={<DashboardLayout />}>
                <Route index element={<InstructorDashboardPage />} />
                <Route path="courses" element={<InstructorCoursesPage />} />
                <Route path="courses/create" element={<CourseCreationPage />} />
                <Route path="courses/edit/:courseId" element={<CourseEditPage />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin" element={<DashboardLayout />}>
                <Route index element={<AdminDashboardPage />} />
                <Route path="users" element={<AdminUsersPage />} />
                <Route path="courses" element={<AdminCoursesPage />} />
              </Route>

              {/* Catch-all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
