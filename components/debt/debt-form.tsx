"use client";

import { useForm } from "react-hook-form";

import {

    zodResolver,

}

    from

    "@hookform/resolvers/zod";

import {

    debtSchema,

    type DebtInput,

}

    from

    "@/lib/validations/debt";

type Props = {

    defaultValues?:

    Partial<DebtInput>;

    onSubmit:

    (

        values: DebtInput

    ) => Promise<void>;

};


export default function

    DebtForm({

        defaultValues,

        onSubmit,

    }: Props) {

    const form =

        useForm<DebtInput>({

            resolver:

                zodResolver(

                    debtSchema

                ),

            defaultValues: {

                type:

                    "owed_to_me",

                counterpart_name: "",

                amount: 0,

                note: "",

                due_date: "",

                ...defaultValues,

            },

        });


    return (

        <form

            className="space-y-4"

            onSubmit={

                form.handleSubmit(

                    onSubmit

                )

            }

        >

            <select

                className="

w-full

border

rounded-lg

p-3

"

                {

                ...form.register(

                    "type"

                )

                }

            >

                <option

                    value=

                    "owed_to_me"

                >

                    Dihutangi Saya

                </option>

                <option

                    value=

                    "i_owe"

                >

                    Saya Berhutang

                </option>

            </select>


            <input

                placeholder="Nama"

                className="

w-full

border

rounded-lg

p-3

"

                {

                ...form.register(

                    "counterpart_name"

                )

                }

            />


            <input

                type="number"

                placeholder="Jumlah"

                className="

w-full

border

rounded-lg

p-3

"

                {

                ...form.register(

                    "amount",

                    {

                        valueAsNumber:

                            true,

                    }

                )

                }

            />


            <input

                type="date"

                className="

w-full

border

rounded-lg

p-3

"

                {

                ...form.register(

                    "due_date"

                )

                }

            />


            <textarea

                placeholder="Catatan"

                className="

w-full

border

rounded-lg

p-3

"

                {

                ...form.register(

                    "note"

                )

                }

            />


            <button

                className="

w-full

bg-[#39FF14]

text-black

font-bold

rounded-lg

p-3

"

            >

                Simpan

            </button>

        </form>

    );

}