import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, message: "Tidak ada user yang login" },
      { status: 401 },
    );
  }

  await supabase.auth.signOut();

  return NextResponse.json(
    { success: true, message: "Logout berhasil" },
    {
      status: 200,
      headers: {
        "Set-Cookie":
          "supabase-auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax",
      },
    },
  );
}
