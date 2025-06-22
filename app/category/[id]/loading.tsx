export default function Loading() {
  return (
    <div className="container py-8">
      <div className="animate-pulse space-y-6">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center space-x-2">
          <div className="h-4 bg-muted rounded w-12"></div>
          <div className="h-4 bg-muted rounded w-1"></div>
          <div className="h-4 bg-muted rounded w-20"></div>
          <div className="h-4 bg-muted rounded w-1"></div>
          <div className="h-4 bg-muted rounded w-24"></div>
        </div>

        {/* Back button skeleton */}
        <div className="h-9 bg-muted rounded w-32"></div>

        {/* Header skeleton */}
        <div className="space-y-4">
          <div className="h-8 bg-muted rounded w-48"></div>
          <div className="h-4 bg-muted rounded w-96"></div>
          <div className="h-4 bg-muted rounded w-32"></div>
        </div>

        {/* Products grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
