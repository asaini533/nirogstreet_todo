import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TodoLists from "../components/common/TodoLists";
import Spinner from "../components/common/Spinner";

export default function CreateTodo() {
  const [pendingListData, setPendingListData] = useState();
  const [completeListData, setCompleteListData] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const ISSERVER = typeof window === "undefined";
  let userid;
  if (!ISSERVER) {
    userid = sessionStorage.getItem("userid");
  }

  useEffect(() => {
    fetch("/api/getlist", {
      method: "POST",
      body: JSON.stringify({
        userId: userid,
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((data) => data.json())
      .then((data) => {
        const pendingList = data.filter((item) => item.status == "Pending");
        const completeList = data.filter((item) => item.status == "Completed");

        setPendingListData(pendingList);
        setCompleteListData(completeList);
      });
  }, [userid]);

  const onSubmit = async (data) => {
    const response = await fetch("/api/addtodo", {
      method: "POST",
      body: JSON.stringify({
        userId: userid,
        name: data.name,
        description: data.description,
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(response);

    const responseData = await response.json();

    const pendingList = responseData.filter((item) => item.status == "Pending");
    const completeList = responseData.filter(
      (item) => item.status == "Completed"
    );

    setPendingListData(pendingList);
    setCompleteListData(completeList);
    reset();
  };

  const onChangeStatusHandler = async (todoId) => {
    console.log(todoId);
    const response = await fetch("/api/updatetodo", {
      method: "POST",
      body: JSON.stringify({
        userId: userid,
        todoId: todoId,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const responseData = await response.json();

    const pendingList = responseData.filter((item) => item.status == "Pending");
    const completeList = responseData.filter(
      (item) => item.status == "Completed"
    );

    setPendingListData(pendingList);
    setCompleteListData(completeList);
  };

  return (
    <div className="antialiased bg-gray-100 min-h-screen flex flex-col items-center justify-start">
      <h1 className="m-4">Add a new todo</h1>
      <div className="bg-white p-10 drop-shadow-md rounded-lg w-1/3 flex flex-col ">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            className="border border-gray-400 px-4 py-3 rounded-lg"
            placeholder="Name"
            type="text"
            {...register("name", {})}
          />
          <textarea
            className="border border-gray-400 px-4 py-3 rounded-lg"
            placeholder="Description"
            rows="4"
            type="text"
            {...register("description", {})}
          />

          <input
            className="bg-orange-400 font-medium cursor-pointer text-white px-4 py-3 rounded-lg hover:bg-orange-500"
            type="submit"
          />
        </form>
      </div>

      {pendingListData && completeListData ? (
        <TodoLists
          onChangeStatusHandler={onChangeStatusHandler}
          pendingList={pendingListData}
          completeList={completeListData}
        />
      ) : (
        <Spinner />
      )}
    </div>
  );
}
