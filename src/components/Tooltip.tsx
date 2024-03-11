import React, { useState, useRef, useEffect } from "react"

interface TooltipProps {
  text: string
  delay?: number
  children: React.ReactNode
}

const Tooltip: React.FC<TooltipProps> = ({ text, delay = 800, children }) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const timerRef = useRef<number | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    timerRef.current = window.setTimeout(() => {
      setIsHovered(true)
      setIsVisible(true)
    }, delay)
  }

  const handleMouseLeave = () => {
    clearTimeout(timerRef.current!)
    setIsHovered(false)
    setIsVisible(false)
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isVisible && (
        <div
          ref={tooltipRef}
          className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded shadow-lg"
        >
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
