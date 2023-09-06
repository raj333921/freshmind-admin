import {
    DataGrid,
    GridColDef,
    GridToolbar, useGridApiRef,
} from "@mui/x-data-grid";
import "./dataTable.scss";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import Edit from "../edit/edit.tsx";
// import { useMutation, useQueryClient } from "@tanstack/react-query";

type Props = {
    columns: GridColDef[];
    rows: object[];
    edit: string;
    delete: string;
    slug: string;
};

const DataTable = (props: Props) => {

    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const mutationDelete = useMutation({
        mutationFn: (id: number) => {
            return fetch(`https://sachadigi.com/freshdb/${props.delete}/${id}`, {
                method: "delete",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        }
    });

    // const mutationEdit = useMutation({
    //     mutationFn: (id: number) => {
    //         return fetch(`https://sachadigi.com/freshdb/${props.delete}/${id}`, {
    //             method: "delete",
    //         });
    //     },
    //     onSuccess: () => {
    //         queryClient.invalidateQueries([`all${props.slug}`]);
    //     }
    // });

    const handleDelete = async (id: number) => {
        //delete the item
        mutationDelete.mutate(id)

        await sleep(1000);
        window.location.reload();
    };

    const [editRowId, setEditRowId] = useState<number | null>(null);

    const handleEdit = (rowId:number) => {
        setEditRowId(rowId);
        setOpen(true);
    };

    const actionColumn: GridColDef = {
        field: "action",
        headerName: "Action",
        width: 150,
        renderCell: (params) => {

            return (
                <div className="action">
                    <img src="/view.svg" alt="" onClick={() => handleEdit(params.row.id)}/>
                    <div className="delete" onClick={() => handleDelete(params.row.id)}>
                        <img src="/delete.svg" alt=""/>
                    </div>
                </div>
            );
        },
    };

    const apiRef = useGridApiRef();

    const handleRowEditStart = (event:any) => {
        event.defaultMuiPrevented = true;
    };

    const handleRowEditStop = ( event:any) => {
        event.defaultMuiPrevented = true;
    };

    return (
        <div className="dataTable">
            <DataGrid
                className="dataGrid"
                rows={props.rows}
                columns={[...props.columns, actionColumn]}
                editMode={"row"}
                apiRef={apiRef}
                onRowEditStart={handleRowEditStart}
                onRowEditStop={handleRowEditStop}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{toolbar: GridToolbar}}
                slotProps={{
                    toolbar: {apiRef,
                        showQuickFilter: true,
                        quickFilterProps: {debounceMs: 500},
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
                disableColumnFilter
                disableDensitySelector
                disableColumnSelector
            />
            {open && <Edit slug={props.slug} edit={props.edit} columns={props.columns} setOpen={setOpen} rowId={editRowId} rows={props.rows}/>}
        </div>
    );
};

export default DataTable;
