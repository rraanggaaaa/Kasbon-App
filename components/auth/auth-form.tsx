"use client";

import {

    UseFormReturn,

    FieldValues,

} from

    "react-hook-form";

type Props<T extends FieldValues> = {

    title:

    string;

    children:

    React.ReactNode;

    form:

    UseFormReturn<T>;

    onSubmit:

    (values: T)

        => Promise<void>;

    buttonText:

    string;

};


export default function

    AuthForm

    <T extends FieldValues>({

        title,

        children,

        form,

        onSubmit,

        buttonText,

    }: Props<T>) {

    return (

        <main

            className="

max-w-md

mx-auto

py-20

"

        >

            <h1

                className="

text-3xl

font-bold

mb-8

"

            >

                {title}

            </h1>

            <form

                className="space-y-4"

                onSubmit={

                    form.handleSubmit(

                        onSubmit

                    )

                }

            >

                {children}

                <button

                    disabled={

                        form.formState

                            .isSubmitting

                    }

                    className="

w-full

rounded-lg

bg-black

text-white

py-3

"

                >

                    {

                        form.formState

                            .isSubmitting

                            ?

                            "Loading..."

                            :

                            buttonText

                    }

                </button>

            </form>

        </main>

    );

}