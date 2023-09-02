import { useState } from "react";
import "./Bookmarks.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { bookmarks } from "../../data";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },
    {
        field: "img",
        headerName: "Image",
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt="" />;
        },
    },
    {
        field: "name",
        type: "string",
        headerName: "Name",
        width: 150,
    },
    {
        field: "description",
        type: "string",
        headerName: "Description",
        width: 250,
    },
    {
        field: "category",
        type: "string",
        headerName: "Category",
        width: 150,
    },
    {
        field: "hyperlinks",
        type: "string",
        headerName: "Hyperlinks",
        width: 200,
    },
    {
        field: "information",
        type: "string",
        headerName: "Information",
        width: 200,
    },
    {
        field: "isActive",
        type: "boolean",
        headerName: "IsActive",
        width: 100,
    },
];

const Bookmarks = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    // const { isLoading, data } = useQuery({
    //   queryKey: ["allbookmarks"],
    //   queryFn: () =>
    //     fetch("http://localhost:8800/api/bookmarks").then(
    //       (res) => res.json()
    //     ),
    // });

    return (
        <div className="bookmarks">
            <div className="info">
                <h1>Bookmarks</h1>
                <button onClick={() => setOpen(true)}>Add New Bookmarks</button>
            </div>
            <DataTable slug="bookmarks" columns={columns} rows={bookmarks} />
            {/* TEST THE API */}

            {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="bookmarks" columns={columns} rows={data} />
      )} */}
            {open && <Add slug="product" columns={columns} setOpen={setOpen} />}
        </div>
    );
};

export default Bookmarks;
