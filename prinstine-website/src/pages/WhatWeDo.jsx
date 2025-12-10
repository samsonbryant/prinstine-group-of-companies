import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import $ from 'jquery';
const whatHero = 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80';

function WhatWeDo() {
  const [counters, setCounters] = useState({ years: 0, clients: 0, projects: 0 });

  useEffect(() => {
    // Animate counters
    const animateCounter = (target, setter, duration = 2000) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setter(Math.floor(target));
          clearInterval(timer);
        } else {
          setter(Math.floor(start));
        }
      }, 16);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(2, (val) => setCounters(prev => ({ ...prev, years: val })));
          animateCounter(500, (val) => setCounters(prev => ({ ...prev, clients: val })));
          animateCounter(100, (val) => setCounters(prev => ({ ...prev, projects: val })));
        }
      });
    });

    const element = document.getElementById('counters');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const integratedServices = [
    {
      title: 'Consulting for Financial Compliance',
      description: 'Expert guidance to ensure your business meets all financial regulations and compliance requirements.',
      icon: '📊'
    },
    {
      title: 'Training for Skills',
      description: 'Comprehensive training programs to develop essential skills for career advancement.',
      icon: '🎓'
    },
    {
      title: 'Financing for Growth',
      description: 'Accessible financing solutions to support your business growth and expansion.',
      icon: '💰'
    }
  ];

  const testimonials = [
    {
      quote: 'PGC Service is Top-Notch, convenient and affordable. We are benefiting from their consultancy service.',
      author: 'Platinum Entertainment Inc and Platinum Hotel',
      position: 'Client'
    },
    {
      quote: 'Our full Business set-up was done by PGC. Today we have full structure and financial system.',
      author: 'ZTE',
      position: 'Client'
    },
    {
      quote: 'I can advise anyone at anytime to subscribe to PGC services. Our Taxes are paid on time and in full compliance because of PGC.',
      author: 'RES-Q',
      position: 'Client'
    }
  ];

  const coreValues = [
    { title: 'Integrity', icon: '🛡️' },
    { title: 'Excellence', icon: '⭐' },
    { title: 'Innovation', icon: '💡' },
    { title: 'Empowerment', icon: '🚀' },
    { title: 'Trust', icon: '🤝' },
    { title: 'Growth', icon: '📈' },
    { title: 'Service', icon: '❤️' }
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(17,24,39,0.45), rgba(30,58,138,0.4)), url(${whatHero})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 animated-gradient opacity-35 mix-blend-screen"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6"
            >
              Our Approach
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            >
              What We Do?
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Integrated solutions for comprehensive business success
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Integrated Services */}
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
              Integrated Solutions
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-text dark:text-white">
              Our Integrated Services
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Three powerful approaches working together for your success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integratedServices.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ y: -15, scale: 1.02 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                >
                  <span className="text-4xl">{service.icon}</span>
                </motion.div>
                
                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold mb-4 text-text dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section id="counters" className="py-24 bg-gradient-to-br from-primary via-blue-700 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { value: counters.years, label: 'Years in Business', suffix: '+' },
              { value: counters.clients, label: 'Satisfied Clients', suffix: '+' },
              { value: counters.projects, label: 'Completed Projects', suffix: '+' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white/10 backdrop-blur-xl p-10 rounded-3xl border border-white/20 text-center shadow-2xl"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, type: "spring", stiffness: 200 }}
                  className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-accent to-yellow-300 bg-clip-text text-transparent"
                >
                  {stat.value}{stat.suffix}
                </motion.div>
                <div className="text-xl md:text-2xl font-semibold">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-neutral dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-text dark:text-white">
            Our Service Offerings
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Taxation Services',
              'Business Consulting',
              'Financial System Setup',
              'Audit and Advisory',
              'Investment Consultancy',
              'Fraud Examination',
              'ICT Solutions',
              'Professional Training',
              'Microfinance Services',
              'Skills Development'
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md flex items-center gap-3"
              >
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-text dark:text-white">{service}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-text dark:text-white">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral dark:bg-gray-700 p-6 rounded-xl shadow-lg"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4 italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-text dark:text-white">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.position}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12">
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 max-w-6xl mx-auto">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="bg-white bg-opacity-20 p-6 rounded-xl text-center backdrop-blur-sm"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-heading font-bold">{value.title}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default WhatWeDo;

