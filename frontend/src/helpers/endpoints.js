/* eslint-disable no-undef */
export const registerURL = () => {
  return `${process.env.SERVER_URL}/api/v1/users/register`
}

export const loginURL = () => {
  return `${process.env.SERVER_URL}/api/v1/users/login`
}

export const getTodosURL = () => {
  return `${process.env.SERVER_URL}/api/v1/todos/`
}

export const createTodoURL = () => {
  return `${process.env.SERVER_URL}/api/v1/todos/create`
}

export const updateTodoURL = () => {
  return `${process.env.SERVER_URL}/api/v1/todos/update`
}

export const uploadImgURL = () => {
  return `${process.env.SERVER_URL}/api/v1/files/upload`
}
