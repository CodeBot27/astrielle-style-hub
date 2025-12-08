import { Layout } from "@/components/layout/Layout";
import {
  Cookie,
  Shield,
  Settings,
  BarChart,
  Target,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

const cookieTypes = [
  {
    name: "Essential Cookies",
    icon: Shield,
    description: "Required for the website to function properly",
    examples: [
      "Session management",
      "Shopping cart functionality",
      "Authentication",
    ],
    necessary: true,
  },
  {
    name: "Analytics Cookies",
    icon: BarChart,
    description: "Help us understand how visitors interact with our website",
    examples: ["Page views", "Traffic sources", "Bounce rates"],
    necessary: false,
  },
  {
    name: "Functional Cookies",
    icon: Settings,
    description: "Remember your preferences and settings",
    examples: [
      "Language preferences",
      "Currency selection",
      "Size preferences",
    ],
    necessary: false,
  },
  {
    name: "Marketing Cookies",
    icon: Target,
    description: "Used to deliver relevant advertisements",
    examples: [
      "Retargeting campaigns",
      "Social media integration",
      "Personalized offers",
    ],
    necessary: false,
  },
];

const cookieDetails = [
  {
    name: "_astrielle_session",
    purpose: "Maintains user session state",
    duration: "Session",
    type: "Essential",
  },
  {
    name: "_ga",
    purpose: "Google Analytics tracking",
    duration: "2 years",
    type: "Analytics",
  },
  {
    name: "_gid",
    purpose: "Google Analytics user identification",
    duration: "24 hours",
    type: "Analytics",
  },
  {
    name: "preferences",
    purpose: "Stores user preferences",
    duration: "1 year",
    type: "Functional",
  },
  {
    name: "fbp",
    purpose: "Facebook pixel tracking",
    duration: "3 months",
    type: "Marketing",
  },
];

export default function Cookies() {
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    analytics: true,
    functional: true,
    marketing: false,
  });

  const handlePreferenceChange = (type: string) => {
    setCookiePreferences((prev) => ({
      ...prev,
      [type]: !prev[type as keyof typeof prev],
    }));
  };

  const savePreferences = () => {
    // In a real app, this would save to localStorage/backend
    alert("Cookie preferences saved!");
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
            <div className="flex justify-center mb-6">
              <Cookie className="w-12 h-12 text-accent animate-bounce" />
            </div>
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
              Website Tracking
            </p>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold mb-6 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Cookies
              <br />
              <span className="gradient-text">Policy</span>
            </h1>
            <p
              className="text-lg text-muted-foreground animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Learn how we use cookies and similar technologies to enhance your
              browsing experience.
            </p>
          </div>
        </div>
      </section>

      {/* What Are Cookies */}
      <section className="py-12 md:py-20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-serif font-semibold mb-6">
                  What Are Cookies?
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Cookies are small text files that are stored on your device
                    when you visit a website. They help websites remember
                    information about your visit, which can make it easier to
                    visit the site again and make the site more useful to you.
                  </p>
                  <p>
                    We use cookies to provide, protect, and improve our
                    services, such as by personalizing content, offering and
                    measuring advertisements, understanding user behavior, and
                    providing a safer experience.
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-serif font-semibold">
                    Important Note
                  </h3>
                </div>
                <p className="text-muted-foreground">
                  Essential cookies are necessary for our website to function
                  and cannot be disabled. You can control other cookie types
                  through your browser settings or our cookie preferences tool.
                </p>
              </div>
            </div>

            {/* Cookie Types */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
                Types of Cookies We Use
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {cookieTypes.map((cookie, index) => {
                  const Icon = cookie.icon;
                  return (
                    <div
                      key={cookie.name}
                      className="bg-card border border-border rounded-xl p-6 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                        <div>
                          <div className="flex items-center justify-between">
                            <h3 className="font-serif font-semibold text-lg">
                              {cookie.name}
                            </h3>
                            {cookie.necessary && (
                              <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">
                                Necessary
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {cookie.description}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4">
                        <p className="text-sm font-medium mb-2">Examples:</p>
                        <ul className="space-y-1">
                          {cookie.examples.map((example, i) => (
                            <li
                              key={i}
                              className="text-sm text-muted-foreground flex items-center gap-2"
                            >
                              <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                              {example}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cookie Preferences */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
                Manage Cookie Preferences
              </h2>

              <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto">
                <div className="space-y-6">
                  {Object.entries(cookiePreferences).map(([type, enabled]) => (
                    <div
                      key={type}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div>
                        <h3 className="font-medium capitalize">
                          {type} Cookies
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {type === "essential"
                            ? "Required for website functionality"
                            : `Allows us to ${
                                type === "analytics"
                                  ? "analyze website usage"
                                  : type === "functional"
                                  ? "remember your preferences"
                                  : "show relevant ads"
                              }`}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {type === "essential" ? (
                          <span className="text-sm text-muted-foreground">
                            Always On
                          </span>
                        ) : (
                          <>
                            <button
                              onClick={() => handlePreferenceChange(type)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                enabled ? "bg-accent" : "bg-secondary"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  enabled ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                            <span className="text-sm font-medium w-10">
                              {enabled ? "On" : "Off"}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    onClick={savePreferences}
                    className="btn-primary px-8"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>

            {/* Cookie Details Table */}
            <div className="mb-16">
              <h2 className="text-3xl font-serif font-semibold mb-8 text-center">
                Detailed Cookie Information
              </h2>

              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-secondary/50">
                        <th className="text-left p-4 font-serif font-semibold">
                          Cookie Name
                        </th>
                        <th className="text-left p-4 font-serif font-semibold">
                          Purpose
                        </th>
                        <th className="text-left p-4 font-serif font-semibold">
                          Duration
                        </th>
                        <th className="text-left p-4 font-serif font-semibold">
                          Type
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cookieDetails.map((cookie, index) => (
                        <tr
                          key={cookie.name}
                          className="border-t border-border hover:bg-secondary/30 transition-colors"
                        >
                          <td className="p-4 font-mono text-sm">
                            {cookie.name}
                          </td>
                          <td className="p-4">{cookie.purpose}</td>
                          <td className="p-4">{cookie.duration}</td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs ${
                                cookie.type === "Essential"
                                  ? "bg-accent/10 text-accent"
                                  : cookie.type === "Analytics"
                                  ? "bg-blue-500/10 text-blue-500"
                                  : cookie.type === "Functional"
                                  ? "bg-green-500/10 text-green-500"
                                  : "bg-purple-500/10 text-purple-500"
                              }`}
                            >
                              {cookie.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Browser Controls */}
            <div className="bg-secondary/30 rounded-xl p-8">
              <h2 className="text-2xl font-serif font-semibold mb-6 text-center">
                How to Control Cookies in Your Browser
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-serif font-semibold mb-3">
                    Google Chrome
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Settings → Privacy and security → Cookies and other site
                    data
                  </p>
                </div>

                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-serif font-semibold mb-3">Safari</h3>
                  <p className="text-sm text-muted-foreground">
                    Preferences → Privacy → Cookies and website data
                  </p>
                </div>

                <div className="text-center p-6 bg-card rounded-lg border border-border">
                  <h3 className="font-serif font-semibold mb-3">Firefox</h3>
                  <p className="text-sm text-muted-foreground">
                    Options → Privacy & Security → Cookies and Site Data
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Note: Disabling cookies may affect website functionality and
                  user experience.
                </p>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-6">
                For questions about our Cookies Policy, contact us at{" "}
                <a
                  href="mailto:privacy@astrielle.com"
                  className="text-accent hover:underline"
                >
                  privacy@astrielle.com
                </a>
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <a href="/privacy-policy" className="btn-secondary">
                  View Privacy Policy
                </a>
                <a href="/terms" className="btn-secondary">
                  View Terms of Service
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
