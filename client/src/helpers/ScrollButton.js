import React, { useState } from "react";

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <button
      type="button"
      className="btn btn-danger position-absolute bottom-0 end-0 btn-lg rounded-pill m-3"
      id="btn-back-to-top"
      onClick={scrollToTop}
      style={{ display: visible ? "inline" : "none" }}
    >
      <i className="fas fa-arrow-up"></i>
    </button>
  );
};

export default ScrollButton;
