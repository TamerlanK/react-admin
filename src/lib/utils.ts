import { clsx, type ClassValue } from "clsx"
import Swal from "sweetalert2"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type NotificationType = "error" | "success"

export const notify = (message: string, type: NotificationType) => {
  switch (type) {
    case "success":
      Swal.fire("Success!", message, "success")
      break
    case "error":
      Swal.fire("Error!", message, "error")
      break
    default:
      Swal.fire("Notification", message, "info")
  }
}
