"use client";

import {
  useEffect,
  useState,
} from "react";
import AdminGuard from "@/components/AdminGuard";
import {
  useRouter,
} from "next/navigation";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function AdminPage() {

  const router = useRouter();

  const [totalUsers,
    setTotalUsers] =
    useState(0);

  const [totalExams,
    setTotalExams] =
    useState(0);

  const [totalQuestions,
    setTotalQuestions] =
    useState(0);

  const [totalAttempts,
    setTotalAttempts] =
    useState(0);

  const [liveExams,
    setLiveExams] =
    useState(0);

  const [recentExams,
    setRecentExams] =
    useState<any[]>([]);

  useEffect(() => {

    async function initializeAdmin() {

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        router.push("/");

        return;
      }

      const adminEmails = [

        "admin@theconclusiondaily.com",

        "kumawat.rrahul@gmail.com",

        "theconclusiondaily@gmail.com",

      ];

      if (
        !adminEmails.includes(
          user.email || ""
        )
      ) {

        alert("Access Denied");

        router.push("/dashboard");

        return;
      }

      // TOTAL USERS

      const {
        count: usersCount,
      } = await supabase
        .from("users")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalUsers(
        usersCount || 0
      );

      // TOTAL EXAMS

      const {
        count: examsCount,
      } = await supabase
        .from("exams")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalExams(
        examsCount || 0
      );

      // TOTAL QUESTIONS

      const {
        count: questionsCount,
      } = await supabase
        .from("questions")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalQuestions(
        questionsCount || 0
      );

      // TOTAL ATTEMPTS

      const {
        count: attemptsCount,
      } = await supabase
        .from("exam_attempts")
        .select("*", {
          count: "exact",
          head: true,
        });

      setTotalAttempts(
        attemptsCount || 0
      );

      // LIVE EXAMS

      const now = new Date()
        .toISOString();

      const {
        data: liveExamData,
      } = await supabase
        .from("exams")
        .select("*")
        .lte("start_time", now)
        .gte("end_time", now);

      setLiveExams(
        liveExamData?.length || 0
      );

      // RECENT EXAMS

      const {
        data: recentExamData,
      } = await supabase
        .from("exams")
        .select("*")
        .order("created_at", {
          ascending: false,
        })
        .limit(5);

      if (recentExamData) {
        setRecentExams(
          recentExamData
        );
      }
    }

    initializeAdmin();

  }, []);

  return (

  <AdminGuard>

    <main className="min-h-screen p-4 md:p-8 bg-gray-50">

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

  <h1 className="text-4xl font-bold">
    Admin Dashboard
  </h1>

  <div className="flex flex-wrap gap-3">

    <Link
      href="/admin"
      className="bg-black text-white px-4 py-2 rounded-xl"
    >
      Dashboard
    </Link>

    <Link
      href="/admin/questions"
      className="bg-white border px-4 py-2 rounded-xl"
    >
      Questions
    </Link>

    <Link
      href="/admin/users"
      className="bg-white border px-4 py-2 rounded-xl"
    >
      Users
    </Link>

    <Link
      href="/admin/leaderboards"
      className="bg-white border px-4 py-2 rounded-xl"
    >
      Leaderboards
    </Link>

    <Link
      href="/admin/papers"
      className="bg-white border px-4 py-2 rounded-xl"
    >
      Question Papers
    </Link>
    
    <Link
  href="/admin/questions"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">
    Question Builder
  </h2>

  <p className="text-gray-600">
    Create and manage exam questions
  </p>

</Link>
<Link
  href="/admin/institutes"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">
    Institutes
  </h2>

  <p className="text-gray-600">
    Manage campuses and institutes
  </p>

</Link>
<Link
  href="/admin/analytics"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">
    Analytics
  </h2>

  <p className="text-gray-600">
    Institute performance analytics
  </p>

</Link>
<Link
  href="/admin/users"
  className="border rounded-3xl p-6 bg-white shadow-sm hover:shadow-md transition"
>

  <h2 className="text-2xl font-bold mb-2">
    Users
  </h2>

  <p className="text-gray-600">
    Manage students and institutes
  </p>

</Link>
  </div>

</div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <p className="text-gray-500 text-sm mb-2">
              Total Users
            </p>
            <h2 className="text-4xl font-bold">
              {totalUsers}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <p className="text-gray-500 text-sm mb-2">
              Total Exams
            </p>
            <h2 className="text-4xl font-bold">
              {totalExams}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <p className="text-gray-500 text-sm mb-2">
              Total Questions
            </p>
            <h2 className="text-4xl font-bold">
              {totalQuestions}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <p className="text-gray-500 text-sm mb-2">
              Total Attempts
            </p>
            <h2 className="text-4xl font-bold">
              {totalAttempts}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 border">
            <p className="text-gray-500 text-sm mb-2">
              Live Exams
            </p>
            <h2 className="text-4xl font-bold text-green-600">
              {liveExams}
            </h2>
          </div>

        </div>

        {/* RECENT EXAMS */}

        <div className="bg-white rounded-2xl shadow-sm border p-6">

          <h2 className="text-2xl font-bold mb-6">
            Recent Exams
          </h2>

          <div className="space-y-4">

            {recentExams.map((exam) => (

              <div
                key={exam.id}
                className="border rounded-xl p-4"
              >

                <div className="flex justify-between items-start gap-4">

                  <div>

                    <h3 className="text-xl font-bold">
                      {exam.title}
                    </h3>

                    <p className="text-gray-600 mt-2">
                      {exam.description}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-bold text-green-600 text-lg">
                      ₹{exam.reward_pool || 0}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Reward Pool
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>

</AdminGuard>
);

}
