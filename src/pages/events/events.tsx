import {useState} from "react";
import "./Events.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import {GridColDef} from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import * as _ from 'underscore';
import {DB_API_SERVER} from "../../config/config.ts";

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 50
    },
    {
        field: "banner",
        headerName: "Image",
        width: 80,
        editable:true,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt=""/>;
        },
    },
    {
        field: "price",
        type: "string",
        headerName: "Price",
        width: 80,
        editable:true
    },
    {
        field: "name",
        type: "string",
        headerName: "Name",
        width: 150,
        editable:true
    },
    {
        field: "type",
        type: "string",
        headerName: "Type",
        width: 150,
        editable:true
    },
    {
        field: "startDate",
        type: 'date',
        headerName: "StartDate",
        width: 150,
        editable:true,
        valueGetter: (params) => new Date(params.row.startDate)
    },
    {
        field: "endDate",
        type: 'date',
        headerName: "EndDate",
        width: 150,
        editable:true,
        valueGetter: (params) => new Date(params.row.endDate)
    },
    {
        field: "whatsapp",
        type: "string",
        headerName: "Whatsapp",
        width: 150,
        editable:true
    },
    {
        field: "website",
        type: "string",
        headerName: "Website",
        width: 100,
        editable:true
    },
    {
        field: "mapLocation",
        type: "string",
        headerName: "Location",
        width: 100,
        editable:true
    },
    {
        field: "location",
        type: "string",
        headerName: "City",
        width: 50,
        editable:true
    },
    {
        field: "facebook",
        type: "string",
        headerName: "Facebook",
        width: 100,
        editable:true
    },
];

const Events = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const {isLoading, data} = useQuery({
        queryKey: ["allevents"],
        queryFn: () =>
            fetch(`${DB_API_SERVER}/freshdb/events`).then(
                (res) => res.json()
            ),
    });

    // Function to update the string date to a formatted date string
    function updateDateStringToDate(data:any) {
        return _.map(_.sortBy(data, 'startDate','DESC').reverse(), (item) => {
            const startDate = new Date(item.startDate);
            const endDate = new Date(item.endDate);

            return {
                ...item,
                startDate: startDate.toDateString(),
                endDate: endDate.toDateString(),
            };
        });
    }

    const updatedData = updateDateStringToDate(data);

    return (
        <div className="events">
            <div className="info">
                <h1>Events</h1>
                <button onClick={() => setOpen(true)}>Add New Events</button>
            </div>
            {/*<DataTable slug="events" columns={columns} rows={data} />*/}

            {isLoading ? (
                "Loading..."
            ) : (
                <DataTable slug="event" edit="event" delete="event" columns={columns} rows={updatedData}/>
            )}
            {open && <Add slug="event" add="event" columns={columns} setOpen={setOpen}/>}
        </div>
    );
};

export default Events;
