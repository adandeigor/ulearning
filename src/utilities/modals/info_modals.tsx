import clsx from "clsx";
import { useEffect, useState } from "react";
import ThemedText from "../typography";

interface InfoModalsProps {
  children: React.ReactNode;
  type?: "info" | "success" | "warning" | "danger";
  title: string;
  duration?: number; // Durée en secondes (par défaut : 4)
}

const InfoModals = ({
  children,
  type = "info",
  title,
  duration = 4,
}: InfoModalsProps) => {
  const [progressClass, setProgressClass] = useState<string>("w-full");
  const [visible, setVisible] = useState(true);

  // Détermine la couleur en fonction du type
  const color = {
    info: "bg-primary",
    success: "bg-green",
    warning: "bg-yellow",
    danger: "bg-red",
  }[type] || "bg-primary";
  const TextColor = {
    info: "text-primary",
    success: "text-green",
    warning: "text-yellow",
    danger: "text-red",
  }[type] || "text-primary";
  

  // Barre de progression et fermeture automatique
  useEffect(() => {
    const progressTimeout = setTimeout(() => {
      setProgressClass("w-0");
    }, 100);

    const autoHideTimeout = setTimeout(() => {
      setVisible(false);
    }, duration * 1000);

    return () => {
      clearTimeout(progressTimeout);
      clearTimeout(autoHideTimeout);
    };
  }, [duration]);

  if (!visible) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 flex justify-center items-center transition-opacity backdrop-blur-sm"
      )}
    >
      {/* Le modal lui-même */}
      <div
        className={clsx(
          "relative px-[20px] py-[15px] max-w-[327px] bg-white rounded shadow-lg flex flex-col justify-center items-center gap-5"
        )}
      >
        {/* Barre de progression */}
        <div
          className={clsx(
            "absolute top-0 left-0 h-2 rounded-t transition-all duration-[4000ms] ease-linear",
            progressClass,
            color
          )}
          style={{ transitionDuration: `${duration * 1000}ms` }}
        ></div>

        {/* Titre */}
        <ThemedText
          variant="title"
          weight="semibold"
          className={clsx("text-center font-semibold", TextColor)}
        >
          {title}
        </ThemedText>

        {/* Contenu */}
        <ThemedText
          variant="small-text"
          weight="semibold"
          className="text-center text-dark"
        >
          {children}
        </ThemedText>
      </div>
    </div>
  );
};

export default InfoModals;
