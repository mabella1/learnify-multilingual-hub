import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown, User, LogOut, BookOpen, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Determine which dashboard to navigate to based on user role
  const getDashboardUrl = () => {
    if (!currentUser) return "/dashboard";
    
    switch(currentUser.role) {
      case "admin":
        return "/admin";
      case "instructor":
        return "/instructor";
      default:
        return "/dashboard";
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/06319f5f-4518-41dc-b801-8e4b4f24ab10.png" 
                alt="KnowledgeHub Logo" 
                className="h-10 w-10 mr-2" 
              />
              <span className="text-2xl font-bold text-primary">KnowledgeHub</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              {t("common.home")}
            </Link>
            <Link to="/courses" className="text-foreground hover:text-primary transition-colors">
              {t("common.courses")}
            </Link>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder={t("common.search")}
                className="w-64 pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </form>
          </nav>

          {/* Right side - Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium">{currentUser?.name}</p>
                      <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={getDashboardUrl()} className="cursor-pointer w-full flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      <span>{t("common.dashboard")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard/profile" className="cursor-pointer w-full flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("common.profile")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("common.logout")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" asChild>
                  <Link to="/login">{t("common.login")}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t("common.register")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-foreground">
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <form onSubmit={handleSearch} className="relative mb-4">
              <Input
                type="search"
                placeholder={t("common.search")}
                className="w-full pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </form>
            
            <Link 
              to="/" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("common.home")}
            </Link>
            <Link 
              to="/courses" 
              className="block py-2 text-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              {t("common.courses")}
            </Link>
            
            <div className="border-t pt-4">
              {isAuthenticated ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
                      <AvatarFallback>{currentUser?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{currentUser?.name}</p>
                      <p className="text-sm text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </div>
                  
                  <Link 
                    to={getDashboardUrl()}
                    className="block py-2 text-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("common.dashboard")}
                  </Link>
                  <Link 
                    to="/dashboard/profile" 
                    className="block py-2 text-foreground hover:text-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("common.profile")}
                  </Link>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }} 
                    className="block w-full text-left py-2 text-foreground hover:text-primary"
                  >
                    {t("common.logout")}
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Button asChild variant="outline">
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                      {t("common.login")}
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                      {t("common.register")}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
            
            <div className="border-t pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
