import {useState} from "react";
import "./Categories.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import * as _ from "underscore";
import {DB_API_SERVER} from "../../config/config.ts";
//import {categories} from "../../data.ts";

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
        field: "type",
        type: "string",
        headerName: "Type",
        width: 200,
        editable:true
    },
    {
        field: "location",
        type: "string",
        headerName: "Location",
        width: 150,
        editable:true
    },

];

const Categories = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allCategories"],
        queryFn: () =>
            fetch(`${DB_API_SERVER}/freshdb/categories`).then(
                (res) => res.json()
            ),
    });
    return (
        <div className="categories">
            <div className="info">
                <h1>Categories</h1>
                <button onClick={() => setOpen(true)}>Add New Categories</button>
            </div>
            {/*<DataTable slug="categories" columns={columns} rows={categories} />*/}
            {/* TEST THE API */}

            {isLoading ? (
                "Loading..."
            ) : (
                <DataTable slug="categories" edit="category" delete="category" columns={columns} rows={data}/>
            )}
            {open && <Add slug="category" add="category" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Categories;
