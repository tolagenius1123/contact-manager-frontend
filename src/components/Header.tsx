import { Link, useNavigate } from "react-router-dom";
import { MdFactCheck, MdPersonAdd, BiLogOut } from "../assets/icons";
import avatar from "@images/avatar.svg";
import { useEffect, useState } from "react";

const Header = () => {
	const navigate = useNavigate();
	const [userEmail, setUserEmail] = useState("");

	const getUserEmail = () => {
		const user = localStorage.getItem("user");

		if (user) {
			const userDetails = JSON.parse(user);
			setUserEmail(userDetails?.email);
		}
	};

	const logOut = () => {
		localStorage.removeItem("user");
		navigate("/");
		// window.location.reload();
	};

	useEffect(() => {
		getUserEmail();
	}, []);

	return (
		<div className="w-full h-[70px] bg-blue-500 fixed z-10 text-white px-10 flex items-center justify-between">
			<div className="flex items-center justify-between gap-2">
				<MdFactCheck style={{ fontSize: "30px" }} />
				<h2 className="font-semibold text-xl">Contacts Manager</h2>
			</div>
			<div className="flex items-center justify-between gap-10">
				<div className="flex items-center gap-2 cursor-pointer">
					<img
						src={avatar}
						alt="user_image"
						className="h-[30px] w-[30px] rounded-[50%]"
					/>
					{/* <p>tolajinadu1123@gmail.com</p> */}
					<p>{userEmail}</p>
				</div>
				<div className="flex items-center gap-2 cursor-pointer">
					<MdPersonAdd style={{ fontSize: "20px" }} />
					<Link to="/add-contact">Add Contact</Link>
				</div>
				<div className="flex items-center gap-2 cursor-pointer">
					<BiLogOut style={{ fontSize: "20px" }} />
					<button className="cursor-pointer" onClick={() => logOut()}>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default Header;
