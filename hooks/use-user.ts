"use client";

import { useEffect, useState } from "react";

import { createClient } from "@/lib/supabase/client";

export default function useUser() {
  const [user, setUser] = useState<any>(null);

  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
    }

    getUser();
  }, []);

  return user;
}
