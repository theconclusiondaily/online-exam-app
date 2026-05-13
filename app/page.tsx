import Link from "next/link";

export default function HomePage() {

  return (

    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-6">

      <div className="max-w-5xl w-full text-center">

        {/* HERO */}

        <div className="mb-12">

          <p className="text-blue-600 font-bold uppercase tracking-widest mb-4">
            Competitive Exam Platform
          </p>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight text-gray-900">
            The Conclusion Daily
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Participate in competitive online exams,
            challenge students across India,
            climb the leaderboard,
            and win rewards.
          </p>

        </div>

        {/* FEATURE CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">

          <div className="bg-white rounded-3xl shadow-sm border p-8">

            <div className="text-5xl mb-4">
              📝
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Competitive Exams
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Attempt structured exams with real competition,
              rankings,
              and performance tracking.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-8">

            <div className="text-5xl mb-4">
              🏆
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Rewards & Rankings
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Compete on live leaderboards,
              improve your rank,
              and earn reward pools.
            </p>

          </div>

          <div className="bg-white rounded-3xl shadow-sm border p-8">

            <div className="text-5xl mb-4">
              🎥
            </div>

            <h2 className="text-2xl font-bold mb-3">
              Secure Exam System
            </h2>

            <p className="text-gray-600 leading-relaxed">
              Webcam-enabled exam monitoring,
              timed assessments,
              and fair competition.
            </p>

          </div>

        </div>

        {/* CTA BUTTONS */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <Link
            href="/login"
            className="bg-black text-white px-8 py-4 rounded-2xl text-lg font-bold hover:opacity-90 transition"
          >
            Login
          </Link>

          <Link
            href="/login"
            className="bg-white border border-black px-8 py-4 rounded-2xl text-lg font-bold hover:bg-gray-100 transition"
          >
            Signup
          </Link>

        </div>

      </div>

    </main>
  );
}
