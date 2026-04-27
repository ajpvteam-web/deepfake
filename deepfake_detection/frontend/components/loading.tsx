'use client'

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent opacity-50 animate-spin animation-delay-100" style={{ animationDirection: 'reverse', animationDelay: '0.1s' }}></div>
      </div>
    </div>
  )
}

export function PageLoadingAnimation() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  )
}

export function SkeletonLoader() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-12 bg-secondary rounded-lg w-3/4"></div>
      <div className="h-4 bg-secondary rounded-lg"></div>
      <div className="h-4 bg-secondary rounded-lg w-5/6"></div>
      <div className="h-4 bg-secondary rounded-lg w-4/6"></div>
    </div>
  )
}

export function CardSkeleton() {
  return (
    <div className="p-4 border border-border rounded-lg animate-pulse space-y-4">
      <div className="h-6 bg-secondary rounded-lg w-1/2"></div>
      <div className="space-y-2">
        <div className="h-4 bg-secondary rounded-lg"></div>
        <div className="h-4 bg-secondary rounded-lg w-5/6"></div>
      </div>
    </div>
  )
}