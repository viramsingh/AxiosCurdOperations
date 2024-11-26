import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get post
export const GetPost = () => {
  return api.get("/posts");
};

//delete Post
export const deletePost = (id) => {
  return api.delete(`/posts/${id}`);
};

//post method
export const postData = (post) => {
  return api.post("/posts", post);
};

//update
export const updateData = (id, post) => {
  return api.put(`/posts/${id}`, post);
};
