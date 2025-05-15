
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { 
  BookOpen, Users, BarChart, Settings, Video, FileText, 
  Award, MessageSquare, User, LogOut 
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const DashboardSidebar = () => {
  const { currentUser, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Define navigation links based on user role
  const getNavLinks = () => {
    const commonLinks = [
      { 
        href: "/dashboard/profile", 
        label: t("common.profile"), 
        icon: <User className="h-5 w-5 mr-3" /> 
      },
    ];

    if (!currentUser) return commonLinks;

    switch(currentUser.role) {
      case "admin":
        return [
          { 
            href: "/admin", 
            label: "Dashboard", 
            icon: <BarChart className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/admin/users", 
            label: "Users", 
            icon: <Users className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/admin/courses", 
            label: "Courses", 
            icon: <BookOpen className="h-5 w-5 mr-3" /> 
          },
          ...commonLinks
        ];
      case "instructor":
        return [
          { 
            href: "/instructor", 
            label: "Dashboard", 
            icon: <BarChart className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/instructor/courses", 
            label: "My Courses", 
            icon: <BookOpen className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/instructor/courses/create", 
            label: "Create Course", 
            icon: <Video className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/instructor/discussions", 
            label: "Discussions", 
            icon: <MessageSquare className="h-5 w-5 mr-3" /> 
          },
          ...commonLinks
        ];
      default: // student
        return [
          { 
            href: "/dashboard", 
            label: "Dashboard", 
            icon: <BarChart className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/dashboard/my-courses", 
            label: "My Courses", 
            icon: <BookOpen className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/dashboard/certificates", 
            label: "Certificates", 
            icon: <Award className="h-5 w-5 mr-3" /> 
          },
          { 
            href: "/dashboard/discussions", 
            label: "Discussions", 
            icon: <MessageSquare className="h-5 w-5 mr-3" /> 
          },
          ...commonLinks
        ];
    }
  };

  const navLinks = getNavLinks();

  return (
    <aside className="w-64 bg-gray-900 text-white hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-5 border-b border-gray-800">
        <h1 className="text-xl font-bold">EduVerse</h1>
        <p className="text-sm text-gray-400">{currentUser?.role.charAt(0).toUpperCase() + currentUser?.role.slice(1)} Panel</p>
      </div>
      
      <nav className="flex-1 py-6 px-4 overflow-y-auto">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <NavLink
                to={link.href}
                className={({ isActive }) => cn(
                  "flex items-center py-2 px-3 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary text-white" 
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                )}
                end={link.href === "/dashboard" || link.href === "/admin" || link.href === "/instructor"}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <Button 
          variant="ghost" 
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          <span>{t("common.logout")}</span>
        </Button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
