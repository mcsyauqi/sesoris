'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, ThumbsUp, CheckCircle, Camera, X } from 'lucide-react';
import type { Review } from '@/types';

interface ProductReviewSectionProps {
  productId: string;
  productName: string;
  reviews: Review[];
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(i)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '2px' }}
        >
          <Star
            style={{
              width: '28px',
              height: '28px',
              fill: i <= (hovered || value) ? '#FFC107' : '#E9ECEF',
              color: i <= (hovered || value) ? '#FFC107' : '#E9ECEF',
              transition: 'all 0.1s',
            }}
          />
        </button>
      ))}
    </div>
  );
}

function RatingBar({ stars, count, total }: { stars: number; count: number; total: number }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
      <span style={{ width: '16px', textAlign: 'right', color: '#495057' }}>{stars}</span>
      <Star style={{ width: '12px', height: '12px', fill: '#FFC107', color: '#FFC107', flexShrink: 0 }} />
      <div style={{ flex: 1, background: '#E9ECEF', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, background: '#FFC107', height: '100%', borderRadius: '4px', transition: 'width 0.5s' }} />
      </div>
      <span style={{ width: '24px', color: '#5F6873' }}>{count}</span>
    </div>
  );
}

export function ProductReviewSection({ productId, productName, reviews }: ProductReviewSectionProps) {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState({ name: '', email: '', title: '', content: '', rating: 0 });
  const [formError, setFormError] = useState('');

  const totalReviews = reviews.length;
  const avgRating = totalReviews > 0
    ? reviews.reduce((s, r) => s + r.rating, 0) / totalReviews
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((s) => ({
    stars: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.rating === 0) { setFormError('Please select a star rating.'); return; }
    if (!form.name.trim()) { setFormError('Please enter your name.'); return; }
    if (form.content.trim().length < 20) { setFormError('Review must be at least 20 characters.'); return; }
    setFormError('');
    setSubmitted(true);
    setShowForm(false);
  }

  function toggleHelpful(reviewId: string) {
    setHelpfulVotes((prev) => ({ ...prev, [reviewId]: !prev[reviewId] }));
  }

  const ratingLabels: Record<number, string> = { 5: 'Excellent', 4: 'Good', 3: 'Average', 2: 'Poor', 1: 'Terrible' };

  return (
    <div style={{ marginTop: '8px' }}>
      {/* Summary Row */}
      {totalReviews > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: '32px',
          background: '#F8F9FA',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '32px',
          alignItems: 'center',
        }}>
          {/* Big Average */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '56px', fontWeight: 700, color: '#212529', lineHeight: 1 }}>
              {avgRating.toFixed(1)}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '3px', margin: '8px 0 6px' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} style={{
                  width: '16px', height: '16px',
                  fill: i <= Math.round(avgRating) ? '#FFC107' : '#E9ECEF',
                  color: i <= Math.round(avgRating) ? '#FFC107' : '#E9ECEF',
                }} />
              ))}
            </div>
            <div style={{ fontSize: '13px', color: '#5F6873' }}>{totalReviews} reviews</div>
          </div>

          {/* Bars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {ratingCounts.map(({ stars, count }) => (
              <RatingBar key={stars} stars={stars} count={count} total={totalReviews} />
            ))}
          </div>
        </div>
      )}

      {/* Write Review CTA */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#212529', margin: 0 }}>
          {totalReviews > 0 ? `${totalReviews} Customer Reviews` : 'No Reviews Yet'}
        </h3>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: '10px 20px',
              background: '#1B5E3B',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Star style={{ width: '16px', height: '16px' }} />
            Write a Review
          </button>
        )}
      </div>

      {/* Success Message */}
      {submitted && (
        <div style={{
          background: '#E8F5E9',
          border: '1px solid #A5D6A7',
          borderRadius: '12px',
          padding: '16px 20px',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: '#1B5E3B',
        }}>
          <CheckCircle style={{ width: '20px', height: '20px', flexShrink: 0 }} />
          <div>
            <strong>Thank you for your review!</strong>
            <p style={{ margin: '2px 0 0', fontSize: '13px', opacity: 0.8 }}>
              Your review is being verified and will appear shortly.
            </p>
          </div>
        </div>
      )}

      {/* Review Form */}
      {showForm && (
        <div style={{
          background: 'white',
          border: '1px solid #E9ECEF',
          borderRadius: '16px',
          padding: '28px',
          marginBottom: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '17px', fontWeight: 600, color: '#212529', margin: 0 }}>
              Review: {productName}
            </h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#5F6873' }}>
              <X style={{ width: '20px', height: '20px' }} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Rating */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', color: '#212529', fontSize: '14px' }}>
                Overall Rating <span style={{ color: '#DC3545' }}>*</span>
              </label>
              <StarInput value={form.rating} onChange={(v) => setForm((f) => ({ ...f, rating: v }))} />
              {form.rating > 0 && (
                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#1B5E3B', fontWeight: 500 }}>
                  {ratingLabels[form.rating]}
                </p>
              )}
            </div>

            {/* Title */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#212529', fontSize: '14px' }}>
                Review Title
              </label>
              <input
                type="text"
                placeholder="Summarize your experience in one line"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                maxLength={100}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #E9ECEF',
                  borderRadius: '8px',
                  fontSize: '14px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            {/* Content */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#212529', fontSize: '14px' }}>
                Your Review <span style={{ color: '#DC3545' }}>*</span>
              </label>
              <textarea
                placeholder="Share your honest experience, quality, durability, what you liked or disliked..."
                value={form.content}
                onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                rows={4}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: '1px solid #E9ECEF',
                  borderRadius: '8px',
                  fontSize: '14px',
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#5F6873' }}>
                Minimum 20 characters · {form.content.length} / 1000
              </p>
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#212529', fontSize: '14px' }}>
                Add Photo (Optional)
              </label>
              <label style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                border: '1px dashed #CED4DA',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                color: '#5F6873',
              }}>
                <Camera style={{ width: '16px', height: '16px' }} />
                Upload product photo
                <input type="file" accept="image/*" style={{ display: 'none' }} />
              </label>
              <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#5F6873' }}>
                Show your {productName} in use, photo reviews get 3x more helpful votes!
              </p>
            </div>

            {/* Name & Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#212529', fontSize: '14px' }}>
                  Your Name <span style={{ color: '#DC3545' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Full name or first name"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #E9ECEF',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', color: '#212529', fontSize: '14px' }}>
                  Email (private)
                </label>
                <input
                  type="email"
                  placeholder="yourname@email.com"
                  value={form.email}
                  onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    border: '1px solid #E9ECEF',
                    borderRadius: '8px',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            {formError && (
              <p style={{ color: '#DC3545', fontSize: '13px', marginBottom: '12px' }}>{formError}</p>
            )}

            <button
              type="submit"
              style={{
                padding: '12px 28px',
                background: '#1B5E3B',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Submit Review
            </button>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {reviews.map((review) => (
            <div
              key={review.id}
              style={{
                background: 'white',
                border: '1px solid #F0F0F0',
                borderRadius: '12px',
                padding: '20px 24px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
                {/* Avatar */}
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  flexShrink: 0,
                  background: '#E8F5E9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#1B5E3B',
                  position: 'relative',
                }}>
                  {review.avatar ? (
                    <Image src={review.avatar} alt={review.name} fill style={{ objectFit: 'cover' }} />
                  ) : (
                    review.name.charAt(0).toUpperCase()
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 600, color: '#212529', fontSize: '15px' }}>{review.name}</span>
                    {review.verified && (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '12px', color: '#1E7E34' }}>
                        <CheckCircle style={{ width: '12px', height: '12px' }} />
                        Verified Purchase
                      </span>
                    )}
                    {review.location && (
                      <span style={{ fontSize: '12px', color: '#5F6873' }}>· {review.location}</span>
                    )}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <Star key={i} style={{
                          width: '14px', height: '14px',
                          fill: i <= review.rating ? '#FFC107' : '#E9ECEF',
                          color: i <= review.rating ? '#FFC107' : '#E9ECEF',
                        }} />
                      ))}
                    </div>
                    <span style={{ fontSize: '12px', color: '#5F6873' }}>{review.date}</span>
                  </div>
                </div>
              </div>

              {review.title && (
                <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#212529', marginBottom: '6px' }}>
                  {review.title}
                </h4>
              )}
              <p style={{ fontSize: '14px', color: '#495057', lineHeight: 1.7, marginBottom: '12px' }}>
                {review.content}
              </p>

              {/* Photo */}
              {review.photoUrl && (
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '8px', overflow: 'hidden', position: 'relative' }}>
                    <Image src={review.photoUrl} alt="Review photo" fill style={{ objectFit: 'cover' }} />
                  </div>
                </div>
              )}

              {/* Helpful */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: '#5F6873' }}>Helpful?</span>
                <button
                  onClick={() => toggleHelpful(review.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    border: '1px solid',
                    borderColor: helpfulVotes[review.id] ? '#1B5E3B' : '#E9ECEF',
                    borderRadius: '6px',
                    background: helpfulVotes[review.id] ? '#E8F5E9' : 'transparent',
                    color: helpfulVotes[review.id] ? '#1B5E3B' : '#5F6873',
                    cursor: 'pointer',
                    fontSize: '12px',
                    fontWeight: 500,
                    transition: 'all 0.15s',
                  }}
                >
                  <ThumbsUp style={{ width: '12px', height: '12px' }} />
                  Yes ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '48px 24px',
          background: '#F8F9FA',
          borderRadius: '12px',
          color: '#5F6873',
        }}>
          <Star style={{ width: '40px', height: '40px', margin: '0 auto 12px', opacity: 0.3, display: 'block' }} />
          <p style={{ fontSize: '16px', fontWeight: 500, marginBottom: '6px', color: '#495057' }}>
            No reviews yet for this product
          </p>
          <p style={{ fontSize: '14px' }}>Be the first to share your experience!</p>
        </div>
      )}
    </div>
  );
}
