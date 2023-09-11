import {GridColDef} from "@mui/x-data-grid";
import "./add.scss";
import React, {ChangeEvent, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {DB_API_SERVER} from "../../config/config.ts";

type Props = {
    slug: string;
    add: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};


type FormData = Record<string, any>;

const Add = (props: Props) => {

    const queryClient = useQueryClient();
    const [formData, setFormData] = useState<FormData>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData({...formData, [name]: value});
    };


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        mutation.mutate(formData); // Pass formData directly to the mutate function
        props.setOpen(false);

    };

    const mutationFunction = async (formData: FormData) => {
        // Use formData as the request body
        return fetch(`${DB_API_SERVER}/freshdb/${props.add}`, {
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
        <div className="add">
            <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          X
        </span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter((item) => item.field !== "id" && item.field !== "img")
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

export default Add;
