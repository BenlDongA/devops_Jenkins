import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://54.90.122.196:5000/api', // Đảm bảo base URL đúng
});

// Thêm interceptor để gửi token vào header của mỗi request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
