import React, { useEffect, useState } from "react";
import { postData, updateData } from "../api/PostApi";

const Form = ({ data, setData, updateDataApi, setUpdateDataApi }) => {
  const [addData, setAddData] = useState({
    title: "",
    body: "",
  });

  const handleChnage = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setAddData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const addPostData = async () => {
    const res = await postData(addData);
    console.log(res);
    if (res.status === 201) {
      setData([...data, res.data]);
      setAddData({ title: "", body: "" });
    }
  };

  //get the update data into the input feild
  useEffect(() => {
    updateDataApi &&
      setAddData({
        title: updateDataApi.title || "",
        body: updateDataApi.body || "",
      });
  }, [updateDataApi]);

  //updatepost
  const updatePostData = async () => {
    try {
      const res = await updateData(updateDataApi.id, addData);
      console.log(res);
      if (res.status === 200) {
        setData((prev) => {
          return prev.map((CurElem) => {
            return CurElem.id === res.data.id ? res.data : CurElem;
          });
        });
        setAddData({ title: "", body: "" });
        setUpdateDataApi({});
      }
    } catch (error) {
      console.log(error);
    }
  };

  //form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const actions = e.nativeEvent.submitter.value;
    if (actions === "Add") {
      addPostData();
    } else if (actions === "Edit") {
      updatePostData();
    }
    addPostData();
  };

  let isEmpty = Object.keys(updateDataApi).length === 0;

  return (
    <div className="bg-gray-700 px-5  py-2 mb-5 rounded-sm">
      <form
        onSubmit={handleFormSubmit}
        action=""
        className="flex sm:flex-row flex-col gap-5 justify-center items-center"
      >
        <div>
          <label htmlFor="title"></label>
          <input
            className="px-3 py-1 rounded-sm"
            type="text"
            autoComplete="off"
            id="title"
            name="title"
            placeholder="Add title"
            value={addData.title}
            onChange={handleChnage}
          />
        </div>
        <div>
          <label htmlFor="body"></label>
          <input
            className="px-3 py-1 rounded-sm"
            type="text"
            autoComplete="off"
            placeholder="Add Post"
            id="body"
            name="body"
            value={addData.body}
            onChange={handleChnage}
          />
        </div>
        <button
          value={isEmpty ? "Add" : "Edit"}
          className="bg-green-400 px-5 rounded-sm  py-1 hover:bg-white hover:text-black"
          type="submit"
        >
          {isEmpty ? "Add" : "Edit"}
        </button>
      </form>
    </div>
  );
};

export default Form;
