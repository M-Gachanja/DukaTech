import React, { useState, useEffect } from 'react';
import './HomePage.css'; 
import slide1 from '../assets/img1.png';
import slide2 from '../assets/img2.png';
import slide3 from '../assets/img3.png';
import { Link } from 'react-router-dom';
function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showServices, setShowServices] = useState(false);
  
  // Slideshow images
  const slides = [
    slide1,
    slide2,
    slide3
  ];

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const services = [
    {
      title: "Point of Sale",
      description: "Streamline your retail operations with our advanced POS systems that handle sales, inventory, and customer management.",
      icon: "💳"
    },
    {
      title: "Audit Services",
      description: "Comprehensive audit solutions to ensure compliance, identify risks, and optimize your business processes.",
      icon: "📊"
    },
    {
      title: "ETR Services",
      description: "Electronic Tax Register solutions that simplify tax compliance and reporting for your business.",
      icon: "🧾"
    }
  ];

  return (
    <>
      <nav>
        <ul>
          <li><img src="https://via.placeholder.com/150" alt="Logo" /></li>     
          <h2><b>DukaTech</b></h2>               
          <li><Link to="/">Home</Link></li>
          <li 
            className="services-menu"
            onMouseEnter={() => setShowServices(true)}
            onMouseLeave={() => setShowServices(false)}
          >
            <a href="#services">Services ▾</a>
            {showServices && (
              <ul className="dropdown">
                <li><a href="/pos">Point of Sale</a></li>
                <li><a href="/audit">Audit Services</a></li>
                <li><a href="/etr">ETR Services</a></li>
              </ul>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/login">POS System</Link></li>
        </ul>
      </nav>
      
      <div className="hero">
        <div className="slideshow">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
          <div className="slideshow-overlay"></div>
          <div className="hero-content">
            <h1>Welcome to DukaTech</h1>
            <p>Your one-stop solution for all tech needs.</p>
            <button>Get Started</button>
          </div>
          
          <div className="slideshow-dots">
            {slides.map((_, index) => (
              <span 
                key={index}
                className={`dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
              />
            ))}
          </div>
        </div>
      </div>
      <section className="about-section">
        <div className="about-container">
          <h2>About DukaTech</h2>
          <p>
            DukaTech is a leading technology solutions provider dedicated to helping small businesses and SMEs
            streamline their operations through innovative software solutions. With expertise in 
            Point of Sale systems, Audit Services, and ETR solutions, we empower businesses 
            to achieve operational excellence and drive growth in the digital age.
          </p>
        </div>
      </section>
      <section className="services-section">
        <div className="section-header">
          <h2>Our Services</h2>
          <p>Comprehensive solutions tailored to your business needs</p>
        </div>
        
        <div className="services-grid">
          {services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="learn-more-btn">Learn More</button>
            </div>
          ))}
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2023 DukaTech. All rights reserved.</p>
          <ul className="social-links">
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </div>
        </footer>
    </>
  );
}

export default HomePage;