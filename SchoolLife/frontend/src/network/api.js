import axios from 'axios';

const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.request.use(async (config) => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = (token ? `Bearer ${token}` : '');
    config.headers.ContentType = 'application/json';
    return config;
});

export const login = (email, password) => {
    return instance.post('/auth/login', { email, password });
}

export const register = (name, email, password) => {
    return instance.post('/auth/register', { name, email, password });
}

export const getProfile = () => {
    return instance.get('/user/me');
}

export const getUsers = () => {
    return instance.get('/user/allUsers');
}

export const updateUser = async (id, group) => {
    return instance.patch('/user/changeGroup', { id, group });
}

export const getEvents = async (startDate, endDate) => {
    return instance.get('/calendar/getEvents', {
        params: {
            startDate,
            endDate
        }
    });
}

export const addEvent = async (name, timestamp, location) => {
    return instance.post('/calendar/addEvent', { name, timestamp, location });
}

export const updateEvent = async (name, timestamp, location) => {
    return instance.patch('/calendar/modifyEvent', { name, timestamp, location });
}

export const deleteEvent = async (id) => {
    return instance.delete('/calendar/deleteEvent', {
        params: {
            id
        }
    });
}

export const getAnnouncements = async () => {
    return instance.get('/announcement/getAnnouncements');
}

export const addAnnouncement = async (title, content) => {
    return instance.post('/announcement/createAnnouncement', { title, content });
}