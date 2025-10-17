export const API_URL = "http://localhost:3000";

export const JSON_HEADERS = {
  "Content-Type": "application/json",
};

export const HTTP_METHOD = {
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const ENDPOINTS = {
  TODOS: `${API_URL}/todos`,
  TODO: (id: string) => `${API_URL}/todos/${id}`,
};
