'use client';

import { Fragment } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { X, ShoppingBag, Trash2, Lock, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuantitySelector } from '@/components/ui/quantity-selector';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/stores/cart-store';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { items, removeItem, updateQuantity, getSubtotal, getShipping, getItemCount } =
    useCartStore();

  const subtotal = getSubtotal();
  const shipping = getShipping();
  const itemCount = getItemCount();

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <TransitionChild
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <DialogPanel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b">
                      <DialogTitle className="text-lg font-semibold text-[#212529] flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5" />
                        Shopping Cart ({itemCount})
                      </DialogTitle>
                      <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-1 overflow-y-auto px-6 py-4">
                      {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center">
                          <ShoppingBag className="w-16 h-16 text-[#E9ECEF] mb-4" />
                          <h3 className="text-lg font-medium text-[#212529] mb-2">
                            Your cart is empty
                          </h3>
                          <p className="text-[#6C757D] mb-6">
                            Looks like you haven't added any items yet.
                          </p>
                          <Button onClick={onClose} asChild>
                            <Link href="/shop">Continue Shopping</Link>
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="flex gap-4 pb-4 border-b last:border-0"
                            >
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                  src={
                                    item.product.images[0]?.url || '/placeholder.jpg'
                                  }
                                  alt={item.product.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-grow min-w-0">
                                <Link
                                  href={`/product/${item.product.slug}`}
                                  onClick={onClose}
                                  className="font-medium text-[#212529] hover:text-[#1B5E3B] line-clamp-2"
                                >
                                  {item.product.name}
                                </Link>
                                {item.variant && (
                                  <p className="text-sm text-[#6C757D] mt-0.5">
                                    {Object.values(item.variant.options).join(' / ')}
                                  </p>
                                )}
                                <p className="text-[#1B5E3B] font-semibold mt-1">
                                  {formatPrice(item.price)}
                                </p>
                                <div className="flex items-center justify-between mt-2">
                                  <QuantitySelector
                                    value={item.quantity}
                                    onChange={(qty) => updateQuantity(item.id, qty)}
                                    size="sm"
                                  />
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="p-1.5 text-[#6C757D] hover:text-[#DC3545] hover:bg-red-50 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                      <div className="border-t px-6 py-4 bg-gray-50">
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6C757D]">Subtotal</span>
                            <span className="font-medium">{formatPrice(subtotal)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#6C757D]">Shipping</span>
                            <span className="font-medium">
                              {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                            </span>
                          </div>
                          {shipping > 0 && (
                            <p className="text-xs text-[#6C757D]">
                              Add {formatPrice(50 - subtotal)} more for free shipping
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Button asChild fullWidth onClick={onClose}>
                            <Link href="/cart">View Cart</Link>
                          </Button>
                          <Button asChild variant="secondary" fullWidth onClick={onClose}>
                            <Link href="/checkout">Checkout</Link>
                          </Button>
                        </div>

                        <div className="flex items-center justify-center gap-4 mt-4 text-xs text-[#6C757D]">
                          <span className="flex items-center gap-1">
                            <Lock className="w-3 h-3" />
                            Secure checkout
                          </span>
                          <span className="flex items-center gap-1">
                            <CreditCard className="w-3 h-3" />
                            Multiple payment options
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
