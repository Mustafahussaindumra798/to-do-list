import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import type { HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface LazyImageProps extends HTMLMotionProps<"img"> {
  src: string
  alt: string
  className?: string
  placeholderColor?: string
}

export function LazyImage({ src, alt, className, placeholderColor = "bg-bg-secondary", ...props }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentSrc, setCurrentSrc] = useState<string | null>(null)

  useEffect(() => {
    // Start loading the image
    const img = new Image()
    img.src = src
    img.onload = () => {
      setCurrentSrc(src)
      setIsLoaded(true)
    }
  }, [src])

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Placeholder with blur effect */}
      <div 
        className={cn(
          "absolute inset-0 w-full h-full transition-opacity duration-700 ease-out z-0",
          placeholderColor,
          isLoaded ? "opacity-0" : "opacity-100 animate-pulse"
        )} 
      />
      
      {/* Actual Image */}
      {currentSrc && (
        <motion.img
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ 
            opacity: isLoaded ? 1 : 0,
            filter: isLoaded ? "blur(0px)" : "blur(10px)"
          }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          src={currentSrc}
          alt={alt}
          className={cn("w-full h-full object-cover relative z-10", className)}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  )
}
