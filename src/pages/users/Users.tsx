import {GridColDef} from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import "./Users.scss";
import {useState} from "react";
import Add from "../../components/add/Add";
//import {users} from "../../data.ts";
import {useQuery} from "@tanstack/react-query";
import {DB_API_SERVER} from "../../config/config.ts";

const columns: GridColDef[] = [
    {field: "id", headerName: "ID", width: 90},
    {
        field: "img",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt=""/>;
        },
    },
    {
        field: "firstName",
        type: "string",
        headerName: "First name",
        width: 150,
        editable:true
    },
    {
        field: "lastName",
        type: "string",
        headerName: "Last name",
        width: 150,
        editable:true
    },
    {
        field: "dob",
        type: 'date',
        headerName: "Age",
        width: 150,
        editable:true,
        valueGetter: (params) => new Date(params.row.dob)
    },
    {
        field: "email",
        headerName: "Email",
        width: 150,
        editable:true,
        cellClassName: (params) =>
            params.row.emailError ? 'error-cell' : '',
        renderCell: (params) => (
            <div className="editable-cell">
                {params.row.emailError ? (
                    <div className="error-text">
                        {params.row.emailError}
                    </div>
                ) : (
                    params.row.email
                )}
            </div>
        ),
        renderEditCell: (params) => (
            <input
                type="text"
                value={params.row.email}
                onChange={(e) =>
                    handleEmailChange(params, e.target.value)
                }
                onBlur={() => validateEmail(params.row)}
            />
        ),
    },

    // {
    //   field: "email",
    //   type: "string",
    //   headerName: "Email",
    //   width: 200,
    // },
    // {
    //   field: "mobile",
    //   type: "string",
    //   headerName: "Mobile",
    //   width: 100,
    // },
    // {
    //   field: "role",
    //   type: "string",
    //   headerName: "Role",
    //   width: 75,
    // },
    // {
    //   field: "userName",
    //   type: "string",
    //   headerName: "User name",
    //   width: 150,
    // },
    // {
    //   field: "password",
    //   type: "string",
    //   headerName: "Password",
    //   width: 100,
    // },
    //   //Address
    // {
    //   field: "boxNo",
    //   type: "string",
    //   headerName: "Box No.",
    //   width: 75,
    // },
    // {
    //   field: "StreetName",
    //   type: "string",
    //   headerName: "StreetName",
    //   width: 100,
    // },
    // {
    //   field: "houseNo",
    //   type: "string",
    //   headerName: "House No.",
    //   width: 100,
    // },
    // {
    //   field: "addressLine",
    //   type: "string",
    //   headerName: "AddressLine",
    //   width: 200,
    // },
    // {
    //   field: "postcode",
    //   type: "string",
    //   headerName: "PostCode",
    //   width: 100,
    // },
    // {
    //   field: "city",
    //   type: "string",
    //   headerName: "City",
    //   width: 100,
    // },
    // {
    //   field: "country",
    //   type: "string",
    //   headerName: "Country",
    //   width: 100,
    // },
];


const handleEmailChange = (params:any, value:any) => {
    params.api.setEditCellValue({
        id: params.id,
        field: 'email',
        value,
    });
};

const validateEmail = (row: any) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (!emailRegex.test(row.email)) {
        row.emailError = 'Invalid email address';
    } else {
        row.emailError = null;
    }
};

const Users = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allusers"],
        queryFn: () =>
            fetch(`${DB_API_SERVER}/freshdb/users`).then(
                (res) => res.json()
            ),
    });

    return (
        <div className="users">
            <div className="info">
                <h1>Users</h1>
                <button onClick={() => setOpen(true)}>Add New User</button>
            </div>
            {/*<DataTable slug="users" columns={columns} rows={users} />*/}
            {/* TEST THE API */}

            {isLoading ? (
                "Loading..."
            ) : (
                <DataTable slug="user" edit="user" delete="user" columns={columns} rows={data}/>
            )}
            {open && <Add slug="user" add="user" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Users;
