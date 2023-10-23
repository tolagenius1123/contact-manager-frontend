import axios from "axios";

const AxiosClient = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
});

AxiosClient.interceptors.request.use((request) => {
	const user = localStorage.getItem("user");

	if (user) {
		const userDetails = JSON.parse(user);
		request.headers.Authorization = `Bearer ${userDetails.token}`;
	} else {
		delete request.headers.Authorization;
	}
	return request;
});

// AxiosClient.interceptors.response.use((response) => {
// 	return console.log(response);
// });

export default AxiosClient;
