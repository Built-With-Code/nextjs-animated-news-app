import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Article } from "../models";

interface Props {
  article: Article;
  idx: number;
}

const ArticlePreview: React.FC<Props> = ({ article }) => {
  return (
    <Link href={`/article/${article.slug}`}>
      <div className="border-y py-4 flex gap-x-6">
        <div className="relative w-36 h-24">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="flex-1">
          <h1 className="text-xl font-bold">{article.title}</h1>
          <span className="text-zinc-400">
            {article.author} &bull; {article.publication_date}
          </span>
          <p>{article.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ArticlePreview;
