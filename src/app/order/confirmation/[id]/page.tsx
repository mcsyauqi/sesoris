import Link from 'next/link';
import { CheckCircle, Package, Mail, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ConfirmationPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderConfirmationPage({
  params,
}: ConfirmationPageProps) {
  const { id: orderNumber } = await params;

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-16">
      <div className="container">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-2xl p-8 text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-[#E8F5E9] rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-[#28A745]" />
            </div>
            <h1 className="text-3xl font-bold text-[#212529] mb-2">
              Order Confirmed!
            </h1>
            <p className="text-[#6C757D] mb-4">
              Thank you for your purchase
            </p>
            <p className="text-lg font-medium text-[#1B5E3B]">
              Order #{orderNumber}
            </p>
          </div>

          {/* Order Info */}
          <div className="bg-white rounded-2xl p-8 mb-8">
            <h2 className="text-lg font-semibold text-[#212529] mb-6">
              What's Next?
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="p-3 bg-[#E8F5E9] rounded-lg h-fit">
                  <Mail className="w-6 h-6 text-[#1B5E3B]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#212529] mb-1">
                    Confirmation Email
                  </h3>
                  <p className="text-sm text-[#6C757D]">
                    We've sent a confirmation email with your order details and receipt.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-[#E8F5E9] rounded-lg h-fit">
                  <Package className="w-6 h-6 text-[#1B5E3B]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#212529] mb-1">
                    Order Processing
                  </h3>
                  <p className="text-sm text-[#6C757D]">
                    Your order is being processed and will be shipped within 1-2 business days.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="p-3 bg-[#E8F5E9] rounded-lg h-fit">
                  <Truck className="w-6 h-6 text-[#1B5E3B]" />
                </div>
                <div>
                  <h3 className="font-medium text-[#212529] mb-1">
                    Shipping Updates
                  </h3>
                  <p className="text-sm text-[#6C757D]">
                    You'll receive tracking information once your order ships.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="flex-1">
              <Link href={`/track-order?order=${orderNumber}`}>Track Order</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href="/shop">Continue Shopping</Link>
            </Button>
          </div>

          {/* Help */}
          <p className="text-center text-sm text-[#6C757D] mt-8">
            Need help?{' '}
            <Link href="/contact" className="text-[#1B5E3B] hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
