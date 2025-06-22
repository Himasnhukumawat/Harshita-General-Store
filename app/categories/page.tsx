import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getCategories } from "@/lib/firebase-service"

export default async function CategoriesPage() {
  const categories = await getCategories()

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Categories</h1>
          <p className="text-muted-foreground">Browse our products by category to find exactly what you need.</p>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No categories available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link key={category.id} href={`/category/${category.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {category.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">{category.description}</p>
                    )}
                    {category.subCategories && category.subCategories.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-medium text-muted-foreground mb-2">Subcategories:</p>
                        <div className="flex flex-wrap gap-1">
                          {category.subCategories.slice(0, 3).map((sub) => (
                            <span key={sub.id} className="text-xs bg-muted px-2 py-1 rounded">
                              {sub.name}
                            </span>
                          ))}
                          {category.subCategories.length > 3 && (
                            <span className="text-xs text-muted-foreground">
                              +{category.subCategories.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
