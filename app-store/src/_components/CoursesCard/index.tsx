import { memo } from "react";

import type { Course } from "../../types";

import { generateImageURL } from "../../lib/utils/generate-image-url";
import { PlayCircle } from "lucide-react";

interface CourseProps {
  courses: Course[];
}

function CoursesCardComponent({ courses }: CourseProps) {
  const progress = 65; // %

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-4 py-6">
      {courses.map((course) => (
        <div
          key={course.product.documentId}
          className="group flex flex-col bg-gray-900 rounded-xl overflow-hidden hover:bg-gray-800 transition-colors duration-200"
        >
          {/* Thumbnail */}
          <div className="relative w-full aspect-video overflow-hidden bg-gray-800">
            <img
              src={generateImageURL(course.product.image?.url)}
              alt={course.product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://via.placeholder.com/480x270?text=Sem+Imagem";
              }}
            />

            {/* Overlay escuro */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Ícone de Play */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pink-700 flex items-center justify-center text-white text-sm font-bold">
                ▶
              </div>
            </div>
            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-semibold px-2 py-0.5 rounded">
              30 aulas | duração: 2:30
            </div>
          </div>
          <div className="w-full h-1 bg-gray-700 rounded overflow-hidden">
            <div
              className="h-full bg-red-500 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Info */}
          <div className="flex gap-3 p-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-pink-700 flex items-center justify-center text-white text-sm font-bold">
              <PlayCircle color="pink" />
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug group-hover:text-pink-400 transition-colors">
                {course.product.title}
              </h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export const CourseCard = memo(CoursesCardComponent, (prevProps, nextProps) => {
  return prevProps.courses === nextProps.courses;
});

export default CourseCard;
