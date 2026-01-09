'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'general', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: 'general', message: '' });
  };

  return (
    <>
      {/* Breadcrumb */}
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ display: 'flex', alignItems: 'center', color: '#6C757D' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#6C757D' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Contact</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>Contact Us</h1>
          <p style={{ color: '#6C757D', fontSize: '16px' }}>
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px' }}>
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>Get in Touch</h2>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <Mail style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Email</div>
                  <a href="mailto:hello@sesoris.com" style={{ color: '#1B5E3B' }}>hello@sesoris.com</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <Phone style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Phone</div>
                  <a href="tel:+12345678900" style={{ color: '#6C757D' }}>+1 (234) 567-8900</a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '20px' }}>
                <MapPin style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Address</div>
                  <div style={{ color: '#6C757D', lineHeight: 1.5 }}>
                    123 Main Street<br />
                    New York, NY 10001
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <Clock style={{ width: '20px', height: '20px', color: '#1B5E3B', marginTop: '2px' }} />
                <div>
                  <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>Business Hours</div>
                  <div style={{ color: '#6C757D', fontSize: '14px', lineHeight: 1.6 }}>
                    Mon-Fri: 9AM - 6PM<br />
                    Sat: 10AM - 4PM<br />
                    Sun: Closed
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 600, color: '#212529', marginBottom: '12px' }}>Follow Us</div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Facebook style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Instagram style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Twitter style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
                <a href="#" style={{ width: '40px', height: '40px', borderRadius: '8px', background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Youtube style={{ width: '18px', height: '18px', color: '#343A40' }} />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Your Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF',
                      fontSize: '15px'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: '1px solid #E9ECEF',
                      fontSize: '15px'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Subject</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E9ECEF',
                    fontSize: '15px',
                    background: 'white'
                  }}
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Question</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, color: '#212529', marginBottom: '8px' }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How can we help you?"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    border: '1px solid #E9ECEF',
                    fontSize: '15px',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Send style={{ width: '16px', height: '16px' }} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
