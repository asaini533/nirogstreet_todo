import TodoList from "./TodoList";

const TodoLists = (props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 w-full">
      <div className="flex flex-row items-start justify-center gap-3 w-3/5">
        <TodoList
          onChangeStatusHandler={props.onChangeStatusHandler}
          status="Pending Activities"
          list={props.pendingList}
        />
        <TodoList status="Completed Activities" list={props.completeList} />
      </div>
    </div>
  );
};

export default TodoLists;
