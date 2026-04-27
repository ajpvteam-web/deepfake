'use client'

import { ReactNode } from 'react'
import { useScrollAnimation } from '@/hooks/use-scroll-animation'

interface ScrollAnimatedElementProps {
  children: ReactNode
  animation?: 'fade-in' | 'slide-in-left' | 'slide-in-right'
  className?: string
  delay?: number
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function ScrollAnimatedElement({
  children,
  animation = 'fade-in',
  className = '',
  delay = 0,
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true,
}: ScrollAnimatedElementProps) {
  const { ref, isVisible } = useScrollAnimation({
    threshold,
    rootMargin,
    triggerOnce,
  })

  const animationClass = `scroll-animate-${animation}`
  const visibleClass = isVisible ? 'visible' : ''

  return (
    <div
      ref={ref}
      className={`${animationClass} ${visibleClass} ${className}`}
      style={{
        animationDelay: delay ? `${delay}s` : undefined,
        ...((delay || !isVisible) && { transition: 'none' }),
      }}
    >
      {children}
    </div>
  )
}
