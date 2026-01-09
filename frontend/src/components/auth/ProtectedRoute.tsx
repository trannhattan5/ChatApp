import { useAuthStore } from '@/store/useAuthStore';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

  const { accessToken, user, loading, fetchMe, refersh } = useAuthStore();

  // khi trang protected route được load thì ta sẽ kiểm tra xem có token và user chưa
  const [staring, setStaring] = useState(true)

  // nếu đang loading thì khôn làm gì cả
  const init = async () => {
    //có thể xảy ra khi refresh trang 
    if (!accessToken) {
      await refersh();
    }

    // nếu có token nhưng chưa có user thì gọi fetchme để lấy user
    if (accessToken && !user) {
      await fetchMe();
    }

    // kết thúc kiểm tra
    setStaring(false);


  }
  //khi người dùng load trang thì init sẽ tự động chạy để đảm bảo token và user luôn đồng bộ
  useEffect(() => {
    init();
  }, [])

  // nếu vẫn đang loading thì hiển thì thị loading staring : đang khởi tạo 
  if (staring || loading) {
    return <div className='flex h-screen items-center justify-center'>Đang tải trang .... </div>
  }

  if (!accessToken) {
    return (
      <Navigate to="/signin" replace />
    )
  }
  return (
    <div>
      <Outlet></Outlet>
    </div>
  )
}

export default ProtectedRoute
