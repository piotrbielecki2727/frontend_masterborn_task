//core
import { useState } from "react";
//components
import { useTodos } from "./hooks";
import { AddTodoForm, ErrorAlert, TodoItem } from "./components";

export function App() {
  const [inputValue, setInputValue] = useState("");
  const [validationError, setValidationError] = useState<string>("");

  const {
    todos,
    isLoading,
    isAdding,
    isUpdating,
    error,
    addTodo,
    toggleTodo,
    clearCompleted,
    activeTodoCount,
    hasCompletedTodos,
  } = useTodos();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setValidationError("");
  };

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
      <div>
        <AddTodoForm
          inputValue={inputValue}
          isAdding={isAdding}
          validationError={validationError}
          onInputChange={(value) =>
            handleInputChange({
              target: { value },
            } as React.ChangeEvent<HTMLInputElement>)
          }
          onSubmit={async (e) => {
            e.preventDefault();
            setValidationError("");
            if (!inputValue.trim()) return;
            try {
              await addTodo(inputValue);
              setInputValue("");
            } catch (error) {
              if (error instanceof Error) {
                setValidationError(error.message);
              }
            }
          }}
        />
      </div>

      {error && <ErrorAlert error={error} />}

      <fieldset>
        <legend className="text-base font-semibold leading-6 text-gray-900">
          Todo list
        </legend>
        <div className="mt-4 divide-y divide-gray-200 border-b border-t border-gray-200">
          {isLoading || isAdding ? (
            <div className="py-8 text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-indigo-600 border-r-transparent"></div>
              <p className="mt-2 text-sm text-gray-500">
                {isAdding ? "Adding todo..." : "Loading todos..."}
              </p>
            </div>
          ) : todos.length === 0 ? (
            <div className="py-8 text-center text-sm text-gray-500">
              No todos yet. Add one above!
            </div>
          ) : (
            todos.map(({ id, completed, ...rest }) => (
              <div key={id} data-testid="todo-item">
                <TodoItem
                  todo={{ id, completed, ...rest }}
                  onToggle={() => toggleTodo(id, completed)}
                />
              </div>
            ))
          )}
        </div>
      </fieldset>

      <div className="flex h-8 items-center justify-between">
        <div>
          {todos.length > 0 && !isLoading && !isAdding && (
            <span
              data-testid="todo-count"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              {activeTodoCount} items left
            </span>
          )}
        </div>
        <div>
          {hasCompletedTodos && !isLoading && (
            <button
              onClick={clearCompleted}
              disabled={isUpdating}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Clear completed
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
