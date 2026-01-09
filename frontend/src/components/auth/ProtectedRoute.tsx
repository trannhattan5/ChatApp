import { useAuthStore } from '@/store/useAuthStore';
 import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = () => {

    const { accessToken,user, loading } = useAuthStore();

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
