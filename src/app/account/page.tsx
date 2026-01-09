'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, ChevronRight, User, Package, Heart, MapPin, CreditCard, Bell, LogOut } from 'lucide-react';

const menuItems = [
  { icon: User, label: 'Profile', id: 'profile' },
  { icon: Package, label: 'Orders', id: 'orders' },
  { icon: Heart, label: 'Wishlist', id: 'wishlist', href: '/wishlist' },
  { icon: MapPin, label: 'Addresses', id: 'addresses' },
  { icon: CreditCard, label: 'Payment Methods', id: 'payment' },
  { icon: Bell, label: 'Notifications', id: 'notifications' },
];

const orders = [
  { id: 'SES-123456', date: 'Jan 5, 2026', status: 'Delivered', total: 129.99, items: 3 },
  { id: 'SES-123455', date: 'Dec 28, 2025', status: 'Delivered', total: 79.50, items: 2 },
  { id: 'SES-123454', date: 'Dec 15, 2025', status: 'Delivered', total: 249.00, items: 5 },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');

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
            <span style={{ color: '#212529', fontWeight: 500 }}>My Account</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px' }}>
          {/* Sidebar */}
          <div>
            <div style={{ marginBottom: '24px', padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: '#1B5E3B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: 'white',
                fontSize: '24px',
                fontWeight: 600,
              }}>
                JD
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontWeight: 600, color: '#212529' }}>John Doe</div>
                <div style={{ fontSize: '14px', color: '#6C757D' }}>john@example.com</div>
              </div>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {menuItems.map((item) => (
                item.href ? (
                  <Link
                    key={item.id}
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      color: '#6C757D',
                      fontSize: '15px',
                    }}
                  >
                    <item.icon style={{ width: '18px', height: '18px' }} />
                    {item.label}
                  </Link>
                ) : (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      border: 'none',
                      background: activeTab === item.id ? '#E8F5E9' : 'transparent',
                      color: activeTab === item.id ? '#1B5E3B' : '#6C757D',
                      cursor: 'pointer',
                      fontSize: '15px',
                      textAlign: 'left',
                      width: '100%',
                    }}
                  >
                    <item.icon style={{ width: '18px', height: '18px' }} />
                    {item.label}
                  </button>
                )
              ))}
              <button
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'transparent',
                  color: '#DC3545',
                  cursor: 'pointer',
                  fontSize: '15px',
                  textAlign: 'left',
                  width: '100%',
                  marginTop: '12px',
                }}
              >
                <LogOut style={{ width: '18px', height: '18px' }} />
                Sign Out
              </button>
            </nav>
          </div>

          {/* Content */}
          <div>
            {activeTab === 'profile' && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#212529', marginBottom: '32px' }}>
                  Profile Settings
                </h1>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>First Name</label>
                    <input type="text" defaultValue="John" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Last Name</label>
                    <input type="text" defaultValue="Doe" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Email</label>
                  <input type="email" defaultValue="john@example.com" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Phone</label>
                  <input type="tel" defaultValue="+1 (234) 567-8900" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                </div>
                <button className="btn btn-primary">Save Changes</button>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#212529', marginBottom: '32px' }}>
                  Order History
                </h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr auto auto auto',
                        gap: '24px',
                        alignItems: 'center',
                        padding: '20px',
                        background: '#F8F9FA',
                        borderRadius: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: '#212529', marginBottom: '4px' }}>{order.id}</div>
                        <div style={{ fontSize: '14px', color: '#6C757D' }}>{order.date} • {order.items} items</div>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        borderRadius: '50px',
                        fontSize: '13px',
                        fontWeight: 500,
                        background: order.status === 'Delivered' ? '#E8F5E9' : '#FFF3CD',
                        color: order.status === 'Delivered' ? '#1B5E3B' : '#856404',
                      }}>
                        {order.status}
                      </div>
                      <div style={{ fontWeight: 600, color: '#212529' }}>${order.total.toFixed(2)}</div>
                      <Link href={`/track-order?order=${order.id}`} style={{ color: '#1B5E3B', fontSize: '14px', fontWeight: 500 }}>
                        View Details
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'addresses' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#212529' }}>
                    Saved Addresses
                  </h1>
                  <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                    Add New Address
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div style={{ padding: '20px', border: '2px solid #1B5E3B', borderRadius: '12px', position: 'relative' }}>
                    <span style={{
                      position: 'absolute',
                      top: '-10px',
                      left: '16px',
                      background: '#1B5E3B',
                      color: 'white',
                      fontSize: '12px',
                      padding: '2px 8px',
                      borderRadius: '4px',
                    }}>
                      Default
                    </span>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>Home</div>
                    <div style={{ color: '#6C757D', fontSize: '14px', lineHeight: 1.5 }}>
                      John Doe<br />
                      123 Main Street<br />
                      New York, NY 10001<br />
                      +1 (234) 567-8900
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                      <button style={{ color: '#1B5E3B', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Edit</button>
                      <button style={{ color: '#DC3545', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Delete</button>
                    </div>
                  </div>
                  <div style={{ padding: '20px', border: '1px solid #E9ECEF', borderRadius: '12px' }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>Office</div>
                    <div style={{ color: '#6C757D', fontSize: '14px', lineHeight: 1.5 }}>
                      John Doe<br />
                      456 Business Ave, Suite 100<br />
                      New York, NY 10002<br />
                      +1 (234) 567-8901
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                      <button style={{ color: '#1B5E3B', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Edit</button>
                      <button style={{ color: '#DC3545', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'payment' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                  <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#212529' }}>
                    Payment Methods
                  </h1>
                  <button className="btn btn-primary" style={{ padding: '10px 20px' }}>
                    Add Card
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', background: '#F8F9FA', borderRadius: '12px' }}>
                    <div style={{ width: '48px', height: '32px', background: '#1A1F71', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: 'white', fontSize: '12px', fontWeight: 600 }}>VISA</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 500 }}>•••• •••• •••• 3456</div>
                      <div style={{ fontSize: '13px', color: '#6C757D' }}>Expires 12/27</div>
                    </div>
                    <span style={{ fontSize: '12px', padding: '4px 8px', background: '#E8F5E9', color: '#1B5E3B', borderRadius: '4px' }}>Default</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#212529', marginBottom: '32px' }}>
                  Notification Preferences
                </h1>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {[
                    { title: 'Order Updates', desc: 'Get notified about your order status' },
                    { title: 'Promotional Emails', desc: 'Receive deals and special offers' },
                    { title: 'New Arrivals', desc: 'Be the first to know about new products' },
                    { title: 'Price Drops', desc: 'Get alerts when wishlist items go on sale' },
                  ].map((item) => (
                    <label key={item.title} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#F8F9FA', borderRadius: '10px', cursor: 'pointer' }}>
                      <div>
                        <div style={{ fontWeight: 500, marginBottom: '4px' }}>{item.title}</div>
                        <div style={{ fontSize: '14px', color: '#6C757D' }}>{item.desc}</div>
                      </div>
                      <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px', accentColor: '#1B5E3B' }} />
                    </label>
                  ))}
                </div>
                <button className="btn btn-primary" style={{ marginTop: '24px' }}>
                  Save Preferences
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
