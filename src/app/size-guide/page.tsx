import Link from 'next/link';
import { Home, ChevronRight, Ruler, HelpCircle } from 'lucide-react';

export default function SizeGuidePage() {
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
            <span style={{ color: '#212529', fontWeight: 500 }}>Size Guide</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: '#E8F5E9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <Ruler style={{ width: '32px', height: '32px', color: '#1B5E3B' }} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#212529', marginBottom: '12px' }}>
              Size Guide
            </h1>
            <p style={{ color: '#6C757D', fontSize: '16px' }}>
              Find the right size for your Sesoris products
            </p>
          </div>

          {/* Storage Containers */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Storage Containers
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#1B5E3B', color: 'white' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Size</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Dimensions (L x W x H)</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Capacity</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Ideal For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { size: 'XS', dim: '15 x 10 x 8 cm', cap: '0.5 L', use: 'Spices, small accessories' },
                    { size: 'S', dim: '20 x 15 x 10 cm', cap: '1.5 L', use: 'Snacks, stationery' },
                    { size: 'M', dim: '30 x 20 x 15 cm', cap: '4.5 L', use: 'Undergarments, toys' },
                    { size: 'L', dim: '40 x 30 x 20 cm', cap: '12 L', use: 'Clothing, shoes' },
                    { size: 'XL', dim: '50 x 40 x 30 cm', cap: '30 L', use: 'Blankets, gear' },
                  ].map((row, i) => (
                    <tr key={row.size} style={{ background: i % 2 === 0 ? '#F8F9FA' : 'white' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 600, color: '#1B5E3B' }}>{row.size}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.dim}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.cap}</td>
                      <td style={{ padding: '14px 16px', color: '#6C757D' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kitchen Items */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Kitchen Items
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#1B5E3B', color: 'white' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Product</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Size</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Capacity</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Serving</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { prod: 'Lunch Box', size: '21 x 15 x 6 cm', cap: '1 L', portion: '1 adult serving' },
                    { prod: 'Lunch Box Family', size: '28 x 20 x 8 cm', cap: '2.5 L', portion: '2-3 servings' },
                    { prod: 'Tumbler Mini', size: '\u00D8 7 x 15 cm', cap: '350 ml', portion: '1-2 cups' },
                    { prod: 'Tumbler Standard', size: '\u00D8 7 x 22 cm', cap: '500 ml', portion: '2-3 cups' },
                    { prod: 'Tumbler Large', size: '\u00D8 8 x 26 cm', cap: '750 ml', portion: '3-4 cups' },
                  ].map((row, i) => (
                    <tr key={row.prod} style={{ background: i % 2 === 0 ? '#F8F9FA' : 'white' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500, color: '#212529' }}>{row.prod}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.size}</td>
                      <td style={{ padding: '14px 16px', color: '#1B5E3B', fontWeight: 500 }}>{row.cap}</td>
                      <td style={{ padding: '14px 16px', color: '#6C757D' }}>{row.portion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Bags */}
          <div style={{ marginBottom: '48px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
              Bags & Organizers
            </h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#1B5E3B', color: 'white' }}>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Type</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Dimensions</th>
                    <th style={{ padding: '14px 16px', textAlign: 'left', fontWeight: 600 }}>Ideal For</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { type: 'Pouch Mini', dim: '15 x 10 cm', use: 'Cosmetics, cables, accessories' },
                    { type: 'Pouch Medium', dim: '22 x 15 cm', use: 'Tablet, charger, toiletries' },
                    { type: 'Tote Bag S', dim: '30 x 25 x 10 cm', use: 'Light shopping, books' },
                    { type: 'Tote Bag M', dim: '40 x 35 x 12 cm', use: 'Laptop 13", daily shopping' },
                    { type: 'Tote Bag L', dim: '45 x 40 x 15 cm', use: 'Laptop 15", gym, travel' },
                  ].map((row, i) => (
                    <tr key={row.type} style={{ background: i % 2 === 0 ? '#F8F9FA' : 'white' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 500, color: '#212529' }}>{row.type}</td>
                      <td style={{ padding: '14px 16px', color: '#212529' }}>{row.dim}</td>
                      <td style={{ padding: '14px 16px', color: '#6C757D' }}>{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Measure */}
          <div style={{
            padding: '24px',
            background: '#E8F5E9',
            borderRadius: '12px',
            marginBottom: '48px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <HelpCircle style={{ width: '20px', height: '20px', color: '#1B5E3B' }} />
              <span style={{ fontWeight: 600, color: '#1B5E3B' }}>Measurement Tips</span>
            </div>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#212529', fontSize: '14px', lineHeight: 1.8 }}>
              <li>L = Length (longest side)</li>
              <li>W = Width (second longest side)</li>
              <li>H = Height (from base to top)</li>
              <li>{'\u00D8'} = Diameter (for round products)</li>
              <li>Capacity is measured to the rim of the container</li>
            </ul>
          </div>

          {/* Contact CTA */}
          <div style={{
            padding: '24px',
            background: '#F8F9FA',
            borderRadius: '12px',
            textAlign: 'center',
          }}>
            <p style={{ color: '#6C757D', marginBottom: '12px' }}>
              Still unsure about which size to choose?
            </p>
            <Link href="/contact" style={{ color: '#1B5E3B', fontWeight: 500 }}>
              Ask Our Customer Service
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
