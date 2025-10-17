//core
import { clsx } from "clsx";
//other
import { Todo } from "../types";

interface ITodoItemProps {
  todo: Todo;
  onToggle: (id: string, completed: boolean) => void;
}

export const TodoItem = ({ todo, onToggle }: ITodoItemProps) => {
  const { id, completed, title } = todo;
  return (
    <div
      data-testid="todo-item"
      className={clsx(
        "relative flex items-start py-4",
        completed && "line-through",
      )}
    >
      <div className="min-w-0 flex-1 text-sm leading-6 break-all">
        <label
          className="select-none font-medium text-gray-900"
          data-testid="todo-title"
        >
          {title}
        </label>
      </div>
      <div className="ml-3 flex h-6 items-center flex-shrink-0">
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggle(id, completed)}
          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
        />
      </div>
    </div>
  );
};
