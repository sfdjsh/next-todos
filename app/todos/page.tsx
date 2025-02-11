"use client"
import { Suspense } from "react";
import dynamic from "next/dynamic";

const TodoListWrapper = dynamic(() => import("@/components/TodoListWrapper"), {
  ssr: false,
});

const TodoPage = () => {
  return (
    <Suspense>
      <TodoListWrapper />
    </Suspense>
  );
};

export default TodoPage;
