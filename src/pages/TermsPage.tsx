
import MainLayout from "@/components/layouts/MainLayout";

const TermsPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">
            Last updated: May 13, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
              <p className="text-gray-700 mb-2">
                Welcome to UMI Beauty Store. These Terms & Conditions govern your use of our website and the purchase of products through our online store.
              </p>
              <p className="text-gray-700">
                By accessing our website and/or placing an order, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree to all the terms and conditions, you must not use or access this website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Use of Our Website</h2>
              <p className="text-gray-700 mb-2">
                You may use our website for lawful purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website.
              </p>
              <p className="text-gray-700">
                You must not use our website to copy, store, host, transmit, send, use, publish or distribute any material which consists of malicious computer software (including viruses, spyware, or other harmful programs).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Account Registration</h2>
              <p className="text-gray-700 mb-2">
                To place an order, you may need to register for an account. You must provide accurate, complete, and current information during the registration process.
              </p>
              <p className="text-gray-700 mb-2">
                You are responsible for keeping your account details and password confidential. You agree to accept responsibility for all activities that occur under your account.
              </p>
              <p className="text-gray-700">
                We reserve the right to disable any user account if we believe you have violated any provisions of these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Orders and Payments</h2>
              <p className="text-gray-700 mb-2">
                By placing an order through our website, you are offering to purchase a product at the price indicated. All orders are subject to acceptance and availability.
              </p>
              <p className="text-gray-700 mb-2">
                We accept payment via credit/debit cards and other payment methods as indicated on our website. All payments are processed securely through our payment processors.
              </p>
              <p className="text-gray-700">
                Prices for products are as quoted on our website and may change from time to time. We take reasonable care to ensure that all prices are correct at the time of publication.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Shipping and Delivery</h2>
              <p className="text-gray-700 mb-2">
                Delivery times are estimates only and commence from the date of dispatch. We are not responsible for delays in delivery caused by circumstances beyond our reasonable control.
              </p>
              <p className="text-gray-700">
                Risk of loss and title for items purchased pass to you upon delivery of the items to the carrier.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Returns and Refunds</h2>
              <p className="text-gray-700 mb-2">
                We offer a 30-day return policy for most items. To be eligible for a return, your item must be unused and in the same condition that you received it, with the original packaging.
              </p>
              <p className="text-gray-700 mb-2">
                Certain products are exempt from our return policy, including but not limited to opened cosmetics, sale items, and personalized products.
              </p>
              <p className="text-gray-700">
                Refunds will be processed within 7-14 business days after we receive and inspect the returned item.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Intellectual Property</h2>
              <p className="text-gray-700 mb-2">
                All content included on the website, such as text, graphics, logos, images, as well as the compilation thereof, and any software used on the website, is the property of UMI Beauty Store or its suppliers and protected by copyright and intellectual property laws.
              </p>
              <p className="text-gray-700">
                You must not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website, except as generally and ordinarily permitted through the website according to these Terms & Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Product Descriptions</h2>
              <p className="text-gray-700 mb-2">
                We attempt to be as accurate as possible in the description of products on our website. However, we do not warrant that product descriptions or other content of the site is accurate, complete, reliable, current, or error-free.
              </p>
              <p className="text-gray-700">
                The colors of physical products may vary from their depiction on the website due to monitor settings and other factors.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">9. Limitation of Liability</h2>
              <p className="text-gray-700 mb-2">
                UMI Beauty Store shall not be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc list-inside pl-4 text-gray-700 mb-2 space-y-1">
                <li>Your access to or use of or inability to access or use the website</li>
                <li>Any conduct or content of any third party on the website</li>
                <li>Any content obtained from the website</li>
                <li>Unauthorized access, use or alteration of your transmissions or content</li>
              </ul>
              <p className="text-gray-700">
                In no event shall our total liability to you for all claims exceed the amount paid by you to us during the past six months.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">10. Changes to Terms & Conditions</h2>
              <p className="text-gray-700">
                We reserve the right to update or modify these Terms & Conditions at any time without prior notice. Changes will be effective immediately upon posting on our website. Your continued use of our website following the posting of changes constitutes your acceptance of such changes.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
              <p className="text-gray-700">
                If you have any questions about these Terms & Conditions, please contact us at legal@umibeauty.com or call us at +1 (555) 123-4567.
              </p>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default TermsPage;
