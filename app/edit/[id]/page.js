import EditTopic from "@/app/components/EditTopic"

const getTopicById = async (id) =>{
  try {
    const res = await fetch(`http://localhost:3000/api/topics/${id}`, 
    {
      cache: 'no-store', // Disable caching
    });
    if(!res.ok){
      throw new Error('Error fetching topic by id: ' + id);
    }
    return res.json();
  } catch (error) {
    console.log(error)
  }
}

const page = async ({params}) => {
  const {id} = params; 
  const {topic} = await getTopicById(id);
  const {title, description} = topic; 

  return (
   <EditTopic id={id} title={title} description={description} />
  )
}

export default page