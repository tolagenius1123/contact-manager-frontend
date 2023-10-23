import * as Yup from "yup";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const registerValidator = Yup.object({
	name: Yup.string().required("Required"),
	email: Yup.string()
		.required("Required")
		.matches(EMAIL_REGEX, "Invalid email address"),
	password: Yup.string()
		.required("Required")
		.min(8, "Password must be 8 characters long")
		.matches(/[0-9]/, "Password requires a number")
		.matches(/[a-z]/, "Password requires a lowercase letter")
		.matches(/[A-Z]/, "Password requires an uppercase letter")
		.matches(/[^\w]/, "Password requires a symbol"),
});

export const loginValidator = Yup.object({
	email: Yup.string()
		.required("Required")
		.matches(EMAIL_REGEX, "Invalid email address"),
	password: Yup.string()
		.required("Required")
		.min(8, "Password must be 8 characters long")
		.matches(/[0-9]/, "Password requires a number")
		.matches(/[a-z]/, "Password requires a lowercase letter")
		.matches(/[A-Z]/, "Password requires an uppercase letter")
		.matches(/[^\w]/, "Password requires a symbol"),
});

export const ContactValidator = Yup.object({
	fullname: Yup.string().required("Required"),
	phoneNumber: Yup.string()
		.required("Required")
		.min(11, "Phone number must be 11 characters long")
		.max(11, "Please enter a valid phone number"),
	address: Yup.string().required("Required"),
});
