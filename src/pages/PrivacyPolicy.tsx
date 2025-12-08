import { Layout } from "@/components/layout/Layout";
import { Shield, Lock, Eye, Mail } from "lucide-react";

const sections = [
  {
    title: "Information We Collect",
    icon: Eye,
    content: [
      "Personal Information: When you make a purchase or create an account, we collect information such as your name, email address, shipping address, and payment details.",
      "Order Information: Details about the products you purchase, including size, color, and price.",
      "Communication Data: Records of your communications with our customer service team.",
      "Technical Data: Information about your device and how you interact with our website, including IP address, browser type, and pages visited.",
      "Cookies: We use cookies and similar tracking technologies to enhance your shopping experience and analyze website traffic.",
    ],
  },
  {
    title: "How We Use Your Information",
    icon: Shield,
    content: [
      "To process and fulfill your orders, including shipping and customer service.",
      "To communicate with you about your orders, account, and promotional offers (with your consent).",
      "To improve our website, products, and customer service.",
      "To prevent fraud and enhance security.",
      "To comply with legal obligations and protect our rights.",
    ],
  },
  {
    title: "Information Sharing",
    icon: Lock,
    content: [
      "Service Providers: We share information with trusted third parties who assist us in operating our website, processing payments, and delivering orders.",
      "Legal Requirements: We may disclose information when required by law or to protect our rights, property, or safety.",
      "Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.",
      "With Your Consent: We will share your information with third parties when you have given us explicit consent to do so.",
    ],
  },
  {
    title: "Your Rights",
    icon: Mail,
    content: [
      "Access: You have the right to access the personal information we hold about you.",
      "Correction: You can request corrections to any inaccurate or incomplete information.",
      "Deletion: You may request deletion of your personal information, subject to legal requirements.",
      'Opt-Out: You can opt out of marketing communications at any time by clicking "unsubscribe" in our emails.',
      "Data Portability: You have the right to receive your personal information in a structured, commonly used format.",
    ],
  },
  {
    title: "Data Security",
    icon: Shield,
    content: [
      "We implement industry-standard security measures to protect your personal information.",
      "All payment transactions are encrypted using SSL technology and processed through PCI-DSS compliant payment gateways.",
      "We regularly review our security practices and update them as necessary.",
      "While we strive to protect your information, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    title: "Cookies and Tracking",
    icon: Eye,
    content: [
      "Essential Cookies: Required for the website to function properly.",
      "Analytics Cookies: Help us understand how visitors interact with our website.",
      "Marketing Cookies: Used to deliver relevant advertisements.",
      "You can control cookie settings through your browser preferences, though this may affect website functionality.",
    ],
  },
];

const lastUpdated = "January 15, 2025";

export default function PrivacyPolicy() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden gradient-bg">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-champagne/20 rounded-full blur-3xl" />
        </div>

        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
              Data Protection
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Privacy
              <br />
              <span className="gradient-text">Policy</span>
            </h1>
            <p
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              We are committed to protecting your privacy and ensuring the
              security of your personal information.
            </p>
            <div
              className="mt-6 text-sm text-muted-foreground animate-fade-in"
              style={{ animationDelay: "300ms" }}
            >
              Last updated: {lastUpdated}
            </div>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-headings:font-serif max-w-none">
              <p className="lead text-lg text-muted-foreground mb-12">
                At Astrielle, we value your privacy and are committed to
                protecting your personal information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website or make a purchase.
              </p>

              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.title}
                    className="mb-12 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <h2 className="text-2xl font-serif font-semibold">
                        {section.title}
                      </h2>
                    </div>

                    <ul className="space-y-4">
                      {section.content.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}

              {/* Contact Information */}
              <div className="bg-secondary/30 rounded-xl p-8 mt-12 animate-fade-in">
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Contact Us
                </h3>
                <p className="text-muted-foreground mb-4">
                  If you have questions about this Privacy Policy or how we
                  handle your personal information, please contact us:
                </p>
                <div className="space-y-2">
                  <p>
                    <strong>Email:</strong> privacy@astrielle.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +27 21 123 4567
                  </p>
                  <p>
                    <strong>Address:</strong> Astrielle Fashion House, 123 Style
                    Avenue, Cape Town, 8000, South Africa
                  </p>
                </div>
              </div>

              {/* Policy Updates */}
              <div className="mt-12 p-6 border border-border rounded-xl">
                <h3 className="text-xl font-serif font-semibold mb-2">
                  Policy Updates
                </h3>
                <p className="text-muted-foreground">
                  We may update this Privacy Policy from time to time to reflect
                  changes in our practices or legal requirements. We will notify
                  you of any material changes by posting the updated policy on
                  our website and updating the "Last Updated" date.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
