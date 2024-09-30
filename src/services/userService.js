import api from '../api';

export const fetchUserById = async (id) => {
    try {
        const response = await api.get(`/users/${id}`);
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch user', error.message);
    }
}

export const fetchCurrentUser= async () => {
    try {
        const response = await api.get(`/users/current-user`);
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch user', error.message);
    }
}

export const fetchAllUser = async (param) => {
    try {
        const response = await api.get(`/users`, param ? { params: param } : {});
        console
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch user', error.message);
    }
}

export const fetchAddressByUserId = async (userId) => {
    try {
        const response = await api.get(`/addresses/user/${userId}`);
        return response.data.result;
    } catch (error) {
        console.error('Failed to fetch user', error.message);
    }
}