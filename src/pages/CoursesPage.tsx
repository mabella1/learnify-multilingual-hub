
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Filter, Search, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses, categories } from "@/data/mockData";

const CoursesPage = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLevels, setSelectedLevels] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("popular");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // Initialize filters from URL
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
      setActiveFilters(prev => [...prev, `Category: ${categoryParam}`]);
    }
    
    const searchParam = searchParams.get("search");
    if (searchParam) {
      setSearchQuery(searchParam);
      setActiveFilters(prev => [...prev, `Search: ${searchParam}`]);
    }
  }, []);

  // Filter courses
  useEffect(() => {
    let results = [...mockCourses];
    
    // Filter by search query
    if (searchQuery) {
      results = results.filter(course => 
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.instructor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by categories
    if (selectedCategories.length > 0) {
      results = results.filter(course => 
        selectedCategories.includes(course.category)
      );
    }
    
    // Filter by levels
    if (selectedLevels.length > 0) {
      results = results.filter(course => 
        selectedLevels.includes(course.level)
      );
    }
    
    // Filter by languages
    if (selectedLanguages.length > 0) {
      results = results.filter(course => 
        course.language && selectedLanguages.includes(course.language)
      );
    }
    
    // Sort courses
    if (sortBy === "popular") {
      results.sort((a, b) => b.students - a.students);
    } else if (sortBy === "highest-rated") {
      results.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "newest") {
      // In a real app, you would sort by creation date
      results.sort((a, b) => parseInt(b.id) - parseInt(a.id));
    } else if (sortBy === "price-low") {
      results.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      results.sort((a, b) => b.price - a.price);
    }
    
    setFilteredCourses(results);
    
    // Update URL params
    const params = new URLSearchParams();
    if (searchQuery) params.set("search", searchQuery);
    if (selectedCategories.length === 1) params.set("category", selectedCategories[0]);
    setSearchParams(params);
  }, [searchQuery, selectedCategories, selectedLevels, selectedLanguages, sortBy]);

  // Update active filters
  useEffect(() => {
    const filters: string[] = [];
    
    if (searchQuery) {
      filters.push(`Search: ${searchQuery}`);
    }
    
    selectedCategories.forEach(category => {
      filters.push(`Category: ${category}`);
    });
    
    selectedLevels.forEach(level => {
      filters.push(`Level: ${level}`);
    });
    
    selectedLanguages.forEach(language => {
      filters.push(`Language: ${language}`);
    });
    
    setActiveFilters(filters);
  }, [searchQuery, selectedCategories, selectedLevels, selectedLanguages]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleLevelChange = (level: string) => {
    setSelectedLevels(prev => 
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguages(prev => 
      prev.includes(language)
        ? prev.filter(l => l !== language)
        : [...prev, language]
    );
  };

  const removeFilter = (filter: string) => {
    const [type, value] = filter.split(": ");
    
    if (type === "Search") {
      setSearchQuery("");
    } else if (type === "Category") {
      setSelectedCategories(prev => prev.filter(c => c !== value));
    } else if (type === "Level") {
      setSelectedLevels(prev => prev.filter(l => l !== value));
    } else if (type === "Language") {
      setSelectedLanguages(prev => prev.filter(l => l !== value));
    }
  };

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLevels([]);
    setSelectedLanguages([]);
    setActiveFilters([]);
    setSearchParams({});
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{t("common.courses")}</h1>
          <p className="text-muted-foreground">Discover top courses to enhance your skills</p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <form onSubmit={handleSearch} className="relative w-full sm:max-w-md">
            <Input
              type="search"
              placeholder={t("common.search")}
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </form>

          <div className="flex gap-2">
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="highest-rated">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Narrow down courses to find exactly what you're looking for.
                  </SheetDescription>
                </SheetHeader>
                
                <div className="py-6 space-y-6">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="categories">
                      <AccordionTrigger>Categories</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 mt-2">
                          {categories.map(category => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.name)}
                                onCheckedChange={() => handleCategoryChange(category.name)}
                              />
                              <label 
                                htmlFor={`category-${category.id}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {category.name} ({category.count})
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="levels">
                      <AccordionTrigger>Level</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 mt-2">
                          {["Beginner", "Intermediate", "Advanced"].map(level => (
                            <div key={level} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`level-${level}`}
                                checked={selectedLevels.includes(level)}
                                onCheckedChange={() => handleLevelChange(level)}
                              />
                              <label 
                                htmlFor={`level-${level}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {level}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="languages">
                      <AccordionTrigger>Language</AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2 mt-2">
                          {["English", "French", "Arabic"].map(language => (
                            <div key={language} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`language-${language}`}
                                checked={selectedLanguages.includes(language)}
                                onCheckedChange={() => handleLanguageChange(language)}
                              />
                              <label 
                                htmlFor={`language-${language}`}
                                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {language}
                              </label>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-sm font-medium">Active filters:</span>
            {activeFilters.map((filter) => (
              <Badge key={filter} variant="secondary" className="flex items-center gap-1">
                {filter}
                <X 
                  className="h-3 w-3 cursor-pointer" 
                  onClick={() => removeFilter(filter)}
                />
              </Badge>
            ))}
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-sm"
              onClick={clearAllFilters}
            >
              Clear all
            </Button>
          </div>
        )}

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <h3 className="text-lg font-medium mb-2">No courses found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
              <Button onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
