import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridEventListener,
    GridRowEditStopReasons,
    GridRowId,
    GridRowModel,
    GridRowModes,
    GridRowModesModel,
    GridToolbar,

} from "@mui/x-data-grid";
import "./dataTable.scss";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {DB_API_SERVER} from "../../config/config.ts";

type Props = {
    columns: GridColDef[];
    rows: object[];
    edit: string;
    delete: string;
    slug: string;
};

const DataTable = (props: Props) => {

    const queryClient = useQueryClient();

    const mutationDelete = useMutation({
        mutationFn: (id: GridRowId) => {
            return fetch(`${DB_API_SERVER}/freshdb/${props.delete}/${id}`, {
                method: "delete",
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}`]);
        }
    });


    const handleDelete = async (id: GridRowId) => {
        //delete the item
        mutationDelete.mutate(id)
    };

    const mutateRow = async (newRow:GridRowModel) => {
        try {
            const response = await fetch(`${DB_API_SERVER}/freshdb/${props.edit}`, {
                method: "post",
                body: JSON.stringify(newRow),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("Failed to update row");
            }
            await queryClient.invalidateQueries([`all${props.slug}`]);
            return response;
        } catch (error) {
            console.error("Error updating row:", error);
            throw error; // Rethrow the error to be handled by React Query
        }
    };


    const [rows, setRows] = React.useState(props.rows);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
        window.location.reload();
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        // @ts-ignore
        setRows(rows.filter((row) => row.id !== id))
        handleDelete(id);
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // @ts-ignore
        const editedRow = rows.find((row) => row.id === id);
        // @ts-ignore
        if (editedRow!.isNew) {
            // @ts-ignore
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = React.useCallback(
        async (newRow: GridRowModel) => {
            const response = await mutateRow(newRow);
            return response;
        },
        [mutateRow],
    );

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const actionsCol: GridColDef={

        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        renderCell: (params) => {
            const isInEditMode = rowModesModel[params.row.id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(params.row.id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(params.row.id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                <GridActionsCellItem
                    icon={<EditIcon />}
                    label="Edit"
                    className="textPrimary"
                    onClick={handleEditClick(params.row.id)}
                    color="inherit"
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={handleDeleteClick(params.row.id)}
                    color="inherit"
                />,
            ];
        },

    };


    return (
        <div className="dataTable">
            <DataGrid
                className="dataGrid"
                rows={props.rows}
                columns={[...props.columns, actionsCol]}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                slots={{toolbar: GridToolbar}}
                slotProps={{
                    toolbar: {
                        setRows, setRowModesModel,
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
        </div>
    );
};

export default DataTable;
