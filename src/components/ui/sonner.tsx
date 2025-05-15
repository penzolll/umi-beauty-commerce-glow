
import { useTheme } from "next-themes"
import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

// Kustomisasi toast dalam Bahasa Indonesia
const customToast = {
  ...toast,
  sukses: (message: string, options?: any) => toast.success(message, options),
  error: (message: string, options?: any) => toast.error(message, options),
  peringatan: (message: string, options?: any) => toast.warning(message, options),
  informasi: (message: string, options?: any) => toast.info(message, options),
}

export { Toaster, customToast as toast }
