'use client'
import { FaCheck } from "react-icons/fa";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";



const CompleteButton = async  ({isDone, id}) => {
    const router = useRouter()
    const handleCheckButton = async ()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/toggle/${id}`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
      
            if (response.ok) {
                router.refresh()
                toast.success('Successful')
              console.log('Toggle successful');
            } else {
              console.error('Toggle failed');
            }
          } catch (error) {
            console.error('Error toggling isDone:', error);
          }
      }
  return (
    <div onClick={handleCheckButton}>
         <FaCheck color={isDone ? 'green' : 'red'} size={26} />
    </div>
  )
}

export default CompleteButton