import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const scrollPositions = useRef({});

  useEffect(() => {
    // Save scroll position before leaving the page
    return () => {
      scrollPositions.current[pathname] = window.scrollY;
    };
  }, [pathname]);

  useEffect(() => {
    // Restore scroll position when returning to the page
    const savedPosition = scrollPositions.current[pathname] || 0;
    window.scrollTo(0, savedPosition);
  }, [pathname]);

  return null;
}