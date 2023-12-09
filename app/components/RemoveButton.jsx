'use client'
import { HiOutlineTrash} from 'react-icons/hi'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const RemoveButton = ({id}) => {
  const router = useRouter()
  const removeTopics = async ()=>{
    const conform = confirm("Are you sure you want to remove?")
    if(conform){
      await fetch(`http://localhost:3000/api/topics?id=${id}`,{
        method: 'DELETE',
      });
      toast.success('Removed  ')
      router.refresh()
    }
  }
  return (
    <button onClick={removeTopics} className='text-rose-400'>
        <HiOutlineTrash size={24}/>
    </button>
  )
}

export default RemoveButton