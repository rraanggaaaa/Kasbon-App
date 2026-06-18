import {

    UseFormRegister,

    FieldError,

} from

    "react-hook-form";


type Props = {

    register:

    UseFormRegister<any>;

    error?:

    FieldError;

};


export default function

    EmailInput({

        register,

        error,

    }: Props) {

    return (

        <div>

            <input

                type="email"

                placeholder="Email"

                className="

w-full

rounded-lg

border

px-4

py-3

"

                {...register(

                    "email"

                )}

            />

            {

                error && (

                    <p

                        className="

mt-1

text-sm

text-red-500

"

                    >

                        {

                            error.message

                        }

                    </p>

                )

            }

        </div>

    );

}