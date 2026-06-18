"use client";

import { useEffect, useState } from "react";

import { Debt } from "@/app/types/debt";

export default function useDebts(query: string) {
  const [data, setData] = useState<Debt[]>([]);

  const [loading, setLoading] = useState(true);

  async function fetchDebts() {
    setLoading(true);

    const res = await fetch(`/api/debts${query}`);

    const json = await res.json();

    setData(json.data);

    setLoading(false);
  }

  useEffect(() => {
    fetchDebts();
  }, [query]);

  return {
    data,

    loading,

    refetch: fetchDebts,
  };
}
