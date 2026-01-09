'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Leaf, Lock, CreditCard, Check } from 'lucide-react';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { useCartStore } from '@/stores/cart-store';
import { toast } from '@/components/ui/toast';

const shippingMethods = [
  { value: 'standard', label: 'Standard (5-7 days)', price: 0 },
  { value: 'express', label: 'Express (2-3 days)', price: 9.99 },
  { value: 'overnight', label: 'Next Day', price: 19.99 },
];

const countries = [
  { value: 'US', label: 'United States' },
  { value: 'CA', label: 'Canada' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AU', label: 'Australia' },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart, discount } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState('standard');

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    nameOnCard: '',
  });

  const subtotal = getSubtotal();
  const selectedShipping = shippingMethods.find((m) => m.value === shippingMethod);
  const shipping = subtotal >= 50 && shippingMethod === 'standard' ? 0 : (selectedShipping?.price || 0);
  const discountAmount = (subtotal * discount) / 100;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const orderNumber = generateOrderNumber();
    clearCart();

    router.push(`/order/confirmation/${orderNumber}`);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#212529] mb-4">
            Your cart is empty
          </h1>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="w-7 h-7 text-[#1B5E3B]" />
              <span className="text-lg font-bold text-[#1B5E3B]">Sesoris</span>
            </Link>
            <div className="flex items-center gap-2 text-sm text-[#6C757D]">
              <Lock className="w-4 h-4" />
              Secure Checkout
            </div>
          </div>
        </div>
      </header>

      <div className="container py-8">
        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Contact */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#212529] mb-4">
                  Contact Information
                </h2>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  fullWidth
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#212529] mb-4">
                  Shipping Address
                </h2>
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="First Name"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <Input
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street address"
                    required
                    fullWidth
                  />
                  <Input
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                    fullWidth
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="ZIP Code"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                      fullWidth
                    />
                    <Select
                      label="Country"
                      value={formData.country}
                      onChange={(value) =>
                        setFormData({ ...formData, country: value })
                      }
                      options={countries}
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#212529] mb-4">
                  Shipping Method
                </h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.value}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        shippingMethod === method.value
                          ? 'border-[#1B5E3B] bg-[#E8F5E9]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shippingMethod"
                          value={method.value}
                          checked={shippingMethod === method.value}
                          onChange={(e) => setShippingMethod(e.target.value)}
                          className="w-4 h-4 text-[#1B5E3B]"
                        />
                        <span className="font-medium">{method.label}</span>
                      </div>
                      <span className="font-semibold">
                        {method.price === 0 ||
                        (method.value === 'standard' && subtotal >= 50)
                          ? 'FREE'
                          : formatPrice(method.price)}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-xl p-6">
                <h2 className="text-lg font-semibold text-[#212529] mb-4">
                  Payment
                </h2>
                <div className="grid gap-4">
                  <Input
                    label="Card Number"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    required
                    fullWidth
                    rightIcon={<CreditCard className="w-5 h-5" />}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      name="expiry"
                      value={formData.expiry}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      required
                      fullWidth
                    />
                    <Input
                      label="CVV"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      required
                      fullWidth
                    />
                  </div>
                  <Input
                    label="Name on Card"
                    name="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl p-6 sticky top-4">
                <h2 className="text-lg font-semibold text-[#212529] mb-4">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <Image
                          src={item.product.images[0]?.url || '/placeholder.jpg'}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#1B5E3B] text-white text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-medium text-sm text-[#212529] line-clamp-1">
                          {item.product.name}
                        </p>
                        {item.variant && (
                          <p className="text-xs text-[#6C757D]">
                            {Object.values(item.variant.options).join(' / ')}
                          </p>
                        )}
                      </div>
                      <p className="font-medium text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                {/* Totals */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-[#1B5E3B]">
                      <span>Discount ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6C757D]">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-lg font-semibold mb-6">
                  <span>Total</span>
                  <span className="text-[#1B5E3B]">{formatPrice(total)}</span>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  fullWidth
                  isLoading={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay ${formatPrice(total)}`}
                </Button>

                <p className="text-xs text-center text-[#6C757D] mt-4">
                  By placing your order, you agree to our{' '}
                  <Link href="/terms" className="underline">
                    Terms
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="underline">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
