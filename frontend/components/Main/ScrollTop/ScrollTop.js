import React, { useEffect, useState } from "react";
import "./ScrollTop.less";

const ScrollTop = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollTop, setScrollScrollTop] = useState(false);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
    if (position > 50) {
      setScrollScrollTop(true);
    } else {
      setScrollScrollTop(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setScrollScrollTop(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {scrollTop && (
        <div
          onScroll={handleScroll}
          onClick={handleClick}
          className="scrollTop">
          <span>scroll to top</span>
        </div>
      )}
    </>
  );
};

export default ScrollTop;
