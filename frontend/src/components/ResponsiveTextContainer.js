import React, { useRef, useEffect } from "react";

function ResponsiveTextContainer({ text, bgColor }) {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const text = container.querySelector(".container-text");

    const resizeText = () => {
      const containerWidth = container.offsetWidth;
      const textWidth = text.scrollWidth;

      if (textWidth > containerWidth) {
        const newFontSize = (containerWidth / textWidth) * 16; // 16 is the base font size

        text.style.fontSize = newFontSize + "px";
      } else {
        text.style.fontSize = "16px"; // Reset to the base font size
      }
    };

    window.addEventListener("resize", resizeText);
    resizeText();

    return () => {
      window.removeEventListener("resize", resizeText);
    };
  }, []);

  return (
    <div
      className="responsive-container"
      ref={containerRef}
      style={{ backgroundColor: bgColor }}
    >
      <span className="container-text">{text}</span>
    </div>
  );
}

export default ResponsiveTextContainer;
