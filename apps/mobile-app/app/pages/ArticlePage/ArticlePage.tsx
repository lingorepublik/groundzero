import React from "react";

type Props = {
  title?: string;
  page?: string;
};

export default function ArticlePage({ title, page }: Props) {
  return (
    <div>
      ArticlePage, {title} {page}
    </div>
  );
}
