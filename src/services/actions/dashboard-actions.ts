import AxiosClient from "../../config/AxiosClient";

interface AddContactPayloadType {
	fullname: string;
	phoneNumber: string;
	address: string;
}

interface EditContactPayloadType {
	fullname: string | undefined;
	phoneNumber: string | undefined;
	address: string | undefined;
}

export const getContacts = () => {
	return AxiosClient.get(`${import.meta.env.VITE_BASE_URL}/api/contacts`)
		.then((response) => response)
		.catch((error) => error);
};

export const getSingleContact = (id: string | undefined) => {
	return AxiosClient.get(
		`${import.meta.env.VITE_BASE_URL}/api/contacts/${id}`
	)
		.then((response) => response)
		.catch((error) => error);
};

export const addContact = (payload: AddContactPayloadType) => {
	return AxiosClient.post(
		`${import.meta.env.VITE_BASE_URL}/api/contacts`,
		payload
	)
		.then((response) => response)
		.catch((error) => error);
};

export const editContact = (
	id: string | undefined,
	payload: EditContactPayloadType
) => {
	return AxiosClient.put(
		`${import.meta.env.VITE_BASE_URL}/api/contacts/${id}`,
		payload
	)
		.then((response) => response)
		.catch((error) => error);
};

export const deleteContact = (id: any) => {
	return AxiosClient.delete(
		`${import.meta.env.VITE_BASE_URL}/api/contacts/${id}`
	)
		.then((response) => response)
		.catch((error) => error);
};
