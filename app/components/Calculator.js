"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "../page.module.css";

export default function Calculator() {
  const [area, setArea] = useState("");
  const [propertyType, setPropertyType] = useState("Villa");
  const [serviceType, setServiceType] = useState("Design");
  const [termOfWork, setTermOfWork] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [formData, setFormData] = useState({ name: "" }); // Form data

  const modalRef = useRef(null);

  useEffect(() => {
    if (area && area > 0) {
      // Ensure calculations are only for positive area values
      calculateWorkTerm(area, serviceType);
      calculateDiscount(area, serviceType);
    } else {
      setTermOfWork(0);
      setDiscount(0);
    }
  }, [area, serviceType]);

  const calculateWorkTerm = (area, service) => {
    let days;
    if (service === "Design" && area >= 6) {
      days = Math.ceil(area / 6); // Start showing for Design from 6 sqm
    } else if (service === "Fitout" && area >= 3) {
      days = Math.ceil(area / 3); // Start showing for Fitout from 3 sqm
    } else {
      days = 0; // Hide if area is below threshold
    }
    setTermOfWork(days);
  };

  const calculateDiscount = (area, service) => {
    let baseDiscount, additionalDiscountPerSqm, threshold;

    if (service === "Design") {
      baseDiscount = 1000;
      additionalDiscountPerSqm = 24;
      threshold = 100; // Discount starts at 100 sqm for Design
    } else if (service === "Fitout") {
      baseDiscount = 3580;
      additionalDiscountPerSqm = 89;
      threshold = 40; // Discount starts at 40 sqm for Fitout
    }

    const extraArea = area > threshold ? area - threshold : 0;
    const additionalDiscount = extraArea * additionalDiscountPerSqm;

    // Set discount only if area meets the threshold
    setDiscount(area >= threshold ? baseDiscount + additionalDiscount : 0);
  };

  const handleAreaInputChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    setArea(value >= 0 ? value : "");
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setArea(value);
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const whatsappMessage =
      `Area: ${area} m²\n` +
      `Property Type: ${propertyType}\n` +
      `Type of Service: ${serviceType}\n` +
      `Term of Work: ${termOfWork} days\n` +
      `Discount: AED ${discount}\n` +
      `Name: ${formData.name}`;

    const whatsappLink = `https://wa.me/971588646785?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappLink, "_blank");

    handleModalClose();
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.gridContainer}>
        {/* Specify Area */}
        <div className={styles.leftItem}>
          <label className={styles.label}>Specify area (m²):</label>
          <div className={styles.sliderContainer}>
            <input
              type="number"
              min="0"
              value={area}
              onChange={handleAreaInputChange}
              className={`${styles.input} ${styles.noArrows}`}
              placeholder="Enter area"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={area || 0}
              onChange={handleSliderChange}
              className={styles.rangeSlider}
            />
          </div>
        </div>

        {/* Property Type */}
        <div className={styles.rightItem}>
          <label className={styles.label}>Select property type:</label>
          <div>
            {["Villa", "Apartment", "Townhouse", "Commercial"].map((type) => (
              <label key={type} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="propertyType"
                  value={type}
                  checked={propertyType === type}
                  onChange={() => setPropertyType(type)}
                  className={styles.radio}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        {/* Service Type */}
        <div className={styles.leftItem}>
          <label className={styles.label}>Select type of service:</label>
          <div>
            {["Design", "Fitout"].map((service) => (
              <label key={service} className={styles.radioLabel}>
                <input
                  type="radio"
                  name="serviceType"
                  value={service}
                  checked={serviceType === service}
                  onChange={() => setServiceType(service)}
                  className={styles.radio}
                />
                {service}
              </label>
            ))}
          </div>
        </div>

        {/* Static Info Box */}
        <div className={styles.rightItem}></div>

        {/* Results with Disabled Sliders */}
        <div className={styles.resultBox}>
          <div className={styles.resultItem}>
            <p className={styles.resultParagraph}>
              Term of Work: {termOfWork} days
            </p>
            <input
              type="range"
              min="0"
              max="365"
              value={termOfWork}
              className={styles.resultSlider}
              disabled
            />
          </div>
          <div className={styles.resultItem}>
            <p className={styles.resultParagraph}>Discount: AED {discount}</p>
            <input
              type="range"
              min="0"
              max="50000"
              value={discount}
              className={styles.resultSlider}
              disabled
            />
          </div>
        </div>

        {/* Modal Trigger Button */}
        <button className={styles.calculateButton} onClick={handleModalOpen}>
          Count
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <h2>Request a Quote</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleFormDataChange}
                  required
                />
                <div className={styles.buttonGroup}>
                  <button type="submit" className={styles.calculateButton}>
                    Send to WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className={styles.closeButton}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
