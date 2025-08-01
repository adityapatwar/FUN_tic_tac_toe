import React from 'react'

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#171717] text-white font-sans antialiased">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {children}
        <footer className="mt-10 flex items-center justify-between text-sm text-zinc-500">
          <span>Built with React, Vite, and Tailwind.</span>
          <a
            href="https://www.pexels.com/photo/abstract-gradient-illustration-7130555/"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-dotted hover:text-zinc-300"
          >
            Inspiration
          </a>
        </footer>
      </div>
    </div>
  )
}
