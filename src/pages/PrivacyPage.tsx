
import MainLayout from "@/components/layouts/MainLayout";

const PrivacyPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">
            Last updated: May 13, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-700 mb-2">
                UMI Beauty Store ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase.
              </p>
              <p className="text-gray-700">
                Please read this Privacy Policy carefully. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
              <p className="text-gray-700 mb-2">
                We collect personal information that you voluntarily provide to us when you register on our website, express an interest in obtaining information about us or our products, or otherwise contact us.
              </p>
              <p className="text-gray-700 mb-2">
                This personal information may include:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 mb-2 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Mailing address</li>
                <li>Payment information (processed securely through our payment processors)</li>
              </ul>
              <p className="text-gray-700 mb-2">
                We also automatically collect certain information when you visit our website, including:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 space-y-1">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages visited</li>
                <li>Time spent on pages</li>
                <li>Referring website</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-700 mb-2">
                We may use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 mb-2 space-y-1">
                <li>Processing and fulfilling your orders</li>
                <li>Managing your account</li>
                <li>Sending you marketing and promotional communications (with opt-out options)</li>
                <li>Responding to your inquiries and customer service requests</li>
                <li>Improving our website and products</li>
                <li>Protecting against fraudulent or unauthorized transactions</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 mb-2">
                We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data which may include an anonymous unique identifier.
              </p>
              <p className="text-gray-700 mb-2">
                These technologies help us to:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 mb-2 space-y-1">
                <li>Remember your preferences</li>
                <li>Understand how you use our website</li>
                <li>Personalize your experience</li>
                <li>Improve our website and marketing efforts</li>
              </ul>
              <p className="text-gray-700 mb-2">
                You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. If you disable cookies, some features of our website may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Third-Party Sharing</h2>
              <p className="text-gray-700 mb-2">
                We may share your information with third parties in the following situations:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 mb-2 space-y-1">
                <li>Service providers who assist us in operating our website and conducting our business</li>
                <li>Payment processors to process your transactions</li>
                <li>Shipping and fulfillment partners to deliver your orders</li>
                <li>Marketing partners to assist with our promotional efforts (with your consent)</li>
                <li>Legal requirements, such as complying with applicable laws or regulations</li>
              </ul>
              <p className="text-gray-700">
                We do not sell, rent, or trade your personal information to third parties for their marketing purposes without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Data Security</h2>
              <p className="text-gray-700 mb-2">
                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction.
              </p>
              <p className="text-gray-700 mb-2">
                However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Data Retention</h2>
              <p className="text-gray-700 mb-2">
                We will retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.
              </p>
              <p className="text-gray-700">
                To determine the appropriate retention period, we consider the amount, nature, and sensitivity of the personal information, the potential risk of harm from unauthorized use or disclosure, and the applicable legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Your Rights</h2>
              <p className="text-gray-700 mb-2">
                Depending on your location, you may have the following rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 mb-2 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your personal information</li>
                <li>Object to or restrict processing of your information</li>
                <li>Data portability</li>
                <li>Withdraw consent (where processing is based on consent)</li>
              </ul>
              <p className="text-gray-700">
                To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-2">
                Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you become aware that a child has provided us with personal information, please contact us using the information in the "Contact Us" section below.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 mb-2">
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p className="text-gray-700">
                You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="mt-4">
                <p className="text-gray-700">UMI Beauty Store</p>
                <p className="text-gray-700">123 Beauty Lane</p>
                <p className="text-gray-700">Los Angeles, CA 90001</p>
                <p className="text-gray-700">Email: privacy@umibeauty.com</p>
                <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;
