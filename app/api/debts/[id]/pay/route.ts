import { createClient } from "@/lib/supabase/server";
import { failed, success } from "@/lib/utils/api-response";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await request.json();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return failed("Unauthorized", 401);
  }

  const amount = body.amount;
  if (!amount || typeof amount !== "number" || amount <= 0) {
    return failed("Jumlah pembayaran harus lebih dari 0", 400);
  }

  const { data: debt, error: getError } = await supabase
    .from("debts")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (getError) {
    return failed("Kasbon tidak ditemukan", 404);
  }

  if (debt.settled_at) {
    return failed("Kasbon sudah lunas", 400);
  }

  const paidAmount = (debt.paid_amount || 0) + amount;
  const remaining = debt.amount - paidAmount;

  if (paidAmount > debt.amount) {
    return failed(
      `Pembayaran melebihi sisa hutang (sisa: Rp ${remaining.toLocaleString("id-ID")})`,
      400,
    );
  }

  const settled = paidAmount >= debt.amount;

  const { data, error } = await supabase
    .from("debts")
    .update({
      paid_amount: paidAmount,
      settled_at: settled ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return failed(error.message, 500);
  }

  const message = settled
    ? "Kasbon lunas!"
    : `Pembayaran berhasil, sisa: Rp ${remaining.toLocaleString("id-ID")}`;
  return success(data, 200);
}
