import clsx from "clsx";
import { useState } from "react";
import ThemedText from "../typography";

interface ActionModalProps {
  children: React.ReactNode;
  type?: "info" | "success" | "warning" | "danger";
  visible?: boolean;
  title: string;
  accept_action: () => void; // Action à exécuter lors de l'acceptation
  refuse_action?: () => void; // Action à exécuter lors du refus
  refuse_placeholder: string;
  accept_placeholder: string;
}

const ActionModal = ({
  children,
  type = "info",
  visible = true,
  title,
  accept_action,
  refuse_action,
  refuse_placeholder,
  accept_placeholder,
}: ActionModalProps) => {
  const [isVisible, setIsVisible] = useState(visible);

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
  
  // Fermer le modal en cas de refus
  const handleRefuse = () => {
    setIsVisible(false);
    if (refuse_action) {
      refuse_action();
    }
  };

  if (!isVisible) return null;

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

        {/* Boutons */}
        <div className="px-2 flex flex-row justify-between gap-10 items-center">
          <button
            className="px-[20px] py-[10px] text-small-button rounded text-dark font-semibold bg-gray-soft"
            onClick={handleRefuse}
          >
            {refuse_placeholder}
          </button>
          <button
            className={clsx(
              "px-[20px] py-[10px] text-small-button rounded font-semibold text-white",
              color
            )}
            onClick={accept_action}
          >
            {accept_placeholder}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionModal;
