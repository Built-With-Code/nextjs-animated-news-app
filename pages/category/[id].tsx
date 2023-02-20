import { AnimatePresence, motion } from "framer-motion";
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
    <motion.main
      className="container lg:max-w-[70%] mx-auto"
      exit={{ opacity: 0 }}
    >
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ArticlePreviewSkeleton />
            <ArticlePreviewSkeleton />
            <ArticlePreviewSkeleton />
          </motion.div>
        ) : (
          <motion.div
            key="loaded"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {articles.map((article, idx) => (
              <ArticlePreview article={article} idx={idx} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
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
