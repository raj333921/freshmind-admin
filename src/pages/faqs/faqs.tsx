import { useState } from "react";
import "./Faqs.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { faqs } from "../../data";

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
    },
    {
        field: "answer",
        type: "string",
        headerName: "Answer",
        width: 250,
    },
    {
        field: "hyperlinks",
        type: "string",
        headerName: "Hyperlinks",
        width: 150,
    },
    {
        field: "isApproved",
        type: "boolean",
        headerName: "IsApproved",
        width: 100,
    },
    {
        field: "validUpto",
        type: "String",
        headerName: "ValidUpto",
        width: 200,
    },
];

const Faqs = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    // const { isLoading, data } = useQuery({
    //   queryKey: ["allfaqs"],
    //   queryFn: () =>
    //     fetch("http://localhost:8800/api/faqs").then(
    //       (res) => res.json()
    //     ),
    // });

    return (
        <div className="faqs">
            <div className="info">
                <h1>Faqs</h1>
                <button onClick={() => setOpen(true)}>Add New Faqs</button>
            </div>
            <DataTable slug="faqs" columns={columns} rows={faqs} />
            {/* TEST THE API */}

            {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="faqs" columns={columns} rows={data} />
      )} */}
            {open && <Add slug="faq" columns={columns} setOpen={setOpen} />}
        </div>
    );
};

export default Faqs;
