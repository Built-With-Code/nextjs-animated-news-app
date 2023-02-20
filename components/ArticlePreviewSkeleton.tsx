import React from "react";

const ArticlePreviewSkeleton = () => {
  return (
    <div className="border-y py-4 flex gap-x-6">
      <div className="relative w-36 h-24 bg-gray-200"></div>
      <div className="flex-1 flex flex-col gap-y-2">
        <div className="h-6 w-1/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/4 bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-full bg-gray-200 rounded" />
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
      </div>
    </div>
  );
};

export default ArticlePreviewSkeleton;
