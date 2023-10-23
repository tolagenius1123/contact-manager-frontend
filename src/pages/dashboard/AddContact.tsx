import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { ContactValidator } from "../../utilities/yup-form-validators";
import { Toaster, toast } from "react-hot-toast";
import { addContact } from "../../services/actions/dashboard-actions";

const AddContact = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			fullname: "",
			phoneNumber: "",
			address: "",
		},
		validationSchema: ContactValidator,
		onSubmit: async ({ fullname, phoneNumber, address }) => {
			setIsLoading(true);

			const payload = {
				fullname,
				phoneNumber,
				address,
			};

			const response = await addContact(payload);
			console.log(response);
			if (response.status === 200) {
				setIsLoading(false);
				toast.success("Contact saved successfully", { id: "1" });
				setTimeout(() => {
					navigate("/dashboard");
				}, 2000);
			} else {
				setIsLoading(false);
				toast.error(response.response.data.message, { id: "1" });
			}
			// resetForm();
		},
	});

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<div className="h-screen w-full bg-blue-500 flex items-center justify-center font-poppins">
				<form
					onSubmit={formik.handleSubmit}
					className="h-auto w-[400px] bg-white rounded-md py-5 px-5 flex flex-col"
				>
					<h2 className="text-2xl font-semibold mb-2 text-center">
						Add Contact
					</h2>
					<div className="my-2">
						<label htmlFor="fullname" className="text-sm">
							Fullname
						</label>
						<input
							type="text"
							name="fullname"
							id="fullname"
							value={formik.values.fullname}
							onChange={formik.handleChange}
							className="text-sm h-8 w-full border border-blue-500 rounded-sm outline-none p-2"
						/>
						{formik.touched.fullname && formik.errors.fullname ? (
							<div className="text-[11px] text-red-500">
								{`*${formik.errors.fullname}`}
							</div>
						) : null}
					</div>
					<div className="my-2">
						<label htmlFor="phoneNumber" className="text-sm">
							Phone number
						</label>
						<input
							type="text"
							name="phoneNumber"
							id="phoneNumber"
							value={formik.values.phoneNumber}
							onChange={formik.handleChange}
							className="text-sm h-8 w-full border border-blue-500 rounded-sm outline-none p-2"
						/>
						{formik.touched.phoneNumber &&
						formik.errors.phoneNumber ? (
							<div className="text-[11px] text-red-500">
								{`*${formik.errors.phoneNumber}`}
							</div>
						) : null}
					</div>
					<div className="my-2">
						<label htmlFor="address" className="text-sm">
							Home Address
						</label>
						<input
							type="text"
							name="address"
							id="address"
							value={formik.values.address}
							onChange={formik.handleChange}
							className="text-sm h-8 w-full border border-blue-500 rounded-sm outline-none p-2"
						/>
						{formik.touched.address && formik.errors.address ? (
							<div className="text-[11px] text-red-500">
								{`*${formik.errors.address}`}
							</div>
						) : null}
					</div>
					<button
						type="submit"
						className="text-sm h-10 w-20 bg-blue-500 text-white py-2 px-4 rounded-sm cursor-pointer my-4 mx-auto"
					>
						{isLoading ? (
							<CircularProgress size={20} color="inherit" />
						) : (
							"Submit"
						)}
					</button>
				</form>
			</div>
		</>
	);
};

export default AddContact;
