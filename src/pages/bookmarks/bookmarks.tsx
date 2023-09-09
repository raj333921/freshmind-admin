import {useState} from "react";
import "./Bookmarks.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
// import * as _ from "underscore";
import {DB_API_SERVER} from "../../config/config.ts";
// import { AxiosResponse,AxiosError } from 'axios';
// import axios from 'axios';
//import {bookmarks} from "../../data.ts";

const Bookmarks = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allindexes"],
        queryFn: () =>
            fetch(`${DB_API_SERVER}/freshdb/indexes`).then(
                (res) => res.json()
            ),
    });

    // const apiUrl = `${DB_API_SERVER}/freshdb/categories`;
    //
    // let responseData:any;
    //
    // axios.get(apiUrl)
    //     .then((response: AxiosResponse)  => {  responseData = response.data;        })
    //     .catch((error:AxiosError) => {
    //         console.error('Error:', error);
    //     });
    //
    // const dropDown = _.pluck(responseData, 'name');

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 90,
        },

        {
            field: "name",
            type: "string",
            headerName: "Name",
            width: 150,
            editable:true
        },
        {
            field: "description",
            type: "string",
            headerName: "Description",
            width: 250,
            editable:true
        },
        {
            field: "url",
            type: "string",
            headerName: "URL",
            width: 150,
            editable:true
        },
        {
            field: "type",
            type: "string",
            headerName: "Type",
            width: 100,
            editable:true
        },
        {
            field: "categoryId",
            type: "string",
            headerName: "Category",
            width: 100,
            editable:true
        },
        {
            field: "indexesLoc",
            type: "string",
            headerName: "Location",
            width: 150,
            editable:true
        },

    ];


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
                <DataTable slug="indexe" edit="index" delete="index" columns={columns} rows={data}/>
            )}
            {open && <Add slug="indexe" add="index" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Bookmarks;
