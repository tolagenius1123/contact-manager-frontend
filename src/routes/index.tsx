import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/onboarding/Login";
import Register from "../pages/onboarding/Register";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import ProtectedRoutes from "./ProtectedRoutes";
import AddContact from "../pages/dashboard/AddContact";
import EditContact from "../pages/dashboard/EditContact";

const Routing = () => {
	return (
		<BrowserRouter>
			<Routes>
				{/* ONBOARDING ROUTES */}
				<Route path="/*" element={<Navigate to="/" />} />
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />

				{/* PROTECTED ROUTES */}
				<Route element={<ProtectedRoutes path="/login" />}>
					<Route path="dashboard" element={<DashboardLayout />} />
					<Route path="add-contact" element={<AddContact />} />
					<Route path="edit-contact/:id" element={<EditContact />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Routing;
