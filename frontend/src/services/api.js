import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
};

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/auth/login`, userData);
    return response.data;
};

export const createPost = async (postData, token) => {
    const response = await axios.post(`${API_URL}/posts`, postData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getPostsByUser = async (userId) => {
    const response = await axios.get(`${API_URL}/posts/user/${userId}`);
    return response.data;
};

export const getUserProfile = async (token, userId) => {
    let url = `${API_URL}/users/profile`;
    if (userId) {
        url = `${API_URL}/users/${userId}`;
    }
    const response = await axios.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data;
};

export const getPostById = async (postId) => {
    const response = await axios.get(`${API_URL}/posts/${postId}`);
    return response.data;
};