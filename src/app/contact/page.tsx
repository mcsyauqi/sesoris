'use client';

import { useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { toast } from '@/components/ui/toast';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    content: 'hello@sesoris.com',
    link: 'mailto:hello@sesoris.com',
  },
  {
    icon: Phone,
    title: 'Phone',
    content: '+1 (234) 567-8900',
    link: 'tel:+12345678900',
  },
  {
    icon: MapPin,
    title: 'Address',
    content: '123 Main Street\nNew York, NY 10001',
  },
  {
    icon: Clock,
    title: 'Business Hours',
    content: 'Mon-Fri: 9AM - 6PM\nSat: 10AM - 4PM\nSun: Closed',
  },
];

const subjectOptions = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'order', label: 'Order Question' },
  { value: 'return', label: 'Returns & Refunds' },
  { value: 'shipping', label: 'Shipping Information' },
  { value: 'product', label: 'Product Question' },
  { value: 'other', label: 'Other' },
];

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/sesoris', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/sesoris', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/sesoris', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/sesoris', label: 'YouTube' },
];

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'Contact' }]} />
        </div>
      </div>

      {/* Header */}
      <section className="py-12 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-[#212529] mb-4">Contact Us</h1>
          <p className="text-lg text-[#6C757D] max-w-md mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-xl font-semibold text-[#212529] mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.title} className="flex gap-4">
                      <div className="p-3 bg-[#E8F5E9] rounded-lg h-fit">
                        <info.icon className="w-5 h-5 text-[#1B5E3B]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-[#212529] mb-1">
                          {info.title}
                        </h3>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="text-[#6C757D] hover:text-[#1B5E3B] whitespace-pre-line"
                          >
                            {info.content}
                          </a>
                        ) : (
                          <p className="text-[#6C757D] whitespace-pre-line">
                            {info.content}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-medium text-[#212529] mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-gray-100 rounded-lg hover:bg-[#E8F5E9] hover:text-[#1B5E3B] transition-colors"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-[#F8F9FA] rounded-2xl p-8">
                <h2 className="text-xl font-semibold text-[#212529] mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </div>
                  <Select
                    label="Subject"
                    value={formData.subject}
                    onChange={(value) =>
                      setFormData({ ...formData, subject: value })
                    }
                    options={subjectOptions}
                    fullWidth
                  />
                  <div>
                    <label className="text-sm font-medium text-[#343A40] block mb-1.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 text-sm rounded-lg border border-[#E9ECEF] bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5E3B] focus:border-transparent resize-none transition-all"
                      placeholder="How can we help you?"
                    />
                  </div>
                  <Button type="submit" isLoading={isSubmitting} size="lg">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
