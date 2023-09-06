import {useState} from "react";
import "./Bookmarks.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import * as _ from "underscore";
//import {bookmarks} from "../../data.ts";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },

    // {
    //     field: "indexesLoc",
    //     headerName: "Image",-
    //     width: 100,
    //     renderCell: (params) => {
    //         return <img src={params.row.img || "/noavatar.png"} alt="" />;
    //     },
    // },
    {
        field: "indexesName",
        type: "string",
        headerName: "Name",
        width: 150,
    },
    {
        field: "indexesDesc",
        type: "string",
        headerName: "Description",
        width: 250,
    },
    {
        field: "indexesURL",
        type: "string",
        headerName: "URL",
        width: 150,
    },
    {
        field: "indexesType",
        type: "string",
        headerName: "Type",
        width: 200,
    },
    {
        field: "categoryId",
        type: "string",
        headerName: "Category Id",
        width: 100,
    },
    {
        field: "indexesLoc",
        type: "string",
        headerName: "Location",
        width: 150,
    },

];

const Bookmarks = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allindexes"],
        queryFn: () =>
            fetch("https://sachadigi.com/freshdb/indexes").then(
                (res) => res.json()
            ),
    });

    const desiredFormat = _.map(data, (item) => ({
        id: item.indexesId,
        ..._.omit(item, ['indexesId']), // Keep other properties as they are
    }));

    return (
        <div className="bookmarks">
            <div className="info">
                <h1>Bookmarks</h1>
                <button onClick={() => setOpen(true)}>Add New Bookmarks</button>
            </div>
            {/*<DataTable slug="bookmarks" columns={columns} rows={bookmarks} />*/}
            {/* TEST THE API */}

            {isLoading ? (
                "Loading..."
            ) : (
                <DataTable slug="indexe" edit="indexesInsert" delete="indexes" columns={columns} rows={desiredFormat}/>
            )}
            {open && <Add slug="indexe" add="indexesInsert" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Bookmarks;
