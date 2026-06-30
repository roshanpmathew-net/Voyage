import { useTheme } from "@/context/ThemeContext"
import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white/90 group-[.toaster]:dark:bg-slate-900/90 group-[.toaster]:text-slate-800 group-[.toaster]:dark:text-slate-100 group-[.toaster]:border-gray-150 group-[.toaster]:dark:border-slate-800/80 group-[.toaster]:shadow-lg group-[.toaster]:backdrop-blur-md group-[.toaster]:rounded-2xl group-[.toaster]:p-4 group-[.toaster]:font-sans",
          description:
            "group-[.toast]:text-slate-500 group-[.toast]:dark:text-slate-400 text-xs",
          actionButton:"group-[.toast]:bg-blue-600 group-[.toast]:text-white group-[.toast]:hover:bg-blue-700 group-[.toast]:font-semibold group-[.toast]:rounded-xl",
          cancelButton:
            "group-[.toast]:bg-gray-100 group-[.toast]:dark:bg-slate-800 group-[.toast]:text-slate-800 group-[.toast]:dark:text-slate-200 group-[.toast]:rounded-xl",
          success:
            "group-[.toaster]:border-green-500/20 group-[.toaster]:dark:border-green-500/10 group-[.toaster]:bg-green-50/90 group-[.toaster]:dark:bg-green-950/10 group-[.toaster]:text-green-800 group-[.toaster]:dark:text-green-200",
          error:
            "group-[.toaster]:border-red-500/20 group-[.toaster]:dark:border-red-500/10 group-[.toaster]:bg-red-50/90 group-[.toaster]:dark:bg-red-950/10 group-[.toaster]:text-red-800 group-[.toaster]:dark:text-red-200",
          warning:
            "group-[.toaster]:border-amber-500/20 group-[.toaster]:dark:border-amber-500/10 group-[.toaster]:bg-amber-50/90 group-[.toaster]:dark:bg-amber-950/10 group-[.toaster]:text-amber-800 group-[.toaster]:dark:text-amber-200",
          info:
            "group-[.toaster]:border-blue-500/20 group-[.toaster]:dark:border-blue-500/10 group-[.toaster]:bg-blue-50/90 group-[.toaster]:dark:bg-blue-950/10 group-[.toaster]:text-blue-800 group-[.toaster]:dark:text-blue-200",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
