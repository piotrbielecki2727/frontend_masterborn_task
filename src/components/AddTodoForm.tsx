interface IAddTodoFormProps {
  inputValue: string;
  isAdding: boolean;
  validationError?: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const AddTodoForm = ({
  inputValue,
  isAdding,
  validationError,
  onInputChange,
  onSubmit,
}: IAddTodoFormProps) => {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <input
        placeholder="What needs to be done?"
        type="text"
        value={inputValue}
        disabled={isAdding}
        onChange={(e) => onInputChange(e.target.value)}
        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-gray-100 disabled:cursor-not-allowed sm:text-sm sm:leading-6"
      />
      <button
        type="submit"
        disabled={isAdding || !inputValue.trim()}
        className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
      >
        Add
      </button>
      {validationError && (
        <p className="mt-2 text-sm text-red-600 w-full">{validationError}</p>
      )}
    </form>
  );
};
