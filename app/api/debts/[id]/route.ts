import { createClient } from "@/lib/supabase/server";
import { debtSchema } from "@/lib/validations/debt";
import { failed, success } from "@/lib/utils/api-response";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return failed("Unauthorized", 401);
  }

  const { data, error } = await supabase
    .from("debts")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error) {
    return failed(error.message, 500);
  }

  return success(data);
}

export async function PATCH(
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

  // Validate input (partial validation)
  const validated = debtSchema.partial().safeParse(body);

  if (!validated.success) {
    return failed(validated.error.issues[0].message, 422);
  }

  // Check if debt exists and belongs to user
  const { data: existingDebt, error: checkError } = await supabase
    .from("debts")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (checkError) {
    return failed("Kasbon tidak ditemukan", 404);
  }

  const { data, error } = await supabase
    .from("debts")
    .update({
      ...validated.data,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    return failed(error.message, 500);
  }

  return success(data, 200);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return failed("Unauthorized", 401);
  }

  // Check if debt exists and belongs to user
  const { data: existingDebt, error: checkError } = await supabase
    .from("debts")
    .select("id")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (checkError) {
    return failed("Kasbon tidak ditemukan", 404);
  }

  const { error } = await supabase
    .from("debts")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return failed(error.message, 500);
  }

  return success(null, 200);
}
