import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container py-12">
      <div className="max-w-md mx-auto text-center space-y-6">
        <AlertCircle className="h-16 w-16 mx-auto text-muted-foreground" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Category Not Found</h1>
          <p className="text-muted-foreground">
            The category you're looking for doesn't exist or may have been removed.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/categories">
            <Button>Browse Categories</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
