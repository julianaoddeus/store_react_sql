import { memo } from "react";
import { Link } from "react-router";
import type { Courses } from "../../types";

interface CourseCardProps {
  course: Courses;
}

function CourseCardComponent({ course }: CourseCardProps) {
  return (
    <div className="bg-gray-700 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
      <Link
        to={`/courses/${course.id}`}
        className="block relative aspect-square overflow-hidden"
      >
        <img
          src={course.imageURL}
          alt={course.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "NOT FOUND";
          }}
        />
      </Link>

      <div className="p-4">
        <Link to={`/courses/${course.id}`}>
          <h3 className="text-lg font-semibold text-pink-700 hover:text-primary transition-colors line-clamp-1">
            {course.name}
          </h3>
        </Link>
        <p className="text-secondary text-sm mt-1 line-clamp-2">
          {course.description}
        </p>
        <div className="text-primary hover:text-primary text-sm mt-1 line-clamp-2 mb-6">
          início do curso:{" "}
          {new Date(course.startDate).toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </div>
      </div>
    </div>
  );
}

export const CourseCard = memo(CourseCardComponent, (prevProps, nextProps) => {
  return (
    prevProps.course.id === nextProps.course.id &&
    prevProps.course.startDate === nextProps.course.startDate
  );
});

export default CourseCard;
