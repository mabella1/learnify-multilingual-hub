
import { Link } from "react-router-dom";
import { Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
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
  progress?: number;
  language?: string;
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
    <Link to={`/courses/${id}`} className="group">
      <Card className="h-full overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-200 group-hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          {showProgress && progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <Progress value={progress} className="h-1 bg-gray-300" />
              <div className="text-white text-xs mt-1">{progress}% complete</div>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-2">
            <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors leading-tight">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{instructor}</p>
            
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center">
                <span className="text-orange-500 font-semibold mr-1">{rating.toFixed(1)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-3 w-3 ${i < Math.floor(rating) ? 'text-orange-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
              </div>
              <span className="text-gray-500">({students.toLocaleString()})</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="font-bold text-lg text-gray-900">
                ${price.toFixed(2)}
              </div>
              <div className="flex gap-1">
                <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-200">
                  {level}
                </Badge>
                {language && (
                  <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                    {language}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CourseCard;
