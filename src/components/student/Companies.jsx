import React from "react";
import { assets } from "../../assets/assets";

const Companies = () => {
  // Only these specific logos will scroll
  const selectedLogos = [
    assets.microsoft_logo,
    assets.walmart_logo,
    assets.accenture_logo,
    assets.paypal_logo,
    assets.adobe_logo,
  ];

  return (
    <div className="bg-black text-center w-full py-6 overflow-hidden">
      <p className="text-3xl text-white font-bold mb-10">Our Esteemed Partners</p>
      
      <div className="logos-container">
        <div className="logos-slider">
          {selectedLogos.map((logo, index) => (
            <img key={index} src={logo} alt={`Company-${index}`} className="logo" />
          ))}
          {/* Duplicate set for infinite seamless effect */}
          {selectedLogos.map((logo, index) => (
            <img key={`dup-${index}`} src={logo} alt={`Company-Dup-${index}`} className="logo" />
          ))}
        </div>
      </div>

      {/* CSS for Seamless Right-to-Left Scrolling */}
      <style>
        {`
          @keyframes slideLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }

          .logos-container {
            display: flex;
            overflow: hidden;
            white-space: nowrap;
            width: 100%;
          }

          .logos-slider {
            display: flex;
            width: max-content;
            animation: slideLeft 8s linear infinite; /* Adjust speed here */
          }

          .logo {
            width: 120px; /* Adjust logo size */
            margin: 0 25px;
            flex-shrink: 0; /* Prevents resizing */
          }
        `}
      </style>
    </div>
  );
};

export default Companies;
