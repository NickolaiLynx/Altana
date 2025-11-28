import { PageHero } from "./common/PageHero";
import { BlogCard } from "./common/BlogCard";
import { blogArticles } from "../data/blog-articles";

export function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 relative" style={{ zIndex: 2 }}>
      {/* Hero Section */}
      <PageHero
        breadcrumbs={[
          { label: "Главная", href: "#/" },
          { label: "Блог" }
        ]}
        title="Блог"
        description="Практические материалы и экспертные советы по подбору персонала, кадровому аудиту и миграционному учету в горнодобывающей отрасли"
      />

      {/* Articles Grid */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogArticles.map((article) => (
              <BlogCard
                key={article.slug}
                slug={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                image={article.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}