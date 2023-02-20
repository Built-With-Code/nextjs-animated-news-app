import { GetServerSideProps, NextPage } from "next";
import React, { useEffect, useState } from "react";
import { Article } from "../../models";
import ArticlePreviewSkeleton from "../../components/ArticlePreviewSkeleton";
import ArticlePreview from "../../components/ArticlePreview";

interface Props {
  articles: Article[];
}

const CategoryPage: NextPage<Props> = ({ articles }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <main className="container lg:max-w-[70%] mx-auto">
      {isLoading ? (
        <div key="loading">
          <ArticlePreviewSkeleton />
          <ArticlePreviewSkeleton />
          <ArticlePreviewSkeleton />
        </div>
      ) : (
        <div key="loaded">
          {articles.map((article, idx) => (
            <ArticlePreview article={article} idx={idx} />
          ))}
        </div>
      )}
    </main>
  );
};

type Data = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const categoryId = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`);
  const data: Data = await res.json();
  const articles = data.articles;

  const categoryArticles = articles.filter(
    (article) => article.category == categoryId
  );

  return {
    props: { articles: categoryArticles },
  };
};

export default CategoryPage;
