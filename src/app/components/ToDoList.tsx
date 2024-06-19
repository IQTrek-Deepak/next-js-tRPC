"use client";

import { trpc } from "../_trpc/client";

export default function ToDoList() {
  const getTodos = trpc.getTodos.useQuery();
  const hello = trpc.hello.useQuery({ text: "Deepak" });
  const allUsers = trpc.allUsers.useQuery();
  return (
    <div>
      {JSON.stringify(getTodos.data)}
      <br />
      <h2>{JSON.stringify(hello.data?.greeting)}</h2>
      <ul>
        {allUsers.data?.map((user) => {
          return <li key={user.id}>{user.fullName}</li>;
        })}
      </ul>
    </div>
  );
}
