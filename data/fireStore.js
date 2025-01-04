import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MESSAGING_SENDER_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 전체 할 일 조회
export const fetchTodos = async () => {
  const todoList = [];
  const querySnapshot = await getDocs(collection(db, "next-todos"));
  querySnapshot.forEach((doc) => {
    const todoData = {
      id: doc.data().id,
      title: doc.data().title,
      content: doc.data().content,
      isDone: doc.data().is_done,
      // created_at : doc.data().created_at?.toDate().toLocaleDateString()
    };

    todoList.push(todoData);
  });

  return todoList;
};

// 단일 할 일 조회
export const fetchSingleTodo = async (id) => {
  const todoDocRef = doc(db, "next-todos", id);
  const todoDocSnap = await getDoc(todoDocRef);
  if (todoDocSnap.exists()) {
    const todoData = {
      id: todoDocSnap.data().id,
      title: todoDocSnap.data().title,
      content: todoDocSnap.data().content,
      isDone: todoDocSnap.data().is_done,
    };

    return todoData;
  } else {
    return null;
  }
};

// 할 일 추가
export const createTodos = async ({ title, content }) => {
  const newTodoRef = doc(collection(db, "next-todos"));
  const todoData = {
    id: newTodoRef.id,
    title,
    content,
    is_done: false,
  };
  await setDoc(newTodoRef, todoData);
  return todoData;
};

// 할 일 삭제
export const deleteTodo = async (id) => {
  if (id) {
    await deleteDoc(doc(db, "next-todos", id));
    return true;
  } else {
    return false;
  }
};

// 할 일 수정
export const updateTodo = async ({ id, title, content, isDone }) => {
  const newTodoRef = doc(db, "next-todos", id);
  const todoData = {
    id: newTodoRef.id,
    title,
    content,
    is_done: isDone,
  };
  await updateDoc(newTodoRef, todoData);
  return todoData;
};

// 완료 여부 수정
export const updateIsDoneTodo = async ({ id, isDone }) => {
  const updateTodoRef = doc(db, "next-todos", id);
  const todoData = {
    id: updateTodoRef.id,
    isDone,
  };
  await updateDoc(updateTodoRef, {
    is_done: isDone,
  });
  return todoData;
};
