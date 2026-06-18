export type Debt = {
  id: string;
  user_id: string;
  type: "owed_to_me" | "i_owe";
  counterpart_name: string;
  amount: number;
  paid_amount: number;
  note: string | null;
  due_date: string | null;
  settled_at: string | null;
  created_at: string;
  updated_at: string;
};