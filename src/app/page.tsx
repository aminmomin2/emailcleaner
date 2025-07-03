'use client';

import Container from "@/components/ui/Container";

export default function Home() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-[var(--text-main)] mb-6">
        Welcome to OmniDo
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">Tasks Pending</h3>
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">12</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">Items in your review queue</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">AI Insights</h3>
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">8</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">New insights generated</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border border-[var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--text-main)]">Knowledge Base</h3>
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <p className="text-3xl font-bold text-[var(--text-main)]">156</p>
          <p className="text-sm text-[var(--text-secondary)] mt-2">Articles in your knowledge base</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border border-[var(--border)]">
        <div className="p-6 border-b border-[var(--border)]">
          <h2 className="text-xl font-semibold text-[var(--text-main)]">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-main)]">New task added to review queue</p>
                <p className="text-xs text-[var(--text-secondary)]">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-main)]">AI generated insights for project Alpha</p>
                <p className="text-xs text-[var(--text-secondary)]">15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm text-[var(--text-main)]">Knowledge base article updated</p>
                <p className="text-xs text-[var(--text-secondary)]">1 hour ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}