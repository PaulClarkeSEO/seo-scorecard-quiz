'use client';

import { useRef } from 'react';
import LeadForm from './LeadForm';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-base">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-base via-base to-base/90" />
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-2xl" />

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-semibold mb-6 text-lg tracking-wide uppercase">
              Free SEO Assessment
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Is Your Business <span className="text-primary">Invisible</span> to Local Customers?
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Discover exactly why your competitors are stealing your customers online — and get a personalised roadmap to fix it in the next 5 minutes.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button variant="primary" size="lg" onClick={scrollToForm}>
                Get Your Free SEO Score Now
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-gray-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>100% Free</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Takes 5 Minutes</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-base text-center mb-12">
              The Hard Truth About Local Search
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-red-500 mb-4">97%</div>
                <p className="text-gray-600">of consumers search online for local businesses</p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-red-500 mb-4">46%</div>
                <p className="text-gray-600">of all Google searches have local intent</p>
              </div>
              <div className="text-center p-6">
                <div className="text-5xl font-bold text-red-500 mb-4">88%</div>
                <p className="text-gray-600">of mobile searches result in a call or visit within 24 hours</p>
              </div>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                <strong className="text-red-700">Here&apos;s the problem:</strong> If your business isn&apos;t showing up when potential customers search for your services, you&apos;re not just missing out on new business — <strong>you&apos;re actively handing those customers to your competitors.</strong>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Agitation Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-base text-center mb-6">
              Sound Familiar?
            </h2>
            <p className="text-xl text-gray-600 text-center mb-12">
              Most local business owners we speak to are experiencing at least one of these:
            </p>

            <div className="space-y-6">
              {[
                "You've invested in a website, but it's not generating the leads you expected",
                "Your competitors seem to always show up above you in Google search results",
                "You're not sure if your Google My Business profile is properly optimised",
                "You've tried SEO before but didn't see results (or couldn't measure them)",
                "You know you should be doing more online, but don't know where to start",
                "You're spending money on ads because organic search isn't working"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700">{item}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-xl text-gray-700 mb-6">
                <strong>The good news?</strong> These problems are fixable — once you know exactly what&apos;s holding you back.
              </p>
              <Button variant="primary" size="lg" onClick={scrollToForm}>
                Find Out What&apos;s Holding You Back
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-base">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-primary font-semibold mb-4 text-lg">The Solution</p>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Your Free SEO Scorecard
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
              In just 5 minutes, you&apos;ll get a comprehensive assessment of your local SEO performance across 4 critical areas:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Google Business Profile</h3>
                <p className="text-gray-300 text-sm">
                  Is your profile fully optimised to attract local customers?
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Local Visibility</h3>
                <p className="text-gray-300 text-sm">
                  Are you showing up where your customers are searching?
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Website Fundamentals</h3>
                <p className="text-gray-300 text-sm">
                  Is your website converting visitors into leads?
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-3">AI & Future-Readiness</h3>
                <p className="text-gray-300 text-sm">
                  Are you prepared for AI-powered search?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-base text-center mb-12">
              What You&apos;ll Get
            </h2>

            <div className="space-y-6">
              {[
                {
                  title: "Your Overall SEO Score",
                  description: "A clear percentage score showing exactly where you stand compared to best practices"
                },
                {
                  title: "Category-by-Category Breakdown",
                  description: "Detailed scores for Google My Business, Local Keywords, and Website Performance"
                },
                {
                  title: "Personalised Insights",
                  description: "Specific feedback based on your answers, highlighting your strengths and weaknesses"
                },
                {
                  title: "Actionable Next Steps",
                  description: "Clear recommendations on what to focus on first to improve your rankings"
                },
                {
                  title: "Email Report",
                  description: "A detailed PDF report sent straight to your inbox for future reference"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-base">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-base mb-12">
              How It Works
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="w-16 h-16 bg-primary text-base rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-base mb-4">Enter Your Details</h3>
                <p className="text-gray-600">
                  Tell us your name, email, and website URL so we can send your personalised report
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-primary text-base rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-base mb-4">Answer 22 Questions</h3>
                <p className="text-gray-600">
                  Quick yes/no/maybe questions about your current online presence (takes ~5 minutes)
                </p>
              </div>

              <div className="relative">
                <div className="w-16 h-16 bg-primary text-base rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-base mb-4">Get Your Score</h3>
                <p className="text-gray-600">
                  Instantly see your results on screen and receive a detailed report via email
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Trust */}
      <section className="py-20 bg-base">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Why Trust Black And White Boy?
            </h2>
            <p className="text-xl text-gray-300 mb-12">
              We&apos;ve helped businesses improve their local search visibility and generate more leads.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-primary mb-2">10+</div>
                <p className="text-gray-300">Years of SEO Experience</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-primary mb-2">100s</div>
                <p className="text-gray-300">of Businesses Helped</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-4xl font-bold text-primary mb-2">ROI</div>
                <p className="text-gray-300">Focused Results</p>
              </div>
            </div>

            <p className="text-gray-400 text-sm">
              This free assessment is part of our mission to help local businesses understand and improve their online presence.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-base text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              {[
                {
                  q: "Is this really free?",
                  a: "Yes, 100% free. No credit card required, no hidden fees. We believe in providing value upfront."
                },
                {
                  q: "How long does it take?",
                  a: "The assessment takes approximately 5 minutes to complete. You'll get your results instantly on screen, and a detailed report via email within minutes."
                },
                {
                  q: "Will you try to sell me something?",
                  a: "At the end of your report, we'll offer a free strategy call if you'd like expert help improving your scores. But there's absolutely no obligation — the scorecard itself provides actionable insights you can implement yourself."
                },
                {
                  q: "Is my information secure?",
                  a: "Absolutely. We take data protection seriously and comply with GDPR. Your information is never shared with third parties."
                },
                {
                  q: "What if I score poorly?",
                  a: "A lower score isn't a failure — it's an opportunity. It means there's significant room for improvement, and we'll show you exactly where to focus your efforts for the biggest impact."
                }
              ].map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-base mb-2">{faq.q}</h3>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA with Form */}
      <section ref={formRef} className="py-20 bg-base">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Discover Your SEO Score?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Enter your details below to start your free assessment. Results delivered instantly.
            </p>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10">
              <LeadForm />
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Your data is secure & GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-base border-t border-white/10 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Black And White Boy. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
