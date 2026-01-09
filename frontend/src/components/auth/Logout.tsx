import React from 'react'
import { Button } from '../ui/button'
import { useAuthStore } from '@/store/useAuthStore'
import { useNavigate } from 'react-router';

const Logout = () => {
    const { signOut } = useAuthStore();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/signin');//đi đến trang đăng nhập sau khi đăng xuất
            
        } catch (error) {
            console.error(error);
            
        }
    }

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default Logout
