import { Box, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import {
	deleteContact,
	getContacts,
} from "../services/actions/dashboard-actions";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Contacts = () => {
	interface User {
		_id: string;
		user: string;
		fullname: string;
		phoneNumber: string;
		address: string;
		createdAt: string;
		updatedAt: string;
		__v: number;
	}

	const [data, setData] = useState<User[]>([]);
	const navigate = useNavigate();

	const sortedContacts = [...data].sort((a, b) => {
		const dateA: any = new Date(a.createdAt);
		const dateB: any = new Date(b.createdAt);
		return dateB - dateA;
	});

	const handleDelete = async (contactId: any) => {
		const response = await deleteContact(contactId);

		console.log(response);
		if (response.status === 200) {
			toast.success("Contact deleted successfully", {
				id: "1",
			});
			getUserContacts();
		} else {
			toast.error(response.response.data.message, {
				id: "1",
			});
		}
	};

	const columns: GridColDef[] = [
		// {
		// 	field: "_id",
		// 	headerName: "Unique Id",
		// 	width: 150,
		// 	headerClassName: "headerStyle",
		// },
		{
			field: "fullname",
			headerName: "Fullname",
			width: 150,
			headerClassName: "headerStyle",
		},
		{
			field: "phoneNumber",
			headerName: "Phone number",
			width: 150,
			headerClassName: "headerStyle",
		},
		{
			field: "address",
			headerName: "Address",
			width: 200,
			headerClassName: "headerStyle",
		},
		{
			field: "createdAt",
			headerName: "Date Created",
			width: 150,
			headerClassName: "headerStyle",
			valueGetter: ({ value }: any) =>
				new Date(value).toLocaleDateString(),
		},
		{
			field: "actions",
			headerName: "Actions",
			width: 200,
			sortable: false,
			align: "center",
			headerAlign: "center",
			headerClassName: "headerStyle",
			renderCell: (params: GridRenderCellParams) => {
				return (
					<div className="flex items-center gap-2 text-white">
						<button
							className="bg-blue-500 px-4 py-1 rounded-md cursor-pointer"
							onClick={() =>
								navigate(`/edit-contact/${params.id}`)
							}
						>
							Edit
						</button>
						<button
							className="bg-blue-500 px-4 py-1 rounded-md cursor-pointer"
							onClick={() => handleDelete(params.id)}
						>
							Delete
						</button>
					</div>
				);
			},
		},
	];

	const getUserContacts = async () => {
		const response = await getContacts();
		console.log(response);
		if (response.status === 200) {
			setData(response.data);
		} else {
			toast.error("Error in retrieving contacts", { id: "1" });
		}
	};

	useEffect(() => {
		getUserContacts();
	}, []);

	return (
		<>
			<Toaster position="top-right" reverseOrder={false} />
			<div className="h-screen w-full pt-[100px] flex justify-around bg-gray-100">
				<Box
					sx={{
						height: 400,
						width: "70%",
						background: "white",
						borderRadius: 2,
						boxShadow: "0 0 20px rgba(0, 0, 0, 0.15)",
						"& .headerStyle": {
							fontSize: "16px",
						},
					}}
				>
					<Typography
						variant="h4"
						component="h4"
						sx={{ textAlign: "center", mt: 3, mb: 3 }}
					>
						Manage Contacts
					</Typography>
					<DataGrid
						columns={columns}
						rows={sortedContacts}
						getRowId={(row) => row._id}
						initialState={{
							pagination: {
								paginationModel: {
									pageSize: 5,
								},
							},
						}}
						pageSizeOptions={[5]}
						sx={{
							background: "white",
							boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
							padding: "15px",
						}}
					/>
				</Box>
			</div>
		</>
	);
};

export default Contacts;
