'use client';

import LeadForm from './LeadForm';

export default function Hero() {
  return (
    <section className="bg-base min-h-screen flex items-center">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-primary font-semibold mb-4 text-lg">
            SEO Assessment
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Are You Ready To{' '}
            <span className="text-primary">Dominate</span>{' '}
            Local Search?
          </h1>

          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Answer 22 quick questions about your SEO and online marketing,
            and we&apos;ll send you a personalised report with actionable next steps.
          </p>

          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
            <LeadForm />
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Takes only 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Instant results</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Free detailed report sent to your inbox</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
