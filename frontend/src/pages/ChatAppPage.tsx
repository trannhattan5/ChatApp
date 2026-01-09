import Logout from '@/components/auth/Logout'
import { Button } from '@/components/ui/button';
import api from '@/lib/axios';
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'
import { toast } from 'sonner';

const ChatAppPage = () => {
  const user = useAuthStore(s => s.user); // chỉ lấy đúng user trong store, component chỉ re-render khi user thay đổi
  console.log(user?.username);

  const handleOnClick = async () =>{
    try {
      await api.get('/users/test',{withCredentials:true});
      toast.success("Ok")
    } catch (error) {
      toast.error("Thất bại")
      console.error(error);
      
    }
  }
  
  return (
    <div>
     <Logout/>
      <p>{user?.username}</p>

      <Button onClick={handleOnClick}>test</Button>
    </div>
  )
}

export default ChatAppPage
