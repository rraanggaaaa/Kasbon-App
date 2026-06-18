type Props = {
    status: string;
    type: string;
    onStatusChange:
    (
        value: string
    ) => void;

    onTypeChange:
    (
        value: string
    ) => void;
};

export default function
    DebtFilter({
        status,
        type,
        onStatusChange,
        onTypeChange,
    }: Props) {
    return (
        <div className="flex gap-4"
        >
            <select
                value={status}
                onChange={(e) =>
                    onStatusChange(
                        e.target.value
                    )
                }
                className="border rounded-lg p-3"
            >
                <option
                    value="all"
                >
                    Semua Status
                </option>
                <option
                    value="settled"
                >
                    Lunas
                </option>
                <option
                    value="unsettled"
                >
                    Belum Lunas
                </option>
            </select>

            <select
                value={type}
                onChange={(e) =>
                    onTypeChange(
                        e.target.value
                    )
                }
                className="border rounded-lg p-3"
            >
                <option value="">
                    Semua Jenis
                </option>
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
        </div>
    );
}