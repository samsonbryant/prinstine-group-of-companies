import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import heroBg from '../assets/background-image-homepage-below-header.jpeg';
import ceoPhoto from '../assets/CEO-profile image.jpeg';
import officeImage from '../assets/office-address-image.jpeg';

function Home() {
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const subsidiaries = [
    {
      name: 'Prinstine Consults',
      description: 'Managed by Certified Public Accountants (CPAs) providing expert financial consultancy services.',
      icon: '📊'
    },
    {
      name: 'Prinstine Academy',
      description: 'TVET programs licensed by the Ministry of Education, offering professional training and certification.',
      icon: '🎓'
    },
    {
      name: 'Prinstine Microfinance',
      description: 'Providing microloans for businesses and individuals to support entrepreneurship and financial inclusion.',
      icon: '💰'
    }
  ];

  const coreValues = [
    { title: 'Integrity', icon: '🛡️', description: 'Honest and ethical in all our dealings' },
    { title: 'Excellence', icon: '⭐', description: 'Striving for the highest quality standards' },
    { title: 'Innovation', icon: '💡', description: 'Embracing new ideas and technologies' },
    { title: 'Empowerment', icon: '🚀', description: 'Enabling growth and success' },
    { title: 'Trust', icon: '🤝', description: 'Building lasting relationships' },
    { title: 'Growth', icon: '📈', description: 'Continuous improvement and development' },
    { title: 'Service', icon: '❤️', description: 'Dedicated to client satisfaction' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    // If no API base URL, use mailto fallback
    if (!API_BASE) {
      const mailtoLink = `mailto:info@prinstinegroup.org?subject=Contact Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
      return;
    }
    
    try {
      const response = await axios.post(`${API_BASE}/api/inquiries`, formData);
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      // Fallback to mailto if API fails
      const mailtoLink = `mailto:info@prinstinegroup.org?subject=Contact Inquiry from ${encodeURIComponent(formData.name)}&body=${encodeURIComponent(formData.message)}%0D%0A%0D%0AFrom: ${encodeURIComponent(formData.email)}`;
      window.location.href = mailtoLink;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const scrollToAbout = () => {
    $('html, body').animate({
      scrollTop: $('#about-section').offset().top - 80
    }, 800);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background image with brand overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(17, 24, 39, 0.75), rgba(30, 58, 138, 0.7)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        {/* Animated gradient accent */}
        <div className="absolute inset-0 animated-gradient opacity-40 mix-blend-screen"></div>
        {/* Overlay pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
          backgroundSize: '60px 60px',
          opacity: 0.15
        }}></div>
        
        {/* Floating shapes */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-block mb-6 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full border border-white/30"
          >
            <span className="text-white/90 text-sm font-semibold">Welcome to Excellence</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold mb-6 text-white leading-tight"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent">
              Prinstine Group
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl lg:text-3xl mb-10 text-white/90 max-w-3xl mx-auto font-light"
          >
            Driving Growth, Empowerment, and Productivity
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToAbout}
              className="px-10 py-4 bg-gradient-to-r from-accent to-yellow-500 text-white rounded-xl font-semibold text-lg shadow-2xl hover:shadow-glow-lg transition-all"
            >
              Learn More
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-white/10 backdrop-blur-md text-white rounded-xl font-semibold text-lg border-2 border-white/30 hover:bg-white/20 transition-all"
            >
              Our Services
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Subsidiaries Section */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              Our Companies
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-text dark:text-white">
              Our Subsidiaries
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three powerful companies working together to drive growth and empowerment
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subsidiaries.map((sub, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                >
                  <span className="text-4xl">{sub.icon}</span>
                </motion.div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-text dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {sub.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{sub.description}</p>
                  
                  {/* Learn more link */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <span className="text-primary dark:text-accent font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                      Learn More
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CEO Spotlight */}
      <section className="py-24 bg-gradient-to-br from-primary via-blue-700 to-secondary text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4">
                Leadership
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Meet Our CEO
              </h2>
            </div>
            
            <div className="bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
              <div className="flex flex-col md:flex-row items-center gap-10">
                <motion.div
                  whileHover={{ scale: 1.03, rotate: 1 }}
                  className="relative"
                >
                  <div className="w-56 h-56 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/40 bg-white">
                    <img
                      src={ceoPhoto}
                      alt="Mr. Prince S. Cooper, CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-4 w-24 h-24 bg-secondary rounded-full blur-2xl opacity-50"></div>
                </motion.div>
                
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-heading font-bold mb-2">
                    Mr. Prince S. Cooper
                  </h3>
                  <h4 className="text-xl md:text-2xl font-semibold mb-6 text-accent">
                    Chief Executive Officer
                  </h4>
                  <p className="text-lg text-white/90 mb-6 leading-relaxed">
                    Mr. Prince S. Cooper is a distinguished professional with extensive 
                    qualifications and experience in financial management, business consulting, 
                    and education. His visionary leadership drives Prinstine Group's commitment 
                    to excellence.
                  </p>
                  
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                    <h5 className="font-semibold mb-4 text-lg">Qualifications:</h5>
                    <ul className="space-y-3">
                      {['B.Sc. in Accounting', 'MBA in Business Administration', 'MA in Education', 'PGDE (Post Graduate Diploma in Education)', 'Dip-Re (Diploma in Religious Education)'].map((qual, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-3 text-white/90"
                        >
                          <div className="w-2 h-2 bg-accent rounded-full"></div>
                          {qual}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section id="about-section" className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
              What We Stand For
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-text dark:text-white">
              Our Core Values
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.05, rotate: 2 }}
                className="group relative bg-gradient-to-br from-white to-neutral dark:from-gray-700 dark:to-gray-800 p-6 rounded-2xl text-center shadow-lg hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-600 overflow-hidden"
              >
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 text-5xl mb-4"
                >
                  {value.icon}
                </motion.div>
                
                <div className="relative z-10">
                  <h3 className="font-heading font-bold mb-2 text-text dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-xs md:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                    {value.description}
                  </p>
                </div>
                
                {/* Decorative corner */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-24 bg-gradient-to-br from-primary via-blue-700 to-secondary text-white overflow-hidden">
        {/* Background image with blur and brand overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(140deg, rgba(17, 24, 39, 0.8), rgba(30, 58, 138, 0.75)), url(${officeImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        {/* Animated brand glows */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ scale: [1.1, 0.95, 1.1], opacity: [0.25, 0.45, 0.25] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4">
                Contact Us
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4">
                Get In Touch
              </h2>
              <p className="text-white/80 text-lg">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-xl p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl text-text bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Your Email</label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl text-text bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Your Message</label>
                <textarea
                  placeholder="Tell us how we can help..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows="5"
                  className="w-full px-5 py-4 rounded-xl text-text bg-white/90 focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg resize-none"
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent to-yellow-500 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-glow-lg transition-all"
              >
                Submit Inquiry
              </motion.button>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-300 text-center"
                >
                  Thank you! Your inquiry has been submitted successfully.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-300 text-center"
                >
                  Error submitting inquiry. Please try again.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Home;

