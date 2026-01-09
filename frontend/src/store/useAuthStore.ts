import { create } from 'zustand'
import { toast } from 'sonner'
import { authService } from '@/services/authService'
import type { AuthState } from '@/types/store'
 
export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    user: null,
    loading: false,

    setAccessToken:(accessToken:string)=>{
        set({accessToken})
    },


    clearState : () => set({ accessToken: null, user: null, loading: false}),

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
             get().setAccessToken(accessToken);

            await get().fetchMe();//lấy thông tin user sau khi đăng nhập thành công

            toast.success('Đăng nhập thành công!')
        } catch (error) {
            console.error(error);
            toast.error('Đăng nhập không thành công')
        }
        finally{
            set({loading:false})//api đã xử lý xong
        }
    },
    signOut: async () => {
        try {
            set({loading:true})

            await authService.signOut();
            get().clearState();
            toast.success('Đăng xuất thành công!')
        } catch (error) {
            console.error(error);
            toast.error('Đăng xuất không thành công')
        }
        finally{
            set({loading:false})//api đã xử lý xong
        }
    },
    fetchMe: async () => {
        try {
            set({loading:true})
            const user = await authService.fetchMe();
            set({user})
        } catch (error) {
            console.error(error);
            set({user:null,accessToken:null})
            toast.error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại')
        }
        finally{
            set({loading:false})//api đã xử lý xong
        }
    },
    refersh: async () =>{
        try {
            set({loading:true})
            const {user, fetchMe, setAccessToken} = get();
            const accessToken = await authService.refersh();

             setAccessToken(accessToken);


            // nếu có lỗi thì gọi lại fecthme để lấy lại user
            if(!user){
                await fetchMe();
            }
        } catch (error) {
            console.error(error);
            toast.error('Phiên đăng nhập đã hết hạn , vui lòng đăng nhậ lại!')
            get().clearState();
            
        }
        finally{
            set({loading:false}) // api đã xử lý xong
        }
    },

}))