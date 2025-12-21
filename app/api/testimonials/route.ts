import { NextResponse } from 'next/server';
import type { TestimonialBM1 } from '@shared/schema';

// Fallback testimonials data (matching TestimonialSlider fallbacks)
const testimonials: TestimonialBM1[] = [
  {
    id: '1',
    name: 'Aisha Patel',
    role: 'Parent, Mumbai',
    content: 'My daughter went from curious to creator in just weeks. BlackMonkey didn\'t teach her STEM—it unleashed her imagination.',
    order: 1,
  },
  {
    id: '2',
    name: 'Dr. James Chen',
    role: 'Educator, Singapore',
    content: 'This isn\'t education. It\'s transformation. I\'ve never seen students so engaged, so excited to build and experiment.',
    order: 2,
  },
  {
    id: '3',
    name: 'Priya Sharma',
    role: 'Student, Age 14',
    content: 'I built a drone that actually flies. I coded a smart home system. BlackMonkey made me feel like an innovator, not just a student.',
    order: 3,
  },
];

export async function GET() {
  try {
    // TODO: In the future, fetch from database if needed
    // For now, return the static testimonials
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}


