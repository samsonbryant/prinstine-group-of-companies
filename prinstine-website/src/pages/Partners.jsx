import { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
const partnersHero = 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80';

function Partners() {
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState(null);

  const partners = [
    { name: 'Ministry of Education', logo: '🏛️', description: 'Licensing and accreditation partner' },
    { name: 'QuickBooks', logo: '📊', description: 'Software and training partner' },
    { name: 'EcoBank Liberia', logo: '🏦', description: 'Banking and financial services partner' },
    { name: 'UBA Liberia', logo: '🏦', description: 'Financial services partner' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit as inquiry
      const response = await axios.post(`${API_BASE}/api/inquiries`, {
        name: formData.name,
        email: formData.email,
        message: `Partnership Inquiry from ${formData.company}: ${formData.message}`
      });
      if (response.data.success) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' });
        setTimeout(() => setSubmitStatus(null), 5000);
      }
    } catch (error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(17,24,39,0.82), rgba(30,58,138,0.78)), url(${partnersHero})`,
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
              Collaboration
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            >
              Our Partners
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Building strong partnerships for mutual success
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Partners Grid */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-3xl mx-auto">
              We collaborate with leading organizations for excellence in service delivery 
              and innovation.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -15, scale: 1.05 }}
                className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.2 }}
                  transition={{ duration: 0.6 }}
                  className="relative z-10 text-7xl mb-6"
                >
                  {partner.logo}
                </motion.div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-heading font-bold mb-3 text-text dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
                    {partner.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {partner.description}
                  </p>
                </div>
                
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Become a Partner Form */}
      <section className="py-24 bg-gradient-to-br from-primary via-blue-700 to-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white/10 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20"
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-4">
                Join Us
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Become a Partner
              </h2>
              <p className="text-white/80">
                Interested in partnering with us? Get in touch today!
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Your Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/90 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/90 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Company Name
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-5 py-4 rounded-xl bg-white/90 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg"
                  placeholder="Your Company"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2 text-white">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows="5"
                  className="w-full px-5 py-4 rounded-xl bg-white/90 text-text focus:outline-none focus:ring-2 focus:ring-accent focus:bg-white transition-all shadow-lg resize-none"
                  placeholder="Tell us about your partnership interest..."
                ></textarea>
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-accent to-yellow-500 text-white py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-glow-lg transition-all"
              >
                Submit Partnership Inquiry
              </motion.button>
              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-600 dark:text-green-400 text-center"
                >
                  Thank you! Your partnership inquiry has been submitted.
                </motion.p>
              )}
              {submitStatus === 'error' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-600 dark:text-red-400 text-center"
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

export default Partners;

