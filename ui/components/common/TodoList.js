import ToDoActivity from "./ToDoActivity";

export default function TodoList(props) {
  return (
    <div className="flex flex-col items-center justify-center w-1/2">
      <h1 className="m-4">{props.status}</h1>
      <div className="bg-white p-10 drop-shadow-md rounded-lg  flex flex-col w-full ">
        {props.list.map((item) => (
          <ToDoActivity
            onChangeStatusHandler={props.onChangeStatusHandler}
            item={item}
          />
        ))}
      </div>
    </div>
  );
}
