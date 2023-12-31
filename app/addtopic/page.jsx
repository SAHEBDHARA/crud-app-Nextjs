'use client'
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast'

const AddTopicForm = () => {
  const [title, setTitle] = useState("");
  const [description, setText] = useState("");
  const router = useRouter()

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
   if(!title || !description){
    alert("Please give input");
    return; 
   }
   try {
    const res = await fetch('http://localhost:3000/api/topics',{ 
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({title, description})
  })
    if(res.ok){
      toast.success('Topics Added Successfully')
      router.push('/')

    }else{
      throw new Error("Falid to push the data ")
    }
   } catch (error) {
    console.log(error)
   }
  
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Topic</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={handleTitleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-600">
            Text
          </label>
          <textarea
            id="text"
            name="text"
            value={description}
            onChange={handleTextChange}
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-black text-white  py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        >
          Add Topic
        </button>
      </form>
    </div>
  );
};

export default AddTopicForm;
