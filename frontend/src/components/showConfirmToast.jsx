import toast from "react-hot-toast";
import { AlertCircle, Check, X } from "lucide-react";

const showConfirmToast = ({ message, onConfirm }) => {
  toast((t) => (
    <div className="flex flex-col gap-3">

      {/* Message */}
      <div className="flex gap-2 items-start">
        <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
        <span className="text-sm">
          {message}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 justify-end">
        <button
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm?.();
          }}
          className="flex items-center gap-1 text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-3 py-1.5"
        >
          <Check className="w-4 h-4" />
          Confirm
        </button>

        <button
          onClick={() => toast.dismiss(t.id)}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-50 px-3 py-1.5"
        >
          <X className="w-4 h-4" />
          Dismiss
        </button>
      </div>

    </div>
  ));
};

export default showConfirmToast;