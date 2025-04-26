import { useState, useEffect } from "react"

// Default breakpoint matches MUI's 'sm' breakpoint
const DEFAULT_MOBILE_BREAKPOINT = 600

export const useMobile = (breakpoint = DEFAULT_MOBILE_BREAKPOINT) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // Set initial value
    handleResize()

    // Add event listener
    window.addEventListener("resize", handleResize)

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize)
  }, [breakpoint])

  return isMobile
}