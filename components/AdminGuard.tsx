"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router =
    useRouter();

  const [loading,
    setLoading] =
    useState(true);

  useEffect(() => {

    async function checkAdmin() {

      // GET AUTH USER

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      console.log(
        "AUTH USER:",
        user
      );

      if (!user) {

        router.push(
          "/login"
        );

        return;
      }

      // FETCH ROLE

      const {
        data,
        error,
      } = await supabase
        .from("users")
        .select(`
          id,
          email,
          role
        `)
        .eq(
          "id",
          user.id
        )
        .maybeSingle();

      console.log(
        "ADMIN CHECK:",
        data
      );

      console.log(
        "ADMIN ERROR:",
        error
      );

      

      
      if (
  data?.role !== "admin" &&
  data?.role !== "teacher"
) {

        router.push(
          "/dashboard"
        );

        return;
      }

      setLoading(false);
      
    }

    checkAdmin();

  }, [router]);

  if (loading) {

    return (

      <main className="min-h-screen flex items-center justify-center">

        <div className="text-2xl font-bold">

          Loading...

        </div>

      </main>

    );
  }

  return <>{children}</>;
}