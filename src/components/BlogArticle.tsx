import { useEffect } from "react";
import { Button } from "./ui/button";
import { blogArticles } from "../data/blog-articles";
import { BlogLayout } from "./layouts/BlogLayout";

interface BlogArticleProps {
  slug: string;
}

export function BlogArticle({ slug }: BlogArticleProps) {
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4">Статья не найдена</h1>
          <a href="#/blog">
            <Button>Вернуться к блогу</Button>
          </a>
        </div>
      </div>
    );
  }

  return <BlogLayout article={article} />;
}
