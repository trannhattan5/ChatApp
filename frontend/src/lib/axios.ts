import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios'

const api = axios.create({
    baseURL:import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' :'/api',
    withCredentials:true,
})

// gắn interceptor để tự động gửi kèm token trong header của mỗi request
api.interceptors.request.use((config)=>{
    const {accessToken} = useAuthStore.getState();

    //nếu có token thì gắn vào header 
    if(accessToken){
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

export default api;