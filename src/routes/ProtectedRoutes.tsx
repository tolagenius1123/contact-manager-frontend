import { Navigate, Outlet } from "react-router-dom";

interface PropTypes {
	path: string;
}

const ProtectedRoutes = ({ path }: PropTypes) => {
	const user = localStorage.getItem("user");

	return !user ? <Navigate to={path} /> : <Outlet />;
};

export default ProtectedRoutes;
