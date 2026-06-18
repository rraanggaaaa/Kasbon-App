import { Debt } from "@/app/types/debt";

type Props = {

    debts: Debt[];

    onDelete:

    (id: string)

        => void;


    onToggle:

    (

        id: string,

        settled: boolean

    ) => void;

};


export default function

    DebtTable({

        debts,

        onDelete,

        onToggle,

    }: Props) {

    return (

        <table

            className="

w-full

"

        >

            <thead>

                <tr>

                    <th>Nama</th>

                    <th>Tipe</th>

                    <th>Jumlah</th>

                    <th>Status</th>

                    <th>Aksi</th>

                </tr>

            </thead>


            <tbody>

                {

                    debts.map(

                        (debt) => (

                            <tr

                                key={

                                    debt.id

                                }

                            >

                                <td>

                                    {

                                        debt

                                            .counterpart_name

                                    }

                                </td>

                                <td>

                                    {

                                        debt.type ===

                                            "owed_to_me"

                                            ?

                                            "Dihutangi"

                                            :

                                            "Saya Hutang"

                                    }

                                </td>

                                <td>

                                    Rp

                                    {

                                        debt.amount

                                            .toLocaleString(

                                                "id-ID"

                                            )

                                    }

                                </td>

                                <td>

                                    {

                                        debt

                                            .settled_at

                                            ?

                                            "Lunas"

                                            :

                                            "Belum"

                                    }

                                </td>

                                <td>

                                    <div

                                        className="

flex

gap-2

"

                                    >

                                        <button>

                                            Edit

                                        </button>

                                        <button

                                            onClick={() =>

                                                onDelete(

                                                    debt.id

                                                )

                                            }

                                        >

                                            Hapus

                                        </button>

                                        <button

                                            onClick={() =>

                                                onToggle(

                                                    debt.id,

                                                    !!debt

                                                        .settled_at

                                                )

                                            }

                                        >

                                            {

                                                debt

                                                    .settled_at

                                                    ?

                                                    "Batal"

                                                    :

                                                    "Lunas"

                                            }

                                        </button>

                                    </div>

                                </td>

                            </tr>

                        )

                    )

                }

            </tbody>

        </table>

    );

}