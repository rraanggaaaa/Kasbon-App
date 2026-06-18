type Props = {

    title: string;

    value: number;

};


export default function

    SummaryCard({

        title,

        value,

    }: Props) {

    return (

        <div

            className="

rounded-xl

border

p-6

"

        >

            <p

                className="

text-sm

text-gray-500

"

            >

                {title}

            </p>

            <h2

                className="

text-2xl

font-bold

mt-2

"

            >

                {

                    new Intl

                        .NumberFormat(

                            "id-ID",

                            {

                                style:

                                    "currency",

                                currency:

                                    "IDR",

                                maximumFractionDigits:

                                    0,

                            }

                        )

                        .format(value)

                }

            </h2>

        </div>

    );

}