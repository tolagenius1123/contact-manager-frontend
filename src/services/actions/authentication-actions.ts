import axios from "axios";

interface RegisterPayloadType {
	name: string;
	email: string;
	password: string;
}

interface LoginPayloadType {
	email: string;
	password: string;
}

export const register = (payload: RegisterPayloadType) => {
	return axios
		.post(`${import.meta.env.VITE_BASE_URL}/api/users`, payload)
		.then((response) => response)
		.catch((error) => error);
};

export const login = (payload: LoginPayloadType) => {
	return axios
		.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, payload)
		.then((response) => response)
		.catch((error) => error);
};
