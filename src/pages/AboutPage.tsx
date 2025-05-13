
import MainLayout from "@/components/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="bg-umi-black text-white rounded-lg overflow-hidden mb-12">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                About <span className="text-umi-orange">UMI Beauty</span>
              </h1>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Founded in 2018, UMI Beauty has grown from a small startup to a leading beauty brand trusted by thousands of customers worldwide. Our mission is to provide high-quality, effective beauty products that enhance natural beauty and boost confidence.
              </p>
              <Link to="/contact">
                <Button className="bg-umi-orange hover:bg-orange-700 text-white inline-flex">
                  Contact Us
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1573575155376-b5645afcb00b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="UMI Beauty Store"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1629198735660-e39ea93f5c18?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Our Story"
                className="rounded-lg shadow-md w-full"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-gray-700 mb-4">
                UMI Beauty started with a simple belief: everyone deserves access to premium beauty products that actually work, without breaking the bank. Our founder, Jane Chen, was frustrated by the lack of high-quality, affordable options in the beauty market.
              </p>
              <p className="text-gray-700 mb-4">
                After years of working in the beauty industry for major brands, Jane decided to create her own line of products that would prioritize quality ingredients, ethical production practices, and accessible pricing.
              </p>
              <p className="text-gray-700">
                Today, UMI Beauty has expanded to offer a comprehensive range of skincare, makeup, haircare, and fragrance products. We remain committed to our founding principles while continuously innovating and improving our formulations based on customer feedback and scientific advancements.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="py-12 bg-gray-50 rounded-lg mb-16">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-10 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-umi-orange/10 text-umi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality First</h3>
                <p className="text-gray-600">
                  We never compromise on the quality of our ingredients or the effectiveness of our formulations. Every product undergoes rigorous testing before reaching our customers.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-umi-orange/10 text-umi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Ethical Production</h3>
                <p className="text-gray-600">
                  We are committed to ethical sourcing, cruelty-free testing, and sustainable packaging. Our products are good for you and better for the planet.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-16 h-16 bg-umi-orange/10 text-umi-orange rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Community</h3>
                <p className="text-gray-600">
                  We value our customers' feedback and actively incorporate it into our product development. Our community helps us create better products for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Jane Chen",
                title: "Founder & CEO",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                name: "Michael Roberts",
                title: "Product Development",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                name: "Sarah Johnson",
                title: "Head of Marketing",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              },
              {
                name: "David Kim",
                title: "Operations Manager",
                image: "https://randomuser.me/api/portraits/men/75.jpg"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                  <p className="text-gray-600">{member.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-umi-orange text-white rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Experience the UMI Beauty Difference
          </h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who have made UMI Beauty a part of their daily routine. Browse our collection and find products designed specifically for your needs.
          </p>
          <Link to="/products">
            <Button className="bg-white text-umi-orange hover:bg-gray-100">
              Shop Our Products
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
