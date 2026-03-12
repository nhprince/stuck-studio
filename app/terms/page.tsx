import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms and conditions for using Stuck Studio services.',
};

export default function TermsOfService() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-32 md:py-48">
        <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tighter mb-4">
          Terms of Service
        </h1>
        <p className="text-zinc-500 text-sm mb-12">Last updated: March 2026</p>

        <div className="space-y-12 text-zinc-300 leading-relaxed">
          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">1. Services</h2>
            <p>
              Stuck Studio provides web development, video editing, YouTube management, and related
              digital services. The scope, timeline, and deliverables of each project are defined
              in a separate project agreement or proposal.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">2. Payment</h2>
            <p>
              Payment terms are agreed upon before work begins. A deposit may be required for larger
              projects. Final deliverables are released upon full payment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">3. Intellectual Property</h2>
            <p>
              Upon full payment, all deliverables become the intellectual property of the client.
              Stuck Studio retains the right to showcase the work in its portfolio unless otherwise
              agreed in writing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">4. Revisions</h2>
            <p>
              Each project includes a reasonable number of revisions as defined in the project
              agreement. Revisions beyond the agreed scope may incur additional charges.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">5. Client Responsibilities</h2>
            <p>
              Clients are responsible for providing accurate content, timely feedback, and ensuring
              they have the rights to any materials provided to us for use in their projects.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p>
              Stuck Studio is not liable for indirect or consequential damages arising from our
              services. Our total liability for any claim is limited to the amount paid for the
              project in question.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-display font-bold text-white mb-4">7. Contact</h2>
            <p>
              Questions about these terms?{' '}
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
