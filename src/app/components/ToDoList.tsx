"use client";
import { useState } from "react";
import { trpc } from "../_trpc/client";

export default function ToDoList() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const getTodos = trpc.getTodos.useQuery();
  const hello = trpc.hello.useQuery({ text: "Deepak" });
  const allUsers = trpc.allUsers.useQuery();
  const addUser = trpc.addUser.useMutation();
  const changePhone = trpc.changePhone.useMutation();
  return (
    <div>
      {JSON.stringify(getTodos.data)}
      <br />
      <h2>{JSON.stringify(hello.data?.greeting)}</h2>
      <ul>
        {allUsers.data?.map((user) => {
          return (
            <li
              key={user.id}
              className="p-4 m-4 cursor-pointer"
              onClick={() =>
                changePhone.mutate({ id: user.id, phone: "0000000000000" })
              }
            >
              {user.fullName} "-" {user.phone}
            </li>
          );
        })}
      </ul>
      <br></br>
      <div className="mt-5 flex flex-col gap-4">
        <div className="flex flex-row items-center gap-3">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-4"
          />
        </div>
        <div className="flex flex-row items-center gap-3">
          <label>phone:</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-4"
          />
        </div>
        <button
          className="p-8 bg-red-500 text-white"
          onClick={() => addUser.mutate({ name, phone })}
        >
          Add user
        </button>
      </div>
    </div>
  );
}
