import { Layout } from "@/components/layout/Layout";
import { ChevronDown, Mail, Phone, MessageCircle } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    title: "Orders & Shipping",
    icon: "📦",
    questions: [
      {
        question: "How long does shipping take?",
        answer:
          "Standard shipping takes 3-5 business days within South Africa. Express shipping is available and takes 1-2 business days. International shipping times vary by destination but typically range from 7-14 business days.",
      },
      {
        question: "Do you ship internationally?",
        answer:
          "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location. You can view available countries and rates at checkout.",
      },
      {
        question: "Can I change or cancel my order?",
        answer:
          "You can change or cancel your order within 1 hour of placing it by contacting our customer service team. After this window, orders begin processing and cannot be modified.",
      },
      {
        question: "How do I track my order?",
        answer:
          "Once your order ships, you'll receive a tracking number via email. You can track your order directly through our website or the courier's website using this number.",
      },
    ],
  },
  {
    title: "Returns & Exchanges",
    icon: "🔄",
    questions: [
      {
        question: "What is your return policy?",
        answer:
          "We offer a 30-day return policy for unworn, unwashed items with original tags attached. Sale items can be exchanged for store credit within 14 days. Final sale items are non-returnable.",
      },
      {
        question: "How do I return an item?",
        answer:
          "Initiate a return through your account page, print the prepaid return label, and drop the package at any authorized drop-off location. Returns are processed within 3-5 business days of receipt.",
      },
      {
        question: "Are return shipping costs covered?",
        answer:
          "We provide free returns for defective or incorrect items. For change of mind returns, a flat return fee of R50 will be deducted from your refund within South Africa. International returns are subject to local shipping rates.",
      },
      {
        question: "How long do refunds take?",
        answer:
          "Refunds are processed within 3-5 business days after we receive your return. The time it takes for the refund to appear in your account depends on your payment method and bank (typically 5-10 business days).",
      },
    ],
  },
  {
    title: "Product & Sizing",
    icon: "👕",
    questions: [
      {
        question: "How do I find my correct size?",
        answer:
          "We provide detailed size guides for each product. Measurements are in centimeters. For personalized advice, our stylists can help via live chat or email.",
      },
      {
        question: "Are your products true to size?",
        answer:
          "Most of our products are true to size. We recommend checking the specific product's size chart as some items may have unique fits. Customer reviews often include sizing information.",
      },
      {
        question: "What materials are your products made from?",
        answer:
          "We use sustainable, high-quality materials including organic cotton, linen, Tencel, recycled polyester, and ethically sourced wool. Material composition is listed on each product page.",
      },
      {
        question: "Do you offer plus sizes?",
        answer:
          "Yes, we have an extended size range up to 4XL for selected styles. You can filter by size on our shop page to view available options.",
      },
    ],
  },
  {
    title: "Payment & Security",
    icon: "💳",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept Visa, MasterCard, American Express, PayPal, and secure bank transfers (EFT). All transactions are encrypted and secure.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use 256-bit SSL encryption and PCI-DSS compliant payment processors. We never store your full credit card details on our servers.",
      },
      {
        question: "Do you offer installment payments?",
        answer:
          "Yes, we offer payment plans through PayJustNow and other approved providers for orders over R500. Select this option at checkout.",
      },
      {
        question: "Can I use multiple payment methods?",
        answer:
          "Currently, we only accept one payment method per order. However, you can use gift cards alongside your preferred payment method.",
      },
    ],
  },
];

const contactOptions = [
  {
    icon: Mail,
    title: "Email Us",
    description: "response@astrielle.com",
    details: "Typically respond within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+27 21 123 4567",
    details: "Mon-Fri, 9am-5pm SAST",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with us",
    details: "Available during business hours",
  },
];

export default function FAQ() {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>(
    {}
  );

  const toggleQuestion = (categoryIndex: number, questionIndex: number) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

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
              Help Center
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Frequently Asked
              <br />
              <span className="gradient-text">Questions</span>
            </h1>
            <p
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Find answers to common questions about orders, shipping, returns,
              and more. Can't find what you're looking for? Contact our team.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-8">
            {faqCategories.map((category, categoryIndex) => (
              <div
                key={category.title}
                className="bg-card rounded-xl border border-border p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h2 className="text-2xl font-serif font-semibold">
                    {category.title}
                  </h2>
                </div>

                <div className="space-y-4">
                  {category.questions.map((item, questionIndex) => {
                    const key = `${categoryIndex}-${questionIndex}`;
                    const isOpen = openQuestions[key];

                    return (
                      <div
                        key={item.question}
                        className="border-b border-border last:border-b-0"
                      >
                        <button
                          onClick={() =>
                            toggleQuestion(categoryIndex, questionIndex)
                          }
                          className="flex items-center justify-between w-full py-4 text-left"
                        >
                          <span className="font-medium text-foreground pr-8">
                            {item.question}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen ? "max-h-48 pb-4" : "max-h-0"
                          }`}
                        >
                          <p className="text-muted-foreground">{item.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-4">
              Still Need Help?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Our customer service team is here to assist you with any questions
              or concerns.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {contactOptions.map((option) => {
              const Icon = option.icon;
              return (
                <div
                  key={option.title}
                  className="bg-card rounded-xl border border-border p-6 text-center hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-serif font-semibold text-lg mb-2">
                    {option.title}
                  </h3>
                  <p className="font-medium mb-1">{option.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {option.details}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <a
              href="/shipping-returns"
              className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                Shipping & Returns
              </h3>
              <p className="text-sm text-muted-foreground">
                Detailed information about shipping options, delivery times, and
                return procedures.
              </p>
            </a>

            <a
              href="/size-guide"
              className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                Size Guide
              </h3>
              <p className="text-sm text-muted-foreground">
                Find your perfect fit with our comprehensive sizing charts and
                measurement guides.
              </p>
            </a>

            <a
              href="/privacy-policy"
              className="bg-card border border-border p-6 rounded-xl hover:shadow-lg transition-all duration-300 group"
            >
              <h3 className="font-serif font-semibold text-lg mb-2 group-hover:text-accent transition-colors">
                Privacy Policy
              </h3>
              <p className="text-sm text-muted-foreground">
                Learn how we protect your personal information and your rights
                regarding data privacy.
              </p>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
