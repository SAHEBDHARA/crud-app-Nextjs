'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';

// ... (imports)

const EditTopic = ({ id, title, description }) => {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/api/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });
      if (!res.ok) {
        throw new Error('Error editing topic');
      }
      toast.success('Topic updated successfully')
      router.refresh()
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Topic</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-600">
            Title
          </label>
          <input
            onChange={(e) => setNewTitle(e.target.value)}
            value={newTitle}
            type="text"
            id="title"
            name="title"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-600">
            Text
          </label>
          <textarea
            onChange={(e) => setNewDescription(e.target.value)}
            value={newDescription}
            id="text"
            name="text"
            rows="4"
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
        >
          Save Topic
        </button>
      </form>
    </div>
  );
};

export default EditTopic;

