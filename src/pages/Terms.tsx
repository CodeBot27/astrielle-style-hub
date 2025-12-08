import { Layout } from "@/components/layout/Layout";
import { FileText, Scale, AlertCircle, Shield } from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    icon: FileText,
    content: `By accessing and using the Astrielle website (astrielle.com) and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of those changes.`,
  },
  {
    title: "Account Registration",
    icon: Shield,
    content: `To make purchases or access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must provide accurate and complete information and promptly update any changes. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "Product Information",
    icon: AlertCircle,
    content: `We strive to display product colors, features, specifications, and details as accurately as possible. However, slight variations may occur due to screen settings, lighting conditions, or product updates. All prices are in South African Rand (ZAR) and include VAT unless otherwise stated. We reserve the right to correct any pricing errors.`,
  },
  {
    title: "Orders & Payment",
    icon: Scale,
    content: `All orders are subject to acceptance and availability. We may refuse or cancel any order at our discretion. Payment must be completed at the time of ordering. We accept major credit cards, PayPal, and other approved payment methods. Orders are only confirmed once payment is successfully processed.`,
  },
  {
    title: "Shipping & Delivery",
    icon: FileText,
    content: `Shipping times are estimates and not guaranteed. We are not liable for delays caused by carriers, customs, or unforeseen circumstances. Risk of loss passes to you upon delivery to the carrier. You are responsible for providing accurate shipping information; we are not liable for packages sent to incorrect addresses.`,
  },
  {
    title: "Returns & Refunds",
    icon: Scale,
    content: `Returns must comply with our Return Policy. Refunds are processed to the original payment method. We reserve the right to refuse returns that don't meet our policy requirements. Sale items and personalized products may have different return conditions as specified at purchase.`,
  },
  {
    title: "Intellectual Property",
    icon: Shield,
    content: `All content on our website, including text, graphics, logos, images, and software, is the property of Astrielle or its licensors and is protected by copyright and trademark laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.`,
  },
  {
    title: "User Conduct",
    icon: AlertCircle,
    content: `You agree not to use our website for any unlawful purpose or to violate any laws. Prohibited activities include: fraud, harassment, transmitting harmful code, collecting user information without consent, or interfering with website functionality. We may terminate access for violations.`,
  },
  {
    title: "Limitation of Liability",
    icon: Scale,
    content: `To the fullest extent permitted by law, Astrielle shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or products. Our total liability shall not exceed the amount you paid for the products in question.`,
  },
  {
    title: "Governing Law",
    icon: FileText,
    content: `These Terms of Service are governed by the laws of South Africa. Any disputes shall be subject to the exclusive jurisdiction of the courts of Cape Town, South Africa. The United Nations Convention on Contracts for the International Sale of Goods shall not apply.`,
  },
];

const importantNotes = [
  "We reserve the right to modify or discontinue any aspect of our website or services at any time.",
  "These terms constitute the entire agreement between you and Astrielle.",
  "If any provision is found invalid, the remaining provisions remain in effect.",
  "Our failure to enforce any right does not constitute a waiver of that right.",
];

const lastUpdated = "January 15, 2025";

export default function Terms() {
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
              Legal Information
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Terms of
              <br />
              <span className="gradient-text">Service</span>
            </h1>
            <p
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Please read these terms carefully before using our website or
              services.
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

      {/* Terms Content */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 p-6 bg-secondary/30 rounded-xl">
              <p className="text-center text-muted-foreground">
                By accessing and using Astrielle's website and services, you
                agree to be bound by these Terms of Service. These terms affect
                your legal rights and responsibilities.
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.title}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-serif font-semibold mb-3">
                          {section.title}
                        </h2>
                        <div className="prose prose-gray max-w-none">
                          <p className="text-muted-foreground">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Important Notes */}
            <div className="mt-16 p-8 border border-border rounded-xl bg-secondary/10 animate-fade-in">
              <h3 className="text-2xl font-serif font-semibold mb-6 flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-accent" />
                Important Notes
              </h3>
              <ul className="space-y-3">
                {importantNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-accent mt-1">•</span>
                    <span className="text-muted-foreground">{note}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div className="mt-12 text-center">
              <div className="p-8 bg-card border border-border rounded-xl">
                <h3 className="text-2xl font-serif font-semibold mb-4">
                  Questions About Our Terms?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                  If you have any questions about these Terms of Service, please
                  contact our legal team.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="mailto:legal@astrielle.com"
                    className="btn-primary inline-flex items-center justify-center"
                  >
                    Contact Legal Team
                  </a>
                  <a
                    href="/privacy-policy"
                    className="btn-secondary inline-flex items-center justify-center"
                  >
                    View Privacy Policy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
