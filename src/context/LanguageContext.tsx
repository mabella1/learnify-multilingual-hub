
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

// Basic translations
const translations = {
  en: {
    "common.home": "Home",
    "common.courses": "Courses",
    "common.login": "Login",
    "common.register": "Register",
    "common.logout": "Logout",
    "common.profile": "Profile",
    "common.dashboard": "Dashboard",
    "common.search": "Search",
    "common.language": "Language",
    "home.hero.title": "Learn Without Limits",
    "home.hero.subtitle": "Access world-class education with expert instructors on any device, anywhere",
    "home.hero.cta": "Browse Courses",
    "home.featured": "Featured Courses",
    "home.categories": "Popular Categories",
    "home.instructors": "Top Instructors",
    "home.testimonials": "What Our Students Say",
    "home.join": "Join Our Learning Community",
    "course.enroll": "Enroll Now",
    "course.preview": "Preview",
    "course.reviews": "Reviews",
    "course.curriculum": "Curriculum",
    "course.requirements": "Requirements",
    "course.instructor": "Instructor",
    "dashboard.welcome": "Welcome to your dashboard",
    "dashboard.progress": "Your Progress",
    "dashboard.courses": "Your Courses",
    "dashboard.achievements": "Achievements",
    "login.title": "Welcome Back",
    "login.email": "Email Address",
    "login.password": "Password",
    "login.submit": "Sign In",
    "login.forgot": "Forgot Password?",
    "login.register": "Don't have an account? Register",
    "register.title": "Create an Account",
    "register.name": "Full Name",
    "register.email": "Email Address",
    "register.password": "Password",
    "register.confirm": "Confirm Password",
    "register.submit": "Create Account",
    "register.login": "Already have an account? Login",
  },
  fr: {
    "common.home": "Accueil",
    "common.courses": "Cours",
    "common.login": "Connexion",
    "common.register": "S'inscrire",
    "common.logout": "Déconnexion",
    "common.profile": "Profil",
    "common.dashboard": "Tableau de bord",
    "common.search": "Rechercher",
    "common.language": "Langue",
    "home.hero.title": "Apprenez Sans Limites",
    "home.hero.subtitle": "Accédez à une éducation de classe mondiale avec des instructeurs experts sur n'importe quel appareil, n'importe où",
    "home.hero.cta": "Parcourir les cours",
    "home.featured": "Cours en vedette",
    "home.categories": "Catégories populaires",
    "home.instructors": "Meilleurs instructeurs",
    "home.testimonials": "Ce que disent nos étudiants",
    "home.join": "Rejoignez notre communauté d'apprentissage",
    "course.enroll": "S'inscrire maintenant",
    "course.preview": "Aperçu",
    "course.reviews": "Avis",
    "course.curriculum": "Programme",
    "course.requirements": "Prérequis",
    "course.instructor": "Instructeur",
    "dashboard.welcome": "Bienvenue sur votre tableau de bord",
    "dashboard.progress": "Votre progression",
    "dashboard.courses": "Vos cours",
    "dashboard.achievements": "Réalisations",
    "login.title": "Bienvenue à nouveau",
    "login.email": "Adresse email",
    "login.password": "Mot de passe",
    "login.submit": "Se connecter",
    "login.forgot": "Mot de passe oublié?",
    "login.register": "Vous n'avez pas de compte? S'inscrire",
    "register.title": "Créer un compte",
    "register.name": "Nom complet",
    "register.email": "Adresse email",
    "register.password": "Mot de passe",
    "register.confirm": "Confirmer le mot de passe",
    "register.submit": "Créer un compte",
    "register.login": "Vous avez déjà un compte? Se connecter",
  },
  ar: {
    "common.home": "الرئيسية",
    "common.courses": "الدورات",
    "common.login": "تسجيل الدخول",
    "common.register": "التسجيل",
    "common.logout": "تسجيل الخروج",
    "common.profile": "الملف الشخصي",
    "common.dashboard": "لوحة التحكم",
    "common.search": "بحث",
    "common.language": "اللغة",
    "home.hero.title": "تعلم بلا حدود",
    "home.hero.subtitle": "الوصول إلى تعليم عالمي المستوى مع مدربين خبراء على أي جهاز، في أي مكان",
    "home.hero.cta": "تصفح الدورات",
    "home.featured": "دورات مميزة",
    "home.categories": "الفئات الشائعة",
    "home.instructors": "أفضل المدربين",
    "home.testimonials": "ماذا يقول طلابنا",
    "home.join": "انضم إلى مجتمع التعلم لدينا",
    "course.enroll": "سجل الآن",
    "course.preview": "معاينة",
    "course.reviews": "المراجعات",
    "course.curriculum": "المنهج",
    "course.requirements": "المتطلبات",
    "course.instructor": "المدرب",
    "dashboard.welcome": "مرحبًا بك في لوحة التحكم الخاصة بك",
    "dashboard.progress": "تقدمك",
    "dashboard.courses": "دوراتك",
    "dashboard.achievements": "الإنجازات",
    "login.title": "مرحبًا بعودتك",
    "login.email": "البريد الإلكتروني",
    "login.password": "كلمة المرور",
    "login.submit": "تسجيل الدخول",
    "login.forgot": "نسيت كلمة المرور؟",
    "login.register": "ليس لديك حساب؟ سجل",
    "register.title": "إنشاء حساب",
    "register.name": "الاسم الكامل",
    "register.email": "البريد الإلكتروني",
    "register.password": "كلمة المرور",
    "register.confirm": "تأكيد كلمة المرور",
    "register.submit": "إنشاء حساب",
    "register.login": "لديك حساب بالفعل؟ تسجيل الدخول",
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get language from localStorage
    const savedLanguage = localStorage.getItem("language") as Language;
    return savedLanguage || "en";
  });

  useEffect(() => {
    // Save language to localStorage
    localStorage.setItem("language", language);
    
    // Update document dir attribute for RTL languages
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  
  return context;
};
