type Props = {
    value: string;
    onChange:
    (
        value: string
    ) => void;
};

export default function
    DebtSearch({
        value,
        onChange,
    }: Props) {
    return (
        <input
            placeholder=
            "Cari nama..."
            value={value}
            onChange={(e) =>
                onChange(
                    e.target.value
                )
            }
            className="border rounded-lg p-3 w-full"
        />
    );
}