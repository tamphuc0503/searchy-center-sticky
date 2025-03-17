
import React from 'react';
import Header from '@/components/Header';

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 px-6 bg-slate-50">
      <Header />
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
        <div className="bg-white p-8 rounded-lg shadow-sm border space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-gray-700">
              Welcome to our Safety Data Sheet search service. These Terms and Conditions govern your use of our platform
              and by accessing our service, you agree to be bound by these terms.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">2. Service Description</h2>
            <p className="text-gray-700">
              Our service provides access to a database of Safety Data Sheets for various chemical products. We strive to 
              maintain accurate and up-to-date information, but we do not guarantee the completeness or accuracy of all data.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">3. Trial Period</h2>
            <p className="text-gray-700">
              New users are entitled to a 30-day free trial period. During this period, you will have full access to all features.
              The trial will not automatically convert to a paid subscription at the end of the period.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">4. User Accounts</h2>
            <p className="text-gray-700">
              To access our service, you must create an account with a valid email address. You are responsible for maintaining
              the confidentiality of your account information and for all activities that occur under your account.
            </p>
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">5. Limitations of Liability</h2>
            <p className="text-gray-700">
              Our service is provided "as is" without warranties of any kind. We shall not be liable for any direct, indirect,
              incidental, special, or consequential damages resulting from the use or inability to use our service.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
