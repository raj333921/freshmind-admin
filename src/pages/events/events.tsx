import { useState } from "react";
import "./Events.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import {useQuery} from "@tanstack/react-query";
import * as _ from 'underscore';

const columns: GridColDef[] = [
    {
        field: "id",
        headerName: "ID",
        width: 90
    },
    {
        field: "banner",
        headerName: "Image",
        width: 100,
        renderCell: (params) => {
            return <img src={params.row.img || "/noavatar.png"} alt="" />;
        },
    },
    {
        field: "eventName",
        type: "string",
        headerName: "Name",
        width: 150,
    },
    // {
    //     field: "description",
    //     type: "string",
    //     headerName: "Description",
    //     width: 250,
    // },
    {
        field: "type",
        type: "string",
        headerName: "Type",
        width: 150,
    },
    {
        field: "eventStartDate",
        type: "string",
        headerName: "StartDate",
        width: 200,
    },
    {
        field: "eventEndDate",
        type: "string",
        headerName: "EndDate",
        width: 200,
    },
    {
        field: "whatsapp",
        type: "string",
        headerName: "Whatsapp",
        width: 200,
    },
    {
        field: "website",
        type: "string",
        headerName: "Website",
        width: 150,
    },
    // {
    //     field: "instagram",
    //     type: "string",
    //     headerName: "Instagram",
    //     width: 150,
    // },
    {
        field: "facebook",
        type: "string",
        headerName: "Facebook",
        width: 150,
    },
    {
        field: "created_at",
        type: "string",
        headerName: "created At",
        width: 200,
    },
    {
        field: "updated_at",
        type: "string",
        headerName: "updated At",
        width: 200,
    },
    // {
    //     field: "googleForm",
    //     type: "string",
    //     headerName: "Google Form",
    //     width: 150,
    // },
];

const Events = () => {
    const [open, setOpen] = useState(false);

    // TEST THE API

    const { isLoading, data } = useQuery({
      queryKey: ["allevents"],
      queryFn: () =>
        fetch("https://sachadigi.com/freshdb/events").then(
          (res) => res.json()
        ),
    });

    const desiredFormat = _.map(data, (item) => ({
        id: item.eventId,
        ..._.omit(item, ['eventId']), // Keep other properties as they are
    }));

    return (
        <div className="events">
            <div className="info">
                <h1>Events</h1>
                <button onClick={() => setOpen(true)}>Add New Events</button>
            </div>
            {/*<DataTable slug="events" columns={columns} rows={data} />*/}
            {/* TEST THE API */}

            {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="events" columns={columns} rows={desiredFormat} />
      )}
            {open && <Add slug="event" columns={columns} setOpen={setOpen} />}
        </div>
    );
};

export default Events;
