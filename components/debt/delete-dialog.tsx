"use client";

import * as Dialog from "@radix-ui/react-dialog";

type Props = {
    open: boolean;
    onClose:
    () => void;
    onConfirm:
    () => Promise<void>;
};

export default function
    DeleteDialog({
        open,
        onClose,
        onConfirm,
    }: Props) {

    return (
        <Dialog.Root
            open={open}
            onOpenChange={
                onClose
            }>
            <Dialog.Portal>
                <Dialog.Overlay
                    className="fixed inset-0 bg-black/50" />
                <Dialog.Content
                    className="fixed top-1/2 left-1/2 bg-white rounded-xl p-6 translate-x-[-50%] translate-y-[-50%]">
                    <h2 className="text-xl font-bold">
                        Hapus Kasbon
                    </h2>
                    <p className="mt-4 text-gray-500">
                        Yakin ingin menghapus data ini?
                    </p>
                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            onClick={
                                onClose
                            }
                        >
                            Batal
                        </button>

                        <button
                            className="text-red-500"
                            onClick={
                                onConfirm
                            }
                        >
                            Hapus
                        </button>
                    </div>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}