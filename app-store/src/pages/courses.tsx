import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  PartyPopper,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

import CoursesCard from "../_components/CoursesCard";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../store";
import { fetchCourses, selectCourses } from "../store/slices/course-slice";

const CoursesPage = () => {
  const [showSuccess] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-background">
      {items.length > 0 ? (
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {/* Success Banner */}
          {showSuccess && (
            <div className="mb-8 rounded-xl border border-primary/30 bg-primary/10 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary">
                  <PartyPopper className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    Compra realizada com sucesso!
                  </h2>
                  <p className="mt-1 text-muted-foreground">
                    Parabéns! Seus cursos já estão disponíveis. Comece a
                    aprender agora mesmo!
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground">Meus Cursos</h1>
            <p className="mt-2 text-muted-foreground">
              Acompanhe seu progresso e continue aprendendo
            </p>
          </div>

          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground"></p>
                <p className="text-2xl font-bold text-foreground">
                  {" "}
                  {items.length}
                </p>
                <p className="text-sm text-muted-foreground">
                  Cursos adquiridos
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">60</p>
                <p className="text-sm text-muted-foreground">Total de aulas</p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-card p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">70%</p>
                <p className="text-sm text-muted-foreground">
                  Aulas concluídas
                </p>
              </div>
            </div>
          </div>

          {/* Courses List */}
          <CoursesCard courses={items} />
        </main>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-600 mb-2">
              Você ainda não tem cursos
            </h1>
            <p className="text-secondary mb-6">
              Explore nossos cursos e adicione ao seu carrinho.
            </p>
            <Link
              to="/products"
              className="inline-block px-8 py-3 border-2 border-pink-400 text-pink-400 rounded-lg font-medium hover:text-pink-500 hover:border-pink-500 hover:bg-opacity-10  transition-colors"
            >
              Ver cursos disponíeis
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
