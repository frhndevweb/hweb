import { useState, useEffect } from 'react';
import { subscribeToData } from '@/lib/firebase';
import type { Service, Portfolio, Testimonial, FAQ } from '@shared/schema';

export function useFirebaseData<T>(path: string) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = subscribeToData(path, (items: T[]) => {
      setData(items);
      setLoading(false);
    });

    return unsubscribe;
  }, [path]);

  return { data, loading };
}

export const useServices = () => useFirebaseData<Service>('services');
export const usePortfolio = () => useFirebaseData<Portfolio>('portfolio');
export const useTestimonials = () => useFirebaseData<Testimonial>('testimonials');
export const useFAQs = () => useFirebaseData<FAQ>('faqs');
