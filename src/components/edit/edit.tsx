import {GridColDef} from "@mui/x-data-grid";
import "./edit.scss";
import React, {ChangeEvent, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";

type Props = {
    slug: string;
    edit: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    rows: object[];
    rowId:any;
};


type FormData = Record<string, any>;

const Edit = (props: Props) => {

    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<FormData>({});
    const [formElements] = useState(props.columns);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };

    const formData2: Record<string, any> = {};
    formElements.forEach((column) => {
        formData2[column.field] = formData2[column.field] || "";
    });

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate(formData); // Pass formData directly to the mutate function
        props.setOpen(false);

        await sleep(1000);
        window.location.reload();
    };

    const mutationFunction = async (formData: FormData) => {
        // Use formData as the request body
        return fetch(`https://sachadigi.com/freshdb/${props.edit}`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });
    };

    const mutation = useMutation(mutationFunction, {
        onSuccess: () => {
            queryClient.invalidateQueries([`all${props.slug}s`]);
        },
    });

    return (
        <div className="edit">
            <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
                <h1>Edit {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter((item) => item.field !== "img")
                        .map((column) => (
                            <div className="item">
                                <label>{column.headerName}</label>
                                <input type={column.type} placeholder={column.field} name={column.field}
                                       value={formData[column.field] || ""}
                                       onChange={handleChange}/>
                            </div>
                        ))}
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Edit;
