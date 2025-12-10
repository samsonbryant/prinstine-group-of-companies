import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import slide2 from '../assets/Slide-2.jpeg';

function Services() {
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const [activeTab, setActiveTab] = useState('consults');
  const [microfinanceForm, setMicrofinanceForm] = useState({
    name: '', organization: '', email: '', address: '', gender: '', dateOfBirth: '', phone: '', amount: '', purpose: '', document: null
  });
  const [consultsForm, setConsultsForm] = useState({
    name: '', contact: '', email: '', description: '', servicesNeeded: '', address: ''
  });
  const [submitStatus, setSubmitStatus] = useState({ microfinance: null, consults: null });

  const services = {
    consults: {
      title: 'Prinstine Consults',
      description: 'Comprehensive financial consultancy services managed by Certified Public Accountants (CPAs)',
      items: [
        {
          title: 'Taxation Services',
          description: 'Expert tax planning, preparation, and compliance services to optimize your tax obligations.',
          icon: '📋'
        },
        {
          title: 'Business Consulting',
          description: 'Strategic business advice to help your organization grow and succeed.',
          icon: '💼'
        },
        {
          title: 'Financial System Setup',
          description: 'Design and implement robust financial systems tailored to your business needs.',
          icon: '⚙️'
        },
        {
          title: 'Audit and Advisory',
          description: 'Comprehensive audit services and financial advisory to ensure compliance and best practices.',
          icon: '🔍'
        },
        {
          title: 'Investment Consultancy',
          description: 'Expert guidance on investment opportunities and portfolio management.',
          icon: '📈'
        },
        {
          title: 'Fraud Examination',
          description: 'Professional fraud detection and prevention services to protect your assets.',
          icon: '🛡️'
        },
        {
          title: 'ICT Solutions',
          description: 'Information and Communication Technology solutions for modern businesses.',
          icon: '💻'
        }
      ]
    },
    academy: {
      title: 'Prinstine Academy',
      description: 'Technical and Vocational Education and Training (TVET) programs licensed by the Ministry of Education',
      items: [
        {
          title: 'Professional Certification',
          description: 'Industry-recognized certifications to enhance your career prospects.',
          icon: '🎓'
        },
        {
          title: 'Skills Development',
          description: 'Practical training programs to develop essential professional skills.',
          icon: '🔧'
        },
        {
          title: 'Industry-Relevant Training',
          description: 'Training programs aligned with current industry standards and requirements.',
          icon: '📚'
        },
        {
          title: 'Career Advancement',
          description: 'Programs designed to help you advance in your chosen career path.',
          icon: '🚀'
        }
      ]
    },
    microfinance: {
      title: 'Prinstine Microfinance',
      description: 'Accessible microloans for entrepreneurship and financial inclusion',
      items: [
        {
          title: 'Business Loans',
          description: 'Flexible financing options to support your business growth and expansion.',
          icon: '🏢'
        },
        {
          title: 'Personal Loans',
          description: 'Personal loans for various needs with competitive interest rates.',
          icon: '👤'
        },
        {
          title: 'Flexible Repayment Terms',
          description: 'Customized repayment plans that fit your financial situation.',
          icon: '📅'
        },
        {
          title: 'Financial Inclusion Programs',
          description: 'Programs designed to promote financial inclusion and economic empowerment.',
          icon: '🌍'
        }
      ]
    }
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(17,24,39,0.45), rgba(30,58,138,0.4)), url(${slide2})`,
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
              What We Offer
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Comprehensive solutions tailored to your needs
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-12 bg-white dark:bg-gray-800 sticky top-20 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(services).map((key) => (
              <motion.button
                key={key}
                onClick={() => setActiveTab(key)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-8 py-4 rounded-xl font-semibold transition-all ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-xl scale-105'
                    : 'bg-neutral dark:bg-gray-700 text-text dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 shadow-md'
                }`}
              >
                {services[key].title}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Content */}
      <section className="py-24 bg-gradient-to-b from-neutral to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-6xl mx-auto"
            >
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-heading font-bold mb-4 text-text dark:text-white">
                  {services[activeTab].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                  {services[activeTab].description}
                </p>

                {activeTab === 'academy' && (
                  <motion.a
                    href="https://prinstineacademy.org"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-xl font-semibold shadow-xl hover:shadow-2xl transition-all"
                  >
                    Visit prinstineacademy.org →
                  </motion.a>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services[activeTab].items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    {/* Icon container */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="relative z-10 w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-lg"
                    >
                      <span className="text-3xl">{item.icon}</span>
                    </motion.div>
                    
                    <div className="relative z-10">
                      <h3 className="text-xl font-heading font-bold mb-3 text-text dark:text-white group-hover:text-primary dark:group-hover:text-accent transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    
                    {/* Decorative corner */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </motion.div>
                ))}
              </div>

              {/* Microfinance Form */}
              {activeTab === 'microfinance' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-3xl font-heading font-bold mb-6 text-text dark:text-white text-center">
                    Apply for Microfinance Loan
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const mailtoLink = `mailto:info@prinstinegroup.org?subject=Microfinance Loan Application from ${encodeURIComponent(microfinanceForm.name)}&body=Name: ${encodeURIComponent(microfinanceForm.name)}%0D%0AOrganization: ${encodeURIComponent(microfinanceForm.organization)}%0D%0AEmail: ${encodeURIComponent(microfinanceForm.email)}%0D%0AAddress: ${encodeURIComponent(microfinanceForm.address)}%0D%0AGender: ${encodeURIComponent(microfinanceForm.gender)}%0D%0ADate of Birth: ${encodeURIComponent(microfinanceForm.dateOfBirth)}%0D%0APhone: ${encodeURIComponent(microfinanceForm.phone)}%0D%0AAmount: ${encodeURIComponent(microfinanceForm.amount)}%0D%0APurpose: ${encodeURIComponent(microfinanceForm.purpose)}`;
                    window.location.href = mailtoLink;
                    setSubmitStatus({ ...submitStatus, microfinance: 'success' });
                    setMicrofinanceForm({ name: '', organization: '', email: '', address: '', gender: '', dateOfBirth: '', phone: '', amount: '', purpose: '', document: null });
                    setTimeout(() => setSubmitStatus({ ...submitStatus, microfinance: null }), 5000);
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Name *</label>
                        <input type="text" required value={microfinanceForm.name} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Organization *</label>
                        <input type="text" required value={microfinanceForm.organization} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, organization: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Email *</label>
                        <input type="email" required value={microfinanceForm.email} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Phone *</label>
                        <input type="tel" required value={microfinanceForm.phone} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, phone: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Gender *</label>
                        <select required value={microfinanceForm.gender} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, gender: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary">
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Date of Birth *</label>
                        <input type="date" required value={microfinanceForm.dateOfBirth} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, dateOfBirth: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Address *</label>
                      <textarea required value={microfinanceForm.address} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, address: e.target.value })} rows="3" className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Loan Amount (USD) *</label>
                        <input type="number" required value={microfinanceForm.amount} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, amount: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="0.00" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Purpose of Loan *</label>
                        <input type="text" required value={microfinanceForm.purpose} onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, purpose: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Upload Document</label>
                      <input type="file" onChange={(e) => setMicrofinanceForm({ ...microfinanceForm, document: e.target.files[0] })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Accepted formats: PDF, DOC, DOCX, JPG, PNG (Max 5MB)</p>
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all">
                      Submit Application
                    </motion.button>
                    {submitStatus.microfinance === 'success' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 dark:text-green-400 text-center">
                        Application submitted successfully! We'll contact you soon.
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              )}

              {/* Consults Form */}
              {activeTab === 'consults' && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-16 bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
                >
                  <h3 className="text-3xl font-heading font-bold mb-6 text-text dark:text-white text-center">
                    Request Consultation Services
                  </h3>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const mailtoLink = `mailto:info@prinstinegroup.org?subject=Consultation Request from ${encodeURIComponent(consultsForm.name)}&body=Name: ${encodeURIComponent(consultsForm.name)}%0D%0AContact: ${encodeURIComponent(consultsForm.contact)}%0D%0AEmail: ${encodeURIComponent(consultsForm.email)}%0D%0AAddress: ${encodeURIComponent(consultsForm.address)}%0D%0AServices Needed: ${encodeURIComponent(consultsForm.servicesNeeded)}%0D%0ADescription: ${encodeURIComponent(consultsForm.description)}`;
                    window.location.href = mailtoLink;
                    setSubmitStatus({ ...submitStatus, consults: 'success' });
                    setConsultsForm({ name: '', contact: '', email: '', description: '', servicesNeeded: '', address: '' });
                    setTimeout(() => setSubmitStatus({ ...submitStatus, consults: null }), 5000);
                  }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Name *</label>
                        <input type="text" required value={consultsForm.name} onChange={(e) => setConsultsForm({ ...consultsForm, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Contact Number *</label>
                        <input type="tel" required value={consultsForm.contact} onChange={(e) => setConsultsForm({ ...consultsForm, contact: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Email *</label>
                        <input type="email" required value={consultsForm.email} onChange={(e) => setConsultsForm({ ...consultsForm, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Services Needed *</label>
                        <input type="text" required value={consultsForm.servicesNeeded} onChange={(e) => setConsultsForm({ ...consultsForm, servicesNeeded: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="e.g., Tax Planning, Audit Services" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Address *</label>
                      <textarea required value={consultsForm.address} onChange={(e) => setConsultsForm({ ...consultsForm, address: e.target.value })} rows="3" className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none"></textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-text dark:text-white">Description *</label>
                      <textarea required value={consultsForm.description} onChange={(e) => setConsultsForm({ ...consultsForm, description: e.target.value })} rows="5" className="w-full px-4 py-3 rounded-xl bg-neutral dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary resize-none" placeholder="Please describe your consultation needs in detail..."></textarea>
                    </div>
                    <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all">
                      Submit Request
                    </motion.button>
                    {submitStatus.consults === 'success' && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-600 dark:text-green-400 text-center">
                        Request submitted successfully! We'll contact you soon.
                      </motion.p>
                    )}
                  </form>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}

export default Services;

