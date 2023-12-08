import React from "react";
import RemoveButton from "./RemoveButton";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";


const TopicsList = async () => {
 
const getTopics = async ()=>{
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: "no-store",
    });
    if(!res.ok){
      throw new Error("Failed to fetch topics")
    }
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

const {topics} = await getTopics(); 

console.log(topics)

  return (
    <>
      <div className="p-4 border border-slate-300 my-3 flex justify-between lg:mx-64 md:mx-10rounded-md gap-5 items-start bg-white shadow-md">
        <div>
          <h2 className="font-bold text-2xl text-primary">Heading</h2>
          <p className="text-gray-600">Description goes here.</p>
        </div>
        <div className="flex gap-2">
          <RemoveButton />
          <Link href={"/edit/123"}>
            <HiPencilAlt size={24} className="text-neutral-500 cursor-pointer hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default TopicsList;
