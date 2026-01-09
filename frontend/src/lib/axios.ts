import { useAuthStore } from '@/store/useAuthStore';
import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api',
    withCredentials: true,
})

// gắn interceptor để tự động gửi kèm token trong header của mỗi request
api.interceptors.request.use((config) => {
    const { accessToken } = useAuthStore.getState();

    //nếu có token thì gắn vào header 
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
})

// tự động gọi fresh api khi access token hết hạn
api.interceptors.response.use((res) => res, async (error) => {
    // nếu nhận lỗi 401 từ server thì gọi api refresh token 
    const originalRequest = error.config;

    //nhưng api không cần check
    if (originalRequest.url.includes("/auth/signin") ||
        originalRequest.url.includes("/auth/signup") ||
        originalRequest.url.includes("/auth/refresh")

    ) {
        //không làm gì cả
        return Promise.reject(error)
    }

    //tránh lặp vô hạn
    originalRequest._retryCount  = originalRequest._retryCount || 0;

    // originalRequest._retryCount <4 
    if (error.response?.status === 403 && originalRequest._retryCount < 4) {

        //tăng số lần thử
        originalRequest._retryCount += 1;
        console.log("refersh",originalRequest._retryCount);
        
        try {
            //gọi api refresh token 
            const res = await api.post('/auth/refresh', {withCredentials:true});
            const newAccessToken = res.data.accessToken;
            useAuthStore.getState().setAccessToken(newAccessToken)

            // gọi lại api ban đầu với access token mới
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

            return api(originalRequest);
        } catch (refershError) {
            //nếu refresh token cũng hết hạn thì đăng xuất người dùng
            useAuthStore.getState().clearState();
            return Promise.reject(refershError);
        }
    }
    // nếu lỗi không phải 401 thì trả về lỗi bình thường
    return Promise.reject(error);

})

export default api;