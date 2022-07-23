import Checkbox from "@mui/material/Checkbox";
import moment from "moment";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function ToDoActivity(props) {
  return (
    <div className="border border-amber-400 rounded-lg p-3 m-2 w-full">
      <div className="flex flex-row items-center justify-items-start gap-5 ">
        <h2 className="font-semibold">{props.item.name}</h2>
        {props.item.status == "Pending" && (
          <p
            onClick={() => props.onChangeStatusHandler(props.item.id)}
            className="bg-red-400 text-white p-1 rounded-lg cursor-pointer hover:bg-red-500 drop-shadow-lg"
          >
            Update
          </p>
        )}
      </div>
      <p className="text-gray-500">
        <span>Created At: </span>
        {moment(props.item.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
      <p className="mt-2">{props.item.description}</p>
    </div>
  );
}
