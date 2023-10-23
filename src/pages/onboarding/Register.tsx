import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useFormik } from "formik";
import { registerValidator } from "../../utilities/yup-form-validators";
import { register } from "../../services/actions/authentication-actions";
import { Toaster, toast } from "react-hot-toast";

const Register = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			name: "",
			email: "",
			password: "",
		},
		validationSchema: registerValidator,
		onSubmit: async ({ name, email, password }, { resetForm }) => {
			setIsLoading(true);

			const payload = {
				name,
				email,
				password,
			};

			const response = await register(payload);
			console.log(response);
			if (response.status === 201) {
				setIsLoading(false);
				toast.success("Registration successfull", { id: "1" });
				// localStorage.setItem("user", JSON.stringify(response.data));
				setTimeout(() => {
					navigate("/login");
				}, 2000);
			} else {
				setIsLoading(false);
				toast.error(response.response.data.message, { id: "1" });
			}
			resetForm();
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
					<h2 className="text-2xl font-semibold mb-2">Register</h2>
					<div className="my-2">
						<label htmlFor="name" className="text-sm">
							Username
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={formik.values.name}
							onChange={formik.handleChange}
							className="text-sm h-8 w-full border border-blue-500 rounded-sm outline-none p-2"
						/>
						{formik.touched.name && formik.errors.name ? (
							<div className="text-[11px] text-red-500">
								{`*${formik.errors.name}`}
							</div>
						) : null}
					</div>
					<div className="my-2">
						<label htmlFor="email" className="text-sm">
							Email
						</label>
						<input
							type="email"
							name="email"
							id="email"
							value={formik.values.email}
							onChange={formik.handleChange}
							className="text-sm h-8 w-full border border-blue-500 rounded-sm outline-none p-2"
						/>
						{formik.touched.email && formik.errors.email ? (
							<div className="text-[11px] text-red-500">
								{`*${formik.errors.email}`}
							</div>
						) : null}
					</div>
					<div className="my-2">
						<label htmlFor="password" className="text-sm">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={formik.values.password}
							onChange={formik.handleChange}
							className="text-sm h-8 w-full border border-blue-500 rounded-sm outline-none p-2"
						/>
						{formik.touched.password && formik.errors.password ? (
							<div className="text-[11px] text-red-500">
								{`*${formik.errors.password}`}
							</div>
						) : null}
					</div>
					<button
						type="submit"
						className="text-sm h-10 w-20 bg-blue-500 text-white py-2 px-4 rounded-sm cursor-pointer my-3 mx-auto"
						// disabled={isLoading}
					>
						{isLoading ? (
							<CircularProgress size={20} color="inherit" />
						) : (
							"Submit"
						)}
					</button>
					<p className="text-sm mt-3">
						Already Registered?{" "}
						<span>
							<Link
								to="/login"
								className="underline text-blue-500"
							>
								Login here
							</Link>
						</span>
					</p>
				</form>
			</div>
		</>
	);
};

export default Register;
