'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Package, Check, Truck, Home, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const trackingSteps = [
  { id: 'confirmed', label: 'Confirmed', icon: Check },
  { id: 'shipped', label: 'Shipped', icon: Package },
  { id: 'transit', label: 'In Transit', icon: Truck },
  { id: 'delivered', label: 'Delivered', icon: Home },
];

const mockTrackingHistory = [
  {
    date: 'Jan 18, 2024',
    time: '10:30 AM',
    location: 'New York, NY',
    status: 'Package arrived at local facility',
  },
  {
    date: 'Jan 17, 2024',
    time: '3:45 PM',
    location: 'Chicago, IL',
    status: 'Package in transit',
  },
  {
    date: 'Jan 16, 2024',
    time: '9:00 AM',
    location: 'Warehouse',
    status: 'Package shipped',
  },
  {
    date: 'Jan 15, 2024',
    time: '2:30 PM',
    location: '',
    status: 'Order confirmed',
  },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrder = searchParams.get('order') || '';

  const [orderNumber, setOrderNumber] = useState(initialOrder);
  const [email, setEmail] = useState('');
  const [isTracking, setIsTracking] = useState(false);
  const [trackingResult, setTrackingResult] = useState<boolean | null>(
    initialOrder ? true : null
  );
  const [currentStep] = useState(2); // In Transit

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber || !email) return;

    setIsTracking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setTrackingResult(true);
    setIsTracking(false);
  };

  return (
    <>
      {/* Header */}
      <section className="py-12 text-center">
        <div className="container">
          <h1 className="text-4xl font-bold text-[#212529] mb-4">
            Track Your Order
          </h1>
          <p className="text-lg text-[#6C757D] max-w-md mx-auto">
            Enter your order number and email to track your shipment.
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            {/* Search Form */}
            <div className="bg-[#F8F9FA] rounded-2xl p-8 mb-8">
              <form onSubmit={handleTrack} className="space-y-4">
                <Input
                  label="Order Number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="e.g., SES-2024-001234"
                  required
                  fullWidth
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email used for order"
                  required
                  fullWidth
                />
                <Button type="submit" isLoading={isTracking} size="lg" fullWidth>
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </Button>
              </form>
            </div>

            {/* Tracking Result */}
            {trackingResult && (
              <div className="bg-white border rounded-2xl p-8 animate-fade-in">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#212529]">
                      Order #{orderNumber || 'SES-2024-001234'}
                    </h2>
                    <p className="text-sm text-[#6C757D]">
                      Estimated delivery: January 20, 2024
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-[#FFC107]/20 text-[#856404] text-sm font-medium rounded-full">
                    In Transit
                  </span>
                </div>

                {/* Progress Steps */}
                <div className="relative mb-8">
                  <div className="flex justify-between">
                    {trackingSteps.map((step, index) => (
                      <div
                        key={step.id}
                        className="flex flex-col items-center relative z-10"
                      >
                        <div
                          className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center mb-2',
                            index <= currentStep
                              ? 'bg-[#1B5E3B] text-white'
                              : 'bg-gray-200 text-[#6C757D]'
                          )}
                        >
                          <step.icon className="w-5 h-5" />
                        </div>
                        <span
                          className={cn(
                            'text-xs font-medium text-center',
                            index <= currentStep
                              ? 'text-[#1B5E3B]'
                              : 'text-[#6C757D]'
                          )}
                        >
                          {step.label}
                        </span>
                      </div>
                    ))}
                  </div>
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
                    <div
                      className="h-full bg-[#1B5E3B] transition-all"
                      style={{
                        width: `${(currentStep / (trackingSteps.length - 1)) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Shipping Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="font-medium text-[#212529] mb-2">Carrier</h3>
                    <p className="text-[#6C757D]">FedEx Ground</p>
                    <p className="text-sm text-[#1B5E3B]">
                      Tracking #: 1234567890
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-[#212529] mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-[#6C757D]">
                      John Doe<br />
                      123 Main Street<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>

                {/* Tracking History */}
                <div>
                  <h3 className="font-semibold text-[#212529] mb-4">
                    Tracking History
                  </h3>
                  <div className="space-y-4">
                    {mockTrackingHistory.map((event, index) => (
                      <div
                        key={index}
                        className="flex gap-4 pb-4 border-b last:border-0"
                      >
                        <div className="text-sm text-[#6C757D] w-28 flex-shrink-0">
                          <p>{event.date}</p>
                          <p>{event.time}</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#212529]">
                            {event.status}
                          </p>
                          {event.location && (
                            <p className="text-sm text-[#6C757D]">
                              {event.location}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function TrackOrderLoading() {
  return (
    <section className="py-12 text-center">
      <div className="container">
        <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
        <div className="h-6 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
      </div>
    </section>
  );
}

export default function TrackOrderPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F8F9FA] py-4">
        <div className="container">
          <Breadcrumb items={[{ label: 'Track Order' }]} />
        </div>
      </div>

      <Suspense fallback={<TrackOrderLoading />}>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
