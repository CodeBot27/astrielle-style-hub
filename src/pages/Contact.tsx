import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Please enter a valid email').max(255),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000),
});

const contactInfo = [
  {
    icon: MapPin,
    title: 'Visit Us',
    details: ['123 Fashion Avenue', 'New York, NY 10001'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    details: ['+1 (555) 123-4567', 'Mon-Fri: 9AM-6PM EST'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    details: ['hello@astrielle.com', 'support@astrielle.com'],
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Mon-Fri: 9AM-6PM', 'Sat-Sun: 10AM-4PM'],
  },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: 'Message sent!',
      description: "Thank you for reaching out. We'll get back to you soon.",
    });

    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-28 gradient-bg">
        <div className="container-main">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-accent font-medium tracking-widest uppercase text-sm mb-4 animate-fade-in">
              Get in Touch
            </p>
            <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
              We'd Love to
              <br />
              <span className="gradient-text">Hear From You</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: '200ms' }}>
              Have questions about our collections, need styling advice, or want to collaborate? We're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12 -mt-8">
        <div className="container-main">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={info.title}
                className="bg-card border border-border rounded-xl p-6 card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <info.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-serif font-semibold mb-2">{info.title}</h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 md:py-28">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-6">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={cn('input-field', errors.name && 'border-destructive')}
                      placeholder="John Doe"
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn('input-field', errors.email && 'border-destructive')}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={cn('input-field', errors.subject && 'border-destructive')}
                    placeholder="How can we help?"
                  />
                  {errors.subject && (
                    <p className="text-sm text-destructive mt-1">{errors.subject}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className={cn('input-field resize-none', errors.message && 'border-destructive')}
                    placeholder="Tell us more about your inquiry..."
                  />
                  {errors.message && (
                    <p className="text-sm text-destructive mt-1">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary inline-flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            {/* Map Placeholder */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">
                Find Our Store
              </h2>
              
              <div className="aspect-square lg:aspect-auto lg:h-[500px] rounded-xl overflow-hidden bg-secondary relative">
                {/* Map Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <div className="text-center p-8">
                    <MapPin className="w-12 h-12 mx-auto mb-4 text-accent" />
                    <h3 className="font-serif font-semibold text-lg mb-2">
                      Astrielle Flagship Store
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      123 Fashion Avenue
                      <br />
                      New York, NY 10001
                    </p>
                    <a
                      href="https://maps.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:underline text-sm font-medium"
                    >
                      Get Directions →
                    </a>
                  </div>
                </div>
                
                {/* Decorative Map Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="w-full h-full" style={{
                    backgroundImage: `
                      linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                      linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
