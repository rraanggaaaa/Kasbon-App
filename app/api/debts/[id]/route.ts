import { createClient } from "@/lib/supabase/server";

import { debtSchema } from "@/lib/validations/debt";

import { success, failed } from "@/lib/utils/api-response";

export async function PATCH(
  request: Request,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return failed(
      "Silakan login",

      401,
    );
  }

  const body = await request.json();

  const validated = debtSchema

    .partial()

    .safeParse(body);

  if (!validated.success) {
    return failed(
      validated.error.issues[0].message,

      422,
    );
  }

  const {
    data,

    error,
  } = await supabase

    .from("debts")

    .update(validated.data)

    .eq(
      "id",

      id,
    )

    .select()

    .single();

  if (error) {
    return failed(
      error.message,

      500,
    );
  }

  return success(data);
}

export async function DELETE(
  request: Request,

  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return failed(
      "Silakan login",

      401,
    );
  }

  const { error } = await supabase

    .from("debts")

    .delete()

    .eq(
      "id",

      id,
    );

  if (error) {
    return failed(
      error.message,

      500,
    );
  }

  return success({
    message: "Berhasil dihapus",
  });
}
