import RemoveButton from "./RemoveButton";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";

const getTopics = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/topics', {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }
    return res.json();
  } catch (error) {
    console.log(error);
    return { topics: [] };
  }
};

const TopicsList = async () => {

const {topics} = await getTopics(); 

  return (
    <>
    {topics.map((t)=>(
      <div key={t._id} className="p-4 border lg:w-[50%] border-slate-300 my-3 flex justify-between lg:ml-96 xl:ml-96  rounded-md gap-5 items-start bg-white shadow-md">
        <div>
          <h2 className="font-bold text-2xl text-primary">{t.title}</h2>
          <p className="text-gray-600">{t.description}</p>
        </div>
        <div className="flex gap-2">
          <RemoveButton id={t._id} />
          <Link href={`/edit/${t._id}`}>
            <HiPencilAlt
              size={24}
              className="text-neutral-500 cursor-pointer hover:text-primary transition-colors"
            />
          </Link>
        </div>
      </div>
    ))}

    </>
  );
};

export default TopicsList;
