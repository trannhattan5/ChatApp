import Logout from '@/components/auth/logout'
import { useAuthStore } from '@/store/useAuthStore';
import React from 'react'

const ChatAppPage = () => {
  const user = useAuthStore(s => s.user); // chỉ lấy đúng user trong store, component chỉ re-render khi user thay đổi
  return (
    <div>
      {user?.username}
     <Logout/>
    </div>
  )
}

export default ChatAppPage
