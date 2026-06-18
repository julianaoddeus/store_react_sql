import { MoreVertical } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

import { api } from "../services/api";
import { useSelector } from "react-redux";
import { selectAuth } from "../store/slices/auth_slice";
import { toast } from "react-toastify";
import type { Enrollments } from "../types";

interface MenuCancelProps {
  enrollment?: Enrollments;
}

export function MenuCancel({ enrollment }: MenuCancelProps) {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useSelector(selectAuth);
  const navigate = useNavigate();

  const unSubscribe = useCallback(async () => {
    if (!enrollment) return;

    if (enrollment.status !== "ATIVO")
      return toast.warn("Inscrição já está cancelada!");

    if (!isAuthenticated) {
      toast.warn("Faça login para prosseguir!");
      navigate("/login");
      return;
    }

    try {
      await api.put(`update/${enrollment?.id}`, {
        status: "CANCELADO",
        cancelledAt: new Date(),
      });

      toast.success("Inscrição cancelada com sucesso!");
    } catch {
      toast.error("Erro ao cancelar inscrição. Tente novamente.");
    }
  }, [enrollment, isAuthenticated, navigate]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="rounded-md p-2 hover:bg-gray-800"
      >
        <MoreVertical size={20} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-md border bg-blue shadow-lg">
          <button
            onClick={unSubscribe}
            className="block w-full px-4 py-2 text-left  hover:bg-gray-800"
          >
            Cancelar inscrição
          </button>
        </div>
      )}
    </div>
  );
}
