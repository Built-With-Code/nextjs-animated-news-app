import { GetServerSideProps, NextPage } from "next";
import React from "react";
import { Article } from "../../models";
import Image from "next/image";
import { LoremIpsum } from "lorem-ipsum";

interface Props {
  article: Article;
}

const ArticlePage: NextPage<Props> = ({ article }) => {
  return (
    <main className="container lg:max-w-[70%] mx-auto min-h-[200vh] py-8">
      <div className="relative w-full h-60 mx-auto">
        <Image
          src={article.image_url}
          alt={article.title}
          fill
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="flex flex-col gap-y-2 my-8">
        <h1 className="text-3xl font-bold">{article.title}</h1>
        <span className="text-zinc-400">
          {article.author} &bull; {article.publication_date}
        </span>
        <em className="block text-md">{article.description}</em>
      </div>
      <div className="flex flex-col gap-y-4 text-base leading-8 tracking-wide">
        {Array.from(Array(16).keys()).map((_) => (
          <p>{article.content}</p>
        ))}
      </div>
    </main>
  );
};

type Data = {
  articles: Article[];
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const articleId = context.query.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data.json`);
  const data: Data = await res.json();
  const articles = data.articles;

  const selectedArticle = articles.filter(
    (article) => article.slug == articleId
  );

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 6,
    },
    wordsPerSentence: {
      max: 16,
      min: 10,
    },
  });

  selectedArticle[0].content = lorem.generateParagraphs(1);

  return {
    props: { article: selectedArticle[0] },
  };
};

export default ArticlePage;
