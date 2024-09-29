import React, { useCallback, useEffect } from 'react';

interface LazyLoadInfiniteScrollerProps {
  loadMore: () => void;
  hasMore: boolean;
  children: React.ReactNode;
}

//Generic Lazy Load / Infinite Scroller
const LazyLoadInfiniteScroller: React.FC<LazyLoadInfiniteScrollerProps> = ({ loadMore, hasMore, children }) => {
  const scrollCb = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50 && hasMore) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  //Scroll Listener
  useEffect(() => {
    window.addEventListener('scroll', scrollCb);
    return () => {
      window.removeEventListener('scroll', scrollCb);
    };
  }, [scrollCb, hasMore]);
  return <div>{children}</div>;
};

export default LazyLoadInfiniteScroller;