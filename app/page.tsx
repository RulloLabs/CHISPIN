import { LucideTerminal, LucideZap, LucideBrainCircuit } from "lucide-react";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0a0a0a] px-6">
      {/* Background Blobs */}
      <div className="absolute -top-[10%] -left-[10%] h-[40rem] w-[40rem] rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-[10%] -right-[10%] h-[40rem] w-[40rem] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center text-center max-w-4xl z-10 space-y-8">
        <div className="inline-flex items-center space-x-2 glass px-4 py-2 rounded-full border border-zinc-800 text-sm font-medium text-zinc-400">
          <LucideZap className="w-4 h-4 text-purple-400 fill-purple-400/20" />
          <span>SaaS Factory v1.0 is Live</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight gradient-text">
          Building the Future of <br className="hidden md:block" />
          <span className="text-white">AI-First Applications</span>
        </h1>

        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          The ultimate foundation for rapid SaaS development. Built with Next.js, 
          Supabase, and cutting-edge AI. Scale from zero to hero in 30 seconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 w-full sm:w-auto">
          <a 
            href="#"
            className="flex items-center justify-center space-x-2 bg-white text-black font-semibold px-8 py-4 rounded-xl hover:bg-zinc-200 transition-all w-full sm:w-auto hover:scale-105 active:scale-95 shadow-lg shadow-white/5"
          >
            <LucideTerminal className="w-5 h-5" />
            <span>npx rullolabs start</span>
          </a>
          <a 
            href="#"
            className="flex items-center justify-center space-x-2 glass border border-zinc-800 font-semibold px-8 py-4 rounded-xl hover:bg-zinc-900 transition-all text-zinc-400 w-full sm:w-auto hover:scale-105 active:scale-95"
          >
            <LucideBrainCircuit className="w-5 h-5 mr-1" />
            Explore Docs
          </a>
        </div>
      </section>

      {/* Trust Badges / Footer Info */}
      <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40 grayscale hover:grayscale-0 transition-all cursor-default select-none pb-20">
        <span className="font-bold text-xl">Supabase</span>
        <span className="font-bold text-xl">OpenAI</span>
        <span className="font-bold text-xl">Stripe</span>
        <span className="font-bold text-xl">Resend</span>
      </div>
    </main>
  );
}
