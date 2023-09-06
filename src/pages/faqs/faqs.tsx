import {useState} from "react";
import "./Faqs.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
// import { faqs } from "../../data";
import * as _ from "underscore";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },
    {
        field: "faqQuestion",
        type: "string",
        headerName: "Question",
        width: 150,
    },
    {
        field: "faqAnswer",
        type: "string",
        headerName: "Answer",
        width: 250,
    },
    {
        field: "faqAuthor",
        type: "string",
        headerName: "Author",
        width: 150,
    },
    {
        field: "faqCategory",
        type: "string",
        headerName: "Category",
        width: 150,
    },
    {
        field: "faqLoc",
        type: "String",
        headerName: "Location",
        width: 200,
    },
];

const Faqs = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allfaqs"],
        queryFn: () =>
            fetch("https://sachadigi.com/freshdb/faq").then(
                (res) => res.json()
            ),
    });

    const desiredFormat = _.map(data, (item) => ({
        id: item.faqId,
        ..._.omit(item, ['faqId']), // Keep other properties as they are
    }));

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
                <DataTable slug="faq" edit="faq" delete="faq" columns={columns} rows={desiredFormat}/>
            )}
            {open && <Add slug="faq" add="faqInsert" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Faqs;
