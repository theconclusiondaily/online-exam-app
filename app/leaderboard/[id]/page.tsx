"use client";

import {
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import {
  useParams,
} from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function LeaderboardPage() {

  const params = useParams();

  const examId = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const [attempts,
    setAttempts] =
    useState<any[]>([]);

  const [currentUserId,
    setCurrentUserId] =
    useState("");

  useEffect(() => {

    async function fetchLeaderboard() {

      // CURRENT USER

      const {
        data: { user },
      } = await supabase
        .auth
        .getUser();

      if (user) {
        setCurrentUserId(user.id);
      }

      // FETCH ATTEMPTS

      const {
        data,
        error,
      } = await supabase
        .from("exam_attempts")
        .select("*")
        .eq("exam_id", examId)
        .order("score", {
          ascending: false,
        });

      console.log(
        "LEADERBOARD:",
        data
      );

      console.log(
        "ERROR:",
        error
      );

      if (data) {

        const sorted =
          [...data].sort(
            (a, b) =>
              b.score - a.score
          );

        setAttempts(sorted);
      }
    }

    if (examId) {
      fetchLeaderboard();
    }

  }, [examId]);

  return (

    <main className="min-h-screen p-4 md:p-8 bg-gray-50">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Leaderboard
        </h1>

        <p className="text-gray-600 mb-8">
          Total Participants:
          {" "}
          {attempts.length}
        </p>
        <div className="flex justify-between items-center mb-8">

    <Link
    href="/dashboard"
    className="bg-black text-white px-5 py-3 rounded-2xl font-bold"
  >
    Back to Dashboard
  </Link>

</div>
        <div className="space-y-4">

          {attempts.map(
            (attempt, index) => (

              <div
                key={attempt.id}
                className={`border rounded-2xl p-5 shadow-sm transition-all ${
                  attempt.user_id === currentUserId

                    ? "border-blue-500 bg-blue-50"

                    : index === 0

                    ? "bg-yellow-100"

                    : index === 1

                    ? "bg-gray-100"

                    : index === 2

                    ? "bg-orange-100"

                    : "bg-white"
                }`}
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h2 className="text-2xl font-bold">

                      #{index + 1}

                    </h2>

                    <p className="text-gray-600 mt-1">

                      User:
                      {" "}
                      {attempt.user_id.slice(
                        0,
                        8
                      )}

                    </p>

                    {attempt.user_id ===
                      currentUserId && (

                      <p className="text-blue-600 font-bold mt-2">
                        You
                      </p>

                    )}

                  </div>

                  <div className="text-right">

                    <p className="text-4xl font-bold text-green-600">
                      {attempt.score}
                    </p>

                    <p className="text-sm text-gray-500">
                      Score
                    </p>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </main>
  );
}