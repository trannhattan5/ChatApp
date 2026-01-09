import Logout from '@/components/auth/Logout'
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'

const ChatAppPage = () => {
  const user = useAuthStore(s => s.user); // chỉ lấy đúng user trong store, component chỉ re-render khi user thay đổi
  console.log(user?.username);
  
  return (
    <div>
     <Logout/>
      <p>{user?.username}</p>
    </div>
  )
}

export default ChatAppPage
