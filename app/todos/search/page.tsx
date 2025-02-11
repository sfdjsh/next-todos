"use client";
import { Suspense } from "react";
import dynamic from "next/dynamic";

const SearchWrapper = dynamic(() => import("@/components/SearchWrapper"), {
  ssr: false,
});

const SearchedTodos = () => {
  return (
    <Suspense>
      <SearchWrapper />
    </Suspense>
  );
};

export default SearchedTodos;
