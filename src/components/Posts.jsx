import React, { useEffect, useState } from "react";
import { GetPost } from "../api/PostApi";
import { deletePost } from "../api/PostApi";
import Form from "./Form";

const Posts = () => {
  const [data, setData] = useState([]);
  const [updateDataApi, setUpdateDataApi] = useState({});

  const getPostData = async () => {
    const res = await GetPost();
    console.log(res.data);
    setData(res.data);
  };

  useEffect(() => {
    getPostData();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      const res = await deletePost(id);
      if (res.status === 200) {
        const newUpdatedData = data.filter((currElem) => {
          return currElem.id !== id;
        });
        setData(newUpdatedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update
  const handleUpdatePost = (CurElem) => {
    setUpdateDataApi(CurElem);
  };

  return (
    <div className="p-5 flex flex-col items-center justify-center ">
      <div>
        <Form
          data={data}
          setData={setData}
          updateDataApi={updateDataApi}
          setUpdateDataApi={setUpdateDataApi}
        />
      </div>
      <ul className="grid gap-1 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {data.map((CurElem) => {
          const { id, body, title } = CurElem;
          return (
            <li
              key={id}
              className="bg-gray-700 px-2 rounded-sm py-1 m-2 flex flex-col gap-2  text-white  border-l-2"
            >
              <p className="">{id}.</p>
              <p>Title : {title}</p>
              <p>Description : {body}</p>
              <div className="space-x-2 py-2">
                <button
                  onClick={() => handleUpdatePost(CurElem)}
                  className="px-4 mx-2 py-1 rounded-sm bg-red-500 hover:bg-white hover:text-black font-semibold"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeletePost(id)}
                  className="px-4 rounded-sm py-1 bg-green-500 hover:bg-white hover:text-black font-semibold"
                >
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Posts;
