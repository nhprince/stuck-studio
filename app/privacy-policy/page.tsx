import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Stuck Studio collects, uses, and protects your personal information.',
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32 md:py-48">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Privacy Policy
        </h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: March 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-12 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">1. Information We Collect</h2>
            <p>
              When you use our contact form, we collect your name, email address, and message. We do not
              collect any other personal information without your explicit consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">2. How We Use Your Information</h2>
            <p>We use the information you provide solely to:</p>
            <ul className="list-disc list-inside space-y-3 mt-4 text-zinc-400">
              <li>Respond to your inquiries and project requests</li>
              <li>Provide the services you requested</li>
              <li>Send you relevant updates about your project (with consent)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">3. Data Storage & Security</h2>
            <p>
              Contact form submissions are sent directly to our email. We do not store your data in
              any third-party database. We take reasonable technical measures to protect your information
              during transmission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">4. Third-Party Services</h2>
            <p>
              Our website may use third-party services (fonts from Google, icons from SimpleIcons CDN).
              These services have their own privacy policies. We do not share your personal data with
              third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">5. Cookies</h2>
            <p>
              We use only essential session cookies necessary to prevent spam on our contact form.
              We do not use tracking or advertising cookies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">6. Your Rights</h2>
            <p>
              You can request access to, correction, or deletion of your personal data at any time
              by contacting us at{' '}
              <a href="mailto:info@stuckstudio.com" className="text-red-500 hover:text-red-400 transition-colors">
                info@stuckstudio.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">7. Contact</h2>
            <p>
              For any privacy-related questions, contact us at:{' '}
              <a href="mailto:info@stuckstudio.com" className="text-red-500 hover:text-red-400 transition-colors">
                info@stuckstudio.com
              </a>
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  );
}
