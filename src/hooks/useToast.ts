import { toast, ToastPosition } from "react-hot-toast";
import { useRef } from "react";

interface ToastOptions {
  style?: React.CSSProperties;
  duration?: number;
  position?: ToastPosition | undefined;
}

const useDisplayToast = () => {
  const toastIdRef = useRef<string | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" | "loading" = "success",
    options: Partial<ToastOptions> = {}
  ) => {
    if (toastIdRef.current) {
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }

    const toastOptions: ToastOptions = {
      position: "top-right",
      style: {
        color: "#fff",
        padding: "1rem",
        zIndex: 1,
        background: "#333",
      },
      ...options,
    };

    // Set background color based on type of toast
    switch (type) {
      case "success":
        toastOptions.style = {
          ...toastOptions.style,
          background: "#00c851",
        };
        break;
      case "error":
        toastOptions.style = {
          ...toastOptions.style,
          background: "#ff3547",
        };
        break;
      case "loading":
        toastOptions.style = {
          ...toastOptions.style,
          background: "#007bff",
        };
        break;
      default:
        break;
    }

    // Show the new toast and store its ID in the ref
    switch (type) {
      case "success":
        toastIdRef.current = toast.success(message, toastOptions);
        break;
      case "error":
        toastIdRef.current = toast.error(message, toastOptions);
        break;
      case "loading":
        toastIdRef.current = toast.loading(message, toastOptions);
        break;
      default:
        toastIdRef.current = toast.success(message, toastOptions);
        break;
    }
  };

  const hideToast = () => {
    if (toastIdRef.current) {
      // Dismiss the current toast and reset the ref
      toast.dismiss(toastIdRef.current);
      toastIdRef.current = null;
    }
  };

  return { showToast, hideToast };
};

export default useDisplayToast;
