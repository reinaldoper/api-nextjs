
import { useEffect } from "react";
import { AlertProps } from "../types/alertType";

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 8000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`top-10 left-1/2 transform -translate-x-1/2 p-4 rounded-lg shadow-lg transition-all ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {message}
      <button onClick={onClose} className="ml-4 underline">
        Close
      </button>
    </div>
  );
};

export default Alert;
