
import { Link } from "react-router-dom";
import { Users, Star } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface CourseProps {
  id: string;
  title: string;
  instructor: string;
  coverImage: string;
  rating: number;
  students: number;
  price: number;
  category: string;
  level: string;
  progress?: number; // Optional for enrolled courses
  language?: string; // Optional field for language
}

interface CourseCardProps {
  course: CourseProps;
  showProgress?: boolean;
}

const CourseCard = ({ course, showProgress = false }: CourseCardProps) => {
  const {
    id,
    title,
    instructor,
    coverImage,
    rating,
    students,
    price,
    category,
    level,
    progress,
    language
  } = course;

  return (
    <Link to={`/courses/${id}`}>
      <Card className="h-full overflow-hidden course-card">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            <Badge variant="secondary" className="bg-black/70 text-white">
              {level}
            </Badge>
            {language && (
              <Badge variant="secondary" className="bg-black/70 text-white">
                {language}
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <Badge className="mb-2">{category}</Badge>
            <h3 className="font-semibold text-lg line-clamp-2">{title}</h3>
            <p className="text-sm text-muted-foreground">{instructor}</p>
            
            <div className="flex items-center text-sm">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" fill="currentColor" />
                <span>{rating.toFixed(1)}</span>
              </div>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{students.toLocaleString()} students</span>
              </div>
            </div>

            {showProgress && progress !== undefined && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="font-bold text-lg">
            ${price.toFixed(2)}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
