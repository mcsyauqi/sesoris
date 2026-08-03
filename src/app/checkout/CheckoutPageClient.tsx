'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Home, ChevronRight, Lock, CreditCard, Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import { getProductImageAlt } from '@/lib/product-image-alt';
import { createMockTransactionId, trackBeginCheckout, trackPurchase } from '@/lib/analytics';

export default function CheckoutPageClient() {
  const { items, getSubtotal, getItemCount, clearCart } = useCartStore();
  const [step, setStep] = useState(1);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);
  const beginCheckoutFired = useRef(false);

  const subtotal = getSubtotal();
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // GA4 begin_checkout: once per checkout page visit that starts with a cart.
  useEffect(() => {
    if (beginCheckoutFired.current) return;
    if (items.length === 0) return;
    beginCheckoutFired.current = true;
    trackBeginCheckout(items);
  }, [items]);

  // Mock order confirmation. There is no payment processor or order backend yet,
  // so this is the mock success point where GA4 purchase fires.
  const handlePlaceOrder = () => {
    if (items.length === 0) return;
    const transactionId = createMockTransactionId();
    trackPurchase({ transactionId, cartItems: items, shipping, tax });
    setPlacedOrderId(transactionId);
    clearCart();
  };

  if (placedOrderId) {
    return (
      <>
        <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
                <Home style={{ width: '14px', height: '14px' }} />
              </Link>
              <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
              <span style={{ color: '#212529', fontWeight: 500 }}>Order Confirmed</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <CheckCircle style={{ width: '56px', height: '56px', color: '#1B5E3B', marginBottom: '16px' }} />
          <h1 style={{ fontSize: '26px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
            Thank you for your order
          </h1>
          <p style={{ color: '#5F6873', marginBottom: '8px' }}>
            Order reference: <strong style={{ color: '#212529' }}>{placedOrderId}</strong>
          </p>
          <p style={{ color: '#5F6873', marginBottom: '24px' }}>
            A confirmation email with tracking details will follow shortly.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  if (items.length === 0) {
    return (
      <>
        <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
              <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
                <Home style={{ width: '14px', height: '14px' }} />
              </Link>
              <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
              <span style={{ color: '#212529', fontWeight: 500 }}>Checkout</span>
            </div>
          </div>
        </div>

        <div className="container" style={{ padding: '80px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#212529', marginBottom: '12px' }}>
            Your cart is empty
          </h1>
          <p style={{ color: '#5F6873', marginBottom: '24px' }}>
            Add items to your cart before checking out.
          </p>
          <Link href="/shop" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <div style={{ background: '#F8F9FA', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" aria-label="Home" style={{ display: 'flex', alignItems: 'center', color: '#5F6873' }}>
              <Home style={{ width: '14px', height: '14px' }} />
            </Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <Link href="/cart" style={{ color: '#5F6873' }}>Cart</Link>
            <ChevronRight style={{ width: '14px', height: '14px', color: '#5F6873' }} />
            <span style={{ color: '#212529', fontWeight: 500 }}>Checkout</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '48px 16px 80px' }}>
        {/* Progress Steps */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', marginBottom: '48px' }}>
          {['Shipping', 'Payment', 'Review'].map((label, i) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: step > i ? '#1B5E3B' : step === i + 1 ? '#1B5E3B' : '#E9ECEF',
                color: step >= i + 1 ? 'white' : '#5F6873',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '14px',
              }}>
                {i + 1}
              </div>
              <span style={{ fontWeight: step === i + 1 ? 600 : 400, color: step === i + 1 ? '#212529' : '#5F6873' }}>
                {label}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px' }}>
          {/* Form */}
          <div>
            {step === 1 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
                  Shipping Information
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>First Name</label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Last Name</label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Email</label>
                  <input type="email" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Address</label>
                  <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>City</label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>State</label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>ZIP Code</label>
                    <input type="text" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn btn-primary" style={{ width: '100%' }}>
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
                  Payment Method
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {['Credit Card', 'PayPal', 'Apple Pay'].map((method) => (
                    <label
                      key={method}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px',
                        border: '1px solid #E9ECEF',
                        borderRadius: '10px',
                        cursor: 'pointer',
                      }}
                    >
                      <input type="radio" name="payment" defaultChecked={method === 'Credit Card'} />
                      <span style={{ fontWeight: 500 }}>{method}</span>
                    </label>
                  ))}
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input type="text" placeholder="1234 5678 9012 3456" style={{ width: '100%', padding: '12px 16px', paddingRight: '48px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                    <CreditCard style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '20px', height: '20px', color: '#5F6873' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 500, marginBottom: '8px' }}>CVV</label>
                    <input type="text" placeholder="123" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #E9ECEF', fontSize: '15px' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: '14px', border: '1px solid #E9ECEF', borderRadius: '10px', background: 'white', cursor: 'pointer', fontWeight: 500 }}>
                    Back
                  </button>
                  <button onClick={() => setStep(3)} className="btn btn-primary" style={{ flex: 2 }}>
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#212529', marginBottom: '24px' }}>
                  Review Your Order
                </h2>
                <div style={{ background: '#F8F9FA', borderRadius: '12px', padding: '20px', marginBottom: '24px' }}>
                  <div style={{ marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #E9ECEF' }}>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>Shipping Address</div>
                    <div style={{ color: '#5F6873', fontSize: '14px', lineHeight: 1.5 }}>
                      John Doe<br />
                      123 Main Street<br />
                      New York, NY 10001
                    </div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '8px' }}>Payment Method</div>
                    <div style={{ color: '#5F6873', fontSize: '14px' }}>
                      Credit Card ending in 3456
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: '14px', border: '1px solid #E9ECEF', borderRadius: '10px', background: 'white', cursor: 'pointer', fontWeight: 500 }}>
                    Back
                  </button>
                  <button onClick={handlePlaceOrder} className="btn btn-primary" style={{ flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <Lock style={{ width: '16px', height: '16px' }} />
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div>
            <div style={{ background: '#F8F9FA', borderRadius: '16px', padding: '24px', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '20px' }}>Order Summary ({getItemCount()} items)</h3>

              <div style={{ maxHeight: '240px', overflowY: 'auto', marginBottom: '20px' }}>
                {items.map((item) => (
                  <div key={item.product.id} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', position: 'relative', background: 'white' }}>
                      <Image src={item.product.images[0]?.url || '/placeholder.jpg'} alt={getProductImageAlt(item.product)} fill style={{ objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 500, marginBottom: '4px' }}>{item.product.name}</div>
                      <div style={{ fontSize: '13px', color: '#5F6873' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 500 }}>{formatPrice(item.product.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid #E9ECEF', paddingTop: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#5F6873' }}>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#5F6873' }}>Shipping</span>
                  <span style={{ color: shipping === 0 ? '#1E7E34' : '#212529' }}>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: '#5F6873' }}>Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #E9ECEF' }}>
                  <span style={{ fontWeight: 600 }}>Total</span>
                  <span style={{ fontSize: '20px', fontWeight: 700, color: '#1B5E3B' }}>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #E9ECEF' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#5F6873', marginBottom: '8px' }}>
                  <ShieldCheck style={{ width: '16px', height: '16px', color: '#1B5E3B' }} />
                  Secure checkout
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#5F6873' }}>
                  <Truck style={{ width: '16px', height: '16px', color: '#1B5E3B' }} />
                  Free shipping on orders over $50
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
