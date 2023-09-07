import {useState} from "react";
import "./Categories.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import * as _ from "underscore";
//import {categories} from "../../data.ts";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },

    {
        field: "categoryName",
        type: "string",
        headerName: "Name",
        width: 150,
    },
    {
        field: "categoryDesc",
        type: "string",
        headerName: "Description",
        width: 250,
    },
    {
        field: "categoryType",
        type: "string",
        headerName: "Type",
        width: 200,
    },
    {
        field: "categoryLoc",
        type: "string",
        headerName: "Location",
        width: 150,
    },

];

const Categories = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allCategories"],
        queryFn: () =>
            fetch("https://sachadigi.com/freshdb/categories").then(
                (res) => res.json()
            ),
    });

    const desiredFormat = _.map(data, (item) => ({
        id: item.categoryId,
        ..._.omit(item, ['categoryId']), // Keep other properties as they are
    }));

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
                <DataTable slug="categories" edit="category" delete="category" columns={columns} rows={desiredFormat}/>
            )}
            {open && <Add slug="category" add="categoryInsert" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Categories;
