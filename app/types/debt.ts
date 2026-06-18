export type Debt = {
  id: string;

  user_id: string;

  counterpart_name: string;

  amount: number;

  type: "owed_to_me" | "i_owe";

  note: string | null;

  due_date: string | null;

  settled_at: string | null;

  created_at: string;
};
