import {

    UseFormRegister,

    FieldError,

} from

    "react-hook-form";

type Props = {

    name:

    "password"

    |

    "confirmPassword";

    placeholder:

    string;

    register:

    UseFormRegister<any>;

    error?:

    FieldError;

};

export default function PasswordInput({

    name,

    placeholder,

    register,

    error,

}: Props) {

    return (

        <div>

            <input

                type="password"

                placeholder={placeholder}

                className="

w-full

rounded-lg

border

px-4

py-3

"

                {...register(name)}

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