//core
import { useState, useEffect } from "react";
//other
import { Todo } from "../types";
import { todoApi } from "../api";

interface IUseTodosReturn {
  todos: Todo[];
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  error: string;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: string, completed: boolean) => Promise<void>;
  clearCompleted: () => Promise<void>;
  activeTodoCount: number;
  hasCompletedTodos: boolean;
}

export const useTodos = (): IUseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      setError("");
      const data = await todoApi.getAll();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
      setError("Failed to load todos. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const validateTodo = (title: string): string => {
    const trimmedTitle = title.trim();

    if (trimmedTitle.length < 3) {
      return "Todo must be at least 3 characters long";
    }

    if (trimmedTitle.length > 100) {
      return "Todo must be less than 100 characters";
    }

    const isDuplicate = todos.some(
      (todo) => todo.title.toLowerCase() === trimmedTitle.toLowerCase(),
    );

    if (isDuplicate) {
      return "A todo with this name already exists";
    }

    return "";
  };

  const addTodo = async (title: string) => {
    const validationError = validateTodo(title);
    if (validationError) {
      throw new Error(validationError);
    }

    try {
      setIsAdding(true);
      const newTodo = await todoApi.create(title.trim());
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    } catch (error) {
      console.error("Error adding todo:", error);
      throw error;
    } finally {
      setIsAdding(false);
    }
  };

  const toggleTodo = async (id: string, completed: boolean) => {
    setIsUpdating(true);
    try {
      const updatedTodo = await todoApi.update(id, { completed: !completed });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch (error) {
      console.error("Error updating todo:", error);
      setError("Failed to update todo");
    } finally {
      setIsUpdating(false);
    }
  };

  const clearCompleted = async () => {
    setIsUpdating(true);
    try {
      const completedTodos = todos.filter((todo) => todo.completed);
      await Promise.all(completedTodos.map((todo) => todoApi.delete(todo.id)));
      await loadTodos();
    } catch (error) {
      console.error("Error clearing completed todos:", error);
      setError("Failed to clear completed todos");
    } finally {
      setIsUpdating(false);
    }
  };

  const activeTodoCount = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);

  return {
    todos,
    isLoading,
    isAdding,
    error,
    isUpdating,
    addTodo,
    toggleTodo,
    clearCompleted,
    activeTodoCount,
    hasCompletedTodos,
  };
};
