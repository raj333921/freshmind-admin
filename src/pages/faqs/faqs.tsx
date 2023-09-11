import {useState} from "react";
import "./Faqs.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
// import { faqs } from "../../data";
import * as _ from "underscore";
import {DB_API_SERVER} from "../../config/config.ts";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },
    {
        field: "question",
        type: "string",
        headerName: "Question",
        width: 150,
        editable:true
    },
    {
        field: "answer",
        type: "string",
        headerName: "Answer",
        width: 250,
        editable:true
    },
    {
        field: "author",
        type: "string",
        headerName: "Author",
        width: 150,
        editable:true
    },
    {
        field: "category",
        type: "string",
        headerName: "Category",
        width: 150,
        editable:true
    },
    {
        field: "location",
        type: "String",
        headerName: "Location",
        width: 200,
        editable:true
    },
];

const Faqs = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allfaqs"],
        queryFn: () =>
            fetch(`${DB_API_SERVER}/freshdb/faqs`).then(
                (res) => res.json()
            ),
    });


    return (
        <div className="faqs">
            <div className="info">
                <h1>Faqs</h1>
                <button onClick={() => setOpen(true)}>Add New Faqs</button>
            </div>
            {/*<DataTable slug="faqs" columns={columns} rows={faqs} />*/}
            {/* TEST THE API */}

            {isLoading ? (
                "Loading..."
            ) : (
                <DataTable slug="faq" edit="faq" delete="faq" columns={columns} rows={data}/>
            )}
            {open && <Add slug="faq" add="faq" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Faqs;
