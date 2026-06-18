import { createClient } from "@/lib/supabase/server";
import { debtSchema } from "@/lib/validations/debt";
import { failed, success } from "@/lib/utils/api-response";

export async function GET(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return failed("Silakan login", 401);
  }

  const { searchParams } = new URL(request.url);

  const status = searchParams.get("status");

  const type = searchParams.get("type");

  const q = searchParams.get("q");

  let query = supabase

    .from("debts")

    .select("*")

    .order("created_at", {
      ascending: false,
    });

  if (type === "owed_to_me") {
    query = query.eq(
      "type",

      "owed_to_me",
    );
  }

  if (type === "i_owe") {
    query = query.eq(
      "type",

      "i_owe",
    );
  }

  if (status === "settled") {
    query = query.not(
      "settled_at",

      "is",

      null,
    );
  }

  if (status === "unsettled") {
    query = query.is(
      "settled_at",

      null,
    );
  }

  if (q) {
    query = query.ilike(
      "counterpart_name",

      `%${q}%`,
    );
  }

  const {
    data,

    error,
  } = await query;

  if (error) {
    return failed(
      error.message,

      500,
    );
  }

  return success(data);
}
