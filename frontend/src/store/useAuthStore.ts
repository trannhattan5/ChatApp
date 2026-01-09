import { create } from 'zustand'
import { toast } from 'sonner'
import { authService } from '@/services/authService'
import type { AuthState } from '@/types/store'
 
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    signUp: async (username, password, email, firstName, lastName) => {
        try {
            set({loading:true})
            //gọi api
            await authService.signUp(username,password,email,firstName,lastName);

            toast.success('Đăng ký thành công! Bạn sẽ chuyển sang trang đăng nhập.')
        } catch (error) {
            console.error(error);
            toast.error('Đăng ký không thành công')
            
        }
        finally{
            set({loading:false})//api đã xử lý xong
        }
    },

    signIn: async (username,password) => {
        try {
            set({loading:true})
            //gọi api
            const {accessToken} = await authService.signIn(username,password);
            set({accessToken})
            toast.success('Đăng nhập thành công!')
        } catch (error) {
            console.error(error);
            toast.error('Đăng nhập không thành công')
        }
        finally{
            set({loading:false})//api đã xử lý xong
        }
    },

}))