"use client";

import {

    useMemo,

    useState,

}

    from

    "react";

import {

    toast,

}

    from

    "sonner";

import

useUser

    from

    "@/hooks/use-user";

import

useDebts

    from

    "@/hooks/use-debts";

import

SummaryCard

    from

    "@/components/dashboard/summary-card";

import

DebtTable

    from

    "@/components/dashboard/debt-table";


export default function

    DashboardPage() {

    const user =

        useUser();


    const

        [query,

            setQuery]

            =

            useState("");


    const {

        data:

        debts,

        loading,

        refetch,

    }

        =

        useDebts(query);


    const summary =

        useMemo(() => {


            const owed =

                debts

                    .filter(

                        d =>

                            d.type ===

                            "owed_to_me"

                    )

                    .reduce(

                        (a, b) =>

                            a + b.amount,

                        0

                    );


            const owe =

                debts

                    .filter(

                        d =>

                            d.type ===

                            "i_owe"

                    )

                    .reduce(

                        (a, b) =>

                            a + b.amount,

                        0

                    );


            return {

                owed,

                owe,

                net:

                    owed - owe,

            };

        }, [debts]);


    async function

        deleteDebt(

            id: string

        ) {

        const res =

            await fetch(

                `/api/debts/${id}`,

                {

                    method:

                        "DELETE",

                }

            );


        if (

            res.ok

        ) {

            toast.success(

                "Berhasil dihapus"

            );

            refetch();

        }

    }


    async function

        toggleDebt(

            id: string,

            settled: boolean

        ) {

        const res =

            await fetch(

                `/api/debts/${id}`,

                {

                    method:

                        "PATCH",

                    headers: {

                        "Content-Type":

                            "application/json"

                    },

                    body:

                        JSON.stringify({

                            settled_at:

                                settled

                                    ? null

                                    :

                                    new Date()

                                        .toISOString(),

                        })

                }

            );


        if (

            res.ok

        ) {

            toast.success(

                "Berhasil"

            );

            refetch();

        }

    }


    return (

        <div

            className="

max-w-7xl

mx-auto

p-8

space-y-8

"

        >

            <h1

                className="

text-3xl

font-bold

"

            >

                Halo,

                {

                    user?.email

                }

            </h1>


            <div

                className="

grid

grid-cols-3

gap-4

"

            >

                <SummaryCard

                    title=

                    "Total Dihutangi"

                    value=

                    {

                        summary

                            .owed

                    }

                />


                <SummaryCard

                    title=

                    "Total Hutang"

                    value=

                    {

                        summary

                            .owe

                    }

                />


                <SummaryCard

                    title=

                    "Net"

                    value=

                    {

                        summary

                            .net

                    }

                />

            </div>


            <DebtTable

                debts=

                {

                    debts

                }

                onDelete=

                {

                    deleteDebt

                }

                onToggle=

                {

                    toggleDebt

                }

            />

        </div>

    );

}