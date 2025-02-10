import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  Timestamp,
  orderBy,
} from "firebase/firestore";
import dayjs from "dayjs";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 전체 할 일 조회
export const fetchTodos = async () => {
  let todoList = [];

  const todoRef = collection(db, "next-todos");
  const q = query(todoRef, orderBy("start_at"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const todoData = {
      id: doc.data()?.id,
      title: doc.data()?.title,
      content: doc.data()?.content,
      isDone: doc.data()?.is_done,
      startAt: dayjs(doc.data().start_at.toDate()).format("YYYY-MM-DD"),
      endAt: dayjs(doc.data().end_at.toDate()).format("YYYY-MM-DD"),
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
      startAt: dayjs(todoDocSnap.data().start_at.toDate()).format("YYYY-MM-DD"),
      endAt: dayjs(todoDocSnap.data().end_at.toDate()).format("YYYY-MM-DD"),
    };

    return todoData;
  } else {
    return null;
  }
};

// 할 일 추가
export const createTodo = async ({ title, content, startAt, endAt }) => {
  const newTodoRef = doc(collection(db, "next-todos"));
  const todoData = {
    id: newTodoRef.id,
    title,
    content,
    is_done: false,
    start_at: Timestamp.fromDate(dayjs(startAt).startOf("day").toDate()),
    end_at: Timestamp.fromDate(dayjs(endAt).endOf("day").toDate()),
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
export const updateTodo = async ({
  id,
  title,
  content,
  isDone,
  startAt,
  endAt,
}) => {
  const newTodoRef = doc(db, "next-todos", id);
  const todoData = {
    id: newTodoRef.id,
    title,
    content,
    is_done: isDone,
    start_at: Timestamp.fromDate(dayjs(startAt).startOf("day").toDate()),
    end_at: Timestamp.fromDate(dayjs(endAt).endOf("day").toDate()),
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

// 검색을 통한 할 일 조회
export const searchTodo = async ({ field, input }) => {
  let todoList = [];
  const todoRef = collection(db, "next-todos");
  const q = query(
    todoRef,
    where(field, ">=", input),
    where(field, "<=", input + "\uf8ff"),
    orderBy("start_at")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const todoData = {
      id: doc.id,
      title: doc.data().title,
      content: doc.data().content,
      isDone: doc.data().is_done,
      startAt: dayjs(doc.data().start_at.toDate()).format("YYYY-MM-DD"),
      endAt: dayjs(doc.data().end_at.toDate()).format("YYYY-MM-DD"),
    };
    todoList.push(todoData);
  });

  return todoList;
};

// 오늘 날짜 할 일 조회
export const includedTodayTodo = async ({ date }) => {
  const todoList = [];

  const period = Timestamp.fromDate(dayjs(date).startOf("day").toDate());
  const todoRef = collection(db, "next-todos");
  const q = query(
    todoRef,
    where("start_at", "<=", period),
    where("end_at", ">=", period)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const todoData = {
      id: doc.data().id,
      title: doc.data().title,
      content: doc.data().content,
      isDone: doc.data().is_done,
      startAt: dayjs(doc.data().start_at.toDate()).format("YYYY-MM-DD"),
      endAt: dayjs(doc.data().end_at.toDate()).format("YYYY-MM-DD"),
    };
    todoList.push(todoData);
  });

  return todoList;
};
