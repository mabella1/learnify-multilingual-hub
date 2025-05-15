
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Define form validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast({
        title: "Login successful",
        description: "Welcome back to EduVerse!",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Demo account logins
  const loginAs = async (role: "student" | "instructor" | "admin") => {
    setIsLoading(true);
    try {
      const accounts = {
        student: { email: "student@example.com", password: "password123" },
        instructor: { email: "instructor@example.com", password: "password123" },
        admin: { email: "admin@example.com", password: "password123" },
      };
      
      const { email, password } = accounts[role];
      
      await login(email, password);
      
      toast({
        title: "Demo login successful",
        description: `You are now logged in as a ${role}.`,
      });
      
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "instructor") {
        navigate("/instructor");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Demo login error:", error);
      toast({
        title: "Login failed",
        description: "Something went wrong with the demo login.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">{t("login.title")}</h1>
              <p className="text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            <Tabs defaultValue="form" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="form">Login Form</TabsTrigger>
                <TabsTrigger value="demo">Demo Accounts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="form" className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("login.email")}</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="your.email@example.com" 
                              type="email" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>{t("login.password")}</FormLabel>
                            <Link 
                              to="/forgot-password" 
                              className="text-sm text-primary hover:underline"
                            >
                              {t("login.forgot")}
                            </Link>
                          </div>
                          <FormControl>
                            <Input 
                              placeholder="********" 
                              type="password" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? "Logging in..." : t("login.submit")}
                    </Button>
                  </form>
                </Form>
                
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">
                    {t("login.register")} <Link to="/register" className="text-primary hover:underline">Register</Link>
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="demo" className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-sm">Try the platform with these demo accounts:</p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-3" 
                  onClick={() => loginAs("student")}
                  disabled={isLoading}
                >
                  Login as Student
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full mb-3" 
                  onClick={() => loginAs("instructor")}
                  disabled={isLoading}
                >
                  Login as Instructor
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => loginAs("admin")}
                  disabled={isLoading}
                >
                  Login as Admin
                </Button>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="text-center mt-6">
            <Link to="/" className="text-primary hover:underline">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
