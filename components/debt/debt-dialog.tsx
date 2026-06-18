"use client";

import * as Dialog from "@radix-ui/react-dialog";
type Props = {
    open: boolean;
    onOpenChange:
    (
        open: boolean
    ) => void;
    title: string;
    children:

    React.ReactNode;
};


export default function

    DebtDialog({

        open,

        onOpenChange,

        title,

        children,

    }: Props) {

    return (

        <Dialog.Root

            open={open}

            onOpenChange={

                onOpenChange

            }

        >

            <Dialog.Portal>

                <Dialog.Overlay

                    className="

fixed

inset-0

bg-black/50

"

                />


                <Dialog.Content

                    className="

fixed

top-1/2

left-1/2

-w-[500px]

max-w-[90vw]

bg-white

rounded-xl

p-6

-shadow-xl

translate-x-[-50%]

translate-y-[-50%]

"

                >

                    <Dialog.Title

                        className="

text-xl

font-bold

mb-6

"

                    >

                        {title}

                    </Dialog.Title>


                    {children}


                </Dialog.Content>

            </Dialog.Portal>

        </Dialog.Root>

    );

}