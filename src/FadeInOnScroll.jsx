import React, { useRef, useEffect, useState } from 'react';

const FadeInOnScroll = ({ children }) => {
  const domRef = useRef();
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      // Check if the element is intersecting (on screen)
      if (entries[0].isIntersecting) {
        setVisible(true);
      } else {
        // If it's no longer intersecting, you might want to fade out
        // or reset the state for future re-entry.
        // For a simple fade-out when off-screen, you could set setVisible(false) here.
        // However, this would remove the 'is-visible' class immediately,
        // potentially cutting off the fade-out animation if the element
        // is quickly scrolled off-screen.
        setVisible(false); // This will trigger fade-out
      }
    }, {
      threshold: 0.7 // Trigger when 70% of the element is visible
    });

    // Observe the DOM element
    if (domRef.current) {
      observer.observe(domRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []); // Empty dependency array ensures effect runs only once on mount

  return (
    <div
      ref={domRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};

export default FadeInOnScroll;