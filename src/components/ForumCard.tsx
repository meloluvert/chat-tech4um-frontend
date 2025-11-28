import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { LoginModal } from "@/components/LoginModal";
import { useState } from "react";
import { formatDateBR } from "@/lib/utils";

export function ForumCard({
  id,
  title,
  description,
  author,
  createdAt,
  size = "lg",       
  highlight = false, 
}: any) {
  const { user } = useAuth();
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const sizeStyle =
    size === "lg"
      ? "md:col-span-2 row-span-2"
      : size === "md"
      ? "md:col-span-2"
      : "md:col-span-1";

  const date = createdAt ? formatDateBR(createdAt) : null;
  const creator = author?.username ?? "Desconhecido";

  const handleForumClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault(); 
      setShowLoginModal(true); 
      return;
    }
  };

  const handleLoginSuccess = () => {
    router.push(`/forum/${id}`); 
  };

  return (
    <>
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
        forumId={id}
      />
      
      <div className={`
        md:col-span-2
        col-span-4
        lg:col-span-1
        group/card
        bg-white dark:bg-gray-900 
        border border-gray-200/50 dark:border-gray-800/50
        rounded-2xl p-6 
        shadow-sm hover:shadow-lg
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/80 dark:hover:bg-gray-800/70
        hover:shadow-blue-500/10 dark:hover:shadow-blue-950/20
        backdrop-blur-sm
      `}>
        <Link 
          href={`/forum/${id}`}
          onClick={handleForumClick}
          className="block h-full"
        >
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-3">
              {highlight && (
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-semibold bg-orange-100/80 dark:bg-orange-900/30 text-[#EB520E] border border-orange-200/50 dark:border-orange-800/50">
                  Tópico em destaque!
                </span>
              )}

              <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors line-clamp-2">
                {title}
              </h2>

              <p className="text-sm text-gray-600 dark:text-gray-400 ">
                {description}
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-6 pt-6 border-t border-gray-100/50 dark:border-gray-800/50">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                  Criado por: {creator}
                </span>
              </div>

              {date && (
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {date}
                </span>
              )}
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}