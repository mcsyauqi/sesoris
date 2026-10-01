import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Facebook, Instagram, Youtube } from 'lucide-react';
import { NewsletterForm } from './NewsletterForm';

const footerLinks = {
  shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Kitchen & Dining', href: '/category/kitchen-dining' },
    { name: 'Home & Decor', href: '/category/home-living' },
    { name: 'Bags & Pouches', href: '/category/bags-pouches' },
    { name: 'Travel & Outdoor', href: '/category/outdoor-travel' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Best Sellers', href: '/best-sellers' },
    { name: 'On Sale', href: '/on-sale' },
  ],
  help: [
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'Shipping', href: '/shipping' },
    { name: 'Returns', href: '/returns' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track-order' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  // Free /tools/* utility pages. Added to the footer 2026-07-31: GSC URL
  // Inspection showed all five were orphans (zero inbound internal links,
  // unreachable from the homepage), so Google left them at
  // "Discovered - currently not indexed". A sitewide footer link makes them
  // reachable at depth 1 from every page on the site.
  tools: [
    { name: 'Storage Box Capacity Calculator', href: '/tools/kalkulator-kapasitas-kebutuhan-storage-box' },
    { name: 'Decluttering Calculator for Small Rooms', href: '/tools/kalkulator-decluttering-tata-ruang-sempit-kamar-kostdapur-minimalis' },
    { name: 'Home Organization Type Quiz', href: '/tools/quiz-tipe-organisasi-rumahmu-rekomendasi-produk' },
    { name: 'Online Ruler and Measuring Tool', href: '/tools/penggaris-alat-ukur-online' },
    { name: 'Online Unit Converter', href: '/tools/konverter-satuan-online' },
  ],
  popularArticles: [
    { name: 'Small Apartment Kitchen Organization', href: '/blog/cara-menata-dapur-kecil-apartemen' },
    { name: 'L-Shaped Kitchen Design', href: '/blog/desain-dapur-letter-l-layout-paling-efisien' },
    { name: 'Bathroom Storage Ideas', href: '/blog/ide-penyimpanan-kamar-mandi-agar-rapi' },
    { name: 'Decluttering Guide for Beginners', href: '/blog/panduan-decluttering-rumah-untuk-pemula' },
    { name: 'Meal Prep Container Guide', href: '/blog/panduan-meal-prep-container-untuk-pemula' },
    { name: '30-Minute Speed Cleaning Tips', href: '/blog/tips-bersih-bersih-rumah-cepat-30-menit' },
    { name: 'Keeping Kids Rooms Tidy', href: '/blog/tips-menjaga-kamar-anak-tetap-rapi' },
    { name: 'Practical Home Organizing Tips', href: '/blog/tips-organizing-rumah-ala-indonesia' },
  ],
};

function LinkColumn({ title, links }: { title: string; links: { name: string; href: string }[] }) {
  return (
    <div className="footer-col">
      <h2>{title}</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}><Link href={l.href}>{l.name}</Link></li>
        ))}
      </ul>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="ruler is-top" aria-hidden />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Image src="/logo.webp" alt="Sesoris" width={280} height={90} />
            <p>
              Sesoris is an independent home organization store founded in Yogyakarta, Indonesia.
              Orders ship to US addresses from our US warehouse.
            </p>
            <div className="footer-news">
              <p>New organizers and guides, by email</p>
              <NewsletterForm source="footer" buttonLabel="Join" />
            </div>
          </div>

          <div className="footer-cols">
            <LinkColumn title="Shop" links={footerLinks.shop} />
            <LinkColumn title="Help" links={footerLinks.help} />
            <div>
              <LinkColumn title="Company" links={footerLinks.company} />
              <div className="footer-contact">
                <div><Mail aria-hidden /> <a href="mailto:admin@sesoris.com">admin@sesoris.com</a></div>
                <div><Phone aria-hidden /> <a href="https://wa.me/6281326102061">+62 813 2610 2061 (WhatsApp)</a></div>
                <div><MapPin aria-hidden /> <span>Yogyakarta, Indonesia</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-links-row">
          <h2>Free tools</h2>
          <div>
            {footerLinks.tools.map((l) => <Link key={l.href} href={l.href}>{l.name}</Link>)}
          </div>
        </div>

        <div className="footer-links-row">
          <h2>Popular articles</h2>
          <div>
            {footerLinks.popularArticles.map((l) => <Link key={l.href} href={l.href}>{l.name}</Link>)}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-social">
            <a href="https://facebook.com/sesoris" target="_blank" rel="noopener noreferrer" aria-label="Sesoris on Facebook (opens in a new tab)"><Facebook /></a>
            <a href="https://instagram.com/sesoris_com" target="_blank" rel="noopener noreferrer" aria-label="Sesoris on Instagram (opens in a new tab)"><Instagram /></a>
            <a href="https://youtube.com/@sesoris" target="_blank" rel="noopener noreferrer" aria-label="Sesoris on YouTube (opens in a new tab)"><Youtube /></a>
          </div>
          <div className="footer-pay" aria-label="Accepted payment methods">
            <span>PayPal</span><span>Visa</span><span>Mastercard</span><span>Amex</span>
          </div>
          <nav aria-label="Legal">
            <span>© {new Date().getFullYear()} Sesoris</span>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
