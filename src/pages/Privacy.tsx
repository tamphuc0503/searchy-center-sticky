
import React from 'react';
import Header from '@/components/Header';

const Privacy = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-50">
      <Header />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Information Collection</h2>
            <p className="text-gray-700">
              We collect information you provide directly to us when you create an account, such as your name and email address.
              We also collect information about your usage of our service, including search queries and viewed data sheets.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Use of Information</h2>
            <p className="text-gray-700">
              We use the information we collect to provide, maintain, and improve our services, communicate with you about your account,
              and send you technical notices and updates about our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Data Security</h2>
            <p className="text-gray-700">
              We implement measures designed to protect your information from unauthorized access, use, or disclosure. However,
              no method of electronic transmission or storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. Cookies and Similar Technologies</h2>
            <p className="text-gray-700">
              We may use cookies and similar technologies to collect information about your browsing activities and to remember your preferences.
              You can set your browser to refuse all or some browser cookies, but this may affect your ability to use our service.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Changes to Privacy Policy</h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website
              and updating the "Last Updated" date at the top of this policy.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
