//other
import { Todo } from "../types";
import { JSON_HEADERS, HTTP_METHOD, ENDPOINTS } from "./constants";

export const todoApi = {
  async getAll(): Promise<Todo[]> {
    const response = await fetch(ENDPOINTS.TODOS);
    return response.json();
  },

  async create(title: string): Promise<Todo> {
    const response = await fetch(ENDPOINTS.TODOS, {
      method: HTTP_METHOD.POST,
      headers: JSON_HEADERS,
      body: JSON.stringify({ title }),
    });
    return response.json();
  },

  async update(id: string, updates: Partial<Todo>): Promise<Todo> {
    const response = await fetch(ENDPOINTS.TODO(id), {
      method: HTTP_METHOD.PUT,
      headers: JSON_HEADERS,
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  async delete(id: string): Promise<void> {
    await fetch(ENDPOINTS.TODO(id), {
      method: HTTP_METHOD.DELETE,
    });
  },
};
