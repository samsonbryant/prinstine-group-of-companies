import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import $ from 'jquery';
import ceoPhoto from '../assets/CEO-profile image.jpeg';
import teamPhoto from '../assets/Prinstine-manageral-team.jpeg';
import officePhoto from '../assets/office-address-image.jpeg';
import jamesPhoto from '../assets/james-pgc.jpeg';
import jamesettaPhoto from '../assets/jamesetta-pgc.jpeg';

function About() {
  const timelineRef = useRef(null);

  useEffect(() => {
    // jQuery timeline animation
    if (timelineRef.current) {
      $(timelineRef.current).find('.timeline-item').each(function(index) {
        $(this).delay(index * 200).fadeIn(600);
      });
    }
  }, []);

  const milestones = [
    { year: '2023', event: 'Prinstine Group of Companies Founded' },
    { year: '2023', event: 'Launch of Prinstine Consults' },
    { year: '2025', event: 'Establishment of Prinstine Academy' },
    { year: '2026', event: 'Inception of Prinstine Microfinance' },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-secondary text-white py-24 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(120deg, rgba(17,24,39,0.45), rgba(30,58,138,0.4)), url(${officePhoto})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 animated-gradient opacity-40 mix-blend-screen"></div>
        <div className="absolute inset-0 bg-black/20"></div>
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
              Our Story
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            >
              About Prinstine Group
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Empowering businesses through excellence and innovation
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-12 bg-gradient-to-b from-primary to-secondary rounded-full"></div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-text dark:text-white">
                  Our Story
                </h2>
              </div>
              <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  Prinstine Group of Companies (PGC) is a Liberian-owned enterprise, 
                  established in 2023 and headquartered at PA Rib House Junction, 
                  Airfield, Sinkor, Monrovia, Liberia.
                </p>
                <p>
                  We are committed to driving growth, empowerment, and productivity 
                  through our three core subsidiaries, each specializing in different 
                  aspects of business and personal development.
                </p>
                <p>
                  Our mission is to provide comprehensive financial services, professional 
                  training, and expert consultancy that empowers individuals and businesses 
                  to achieve their full potential.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-gray-700"
              >
                <img
                  src={teamPhoto}
                  alt="Prinstine Group managerial team"
                  className="w-full object-cover"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700"
              >
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-primary/20 shadow-lg">
                  <img src={ceoPhoto} alt="CEO Mr. Prince S. Cooper" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm text-primary dark:text-accent font-semibold">Leadership Highlight</p>
                  <p className="text-text dark:text-white font-heading text-xl">Mr. Prince S. Cooper</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Chief Executive Officer</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Subsidiaries Details */}
      <section className="py-24 bg-white dark:bg-gray-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
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
              Three powerful companies working together for your success
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Prinstine Consults */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-700 overflow-hidden relative"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-colors"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent">
                  Prinstine Consults
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Managed by Certified Public Accountants (CPAs), Prinstine Consults 
                  provides comprehensive financial consultancy services including:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                  <li>Taxation Services</li>
                  <li>Business Consulting</li>
                  <li>Financial System Setup</li>
                  <li>Audit and Advisory</li>
                  <li>Investment Consultancy</li>
                  <li>Fraud Examination</li>
                  <li>ICT Solutions</li>
                </ul>
              </div>
            </motion.div>

            {/* Prinstine Academy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent">
                Prinstine Academy
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Prinstine Academy offers Technical and Vocational Education and Training 
                (TVET) programs, licensed by the Ministry of Education. Our programs are 
                delivered by certified professionals and focus on:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Professional Certification</li>
                <li>Skills Development</li>
                <li>Industry-Relevant Training</li>
                <li>Career Advancement</li>
              </ul>
              <a
                href="https://prinstineacademy.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary dark:text-accent hover:underline mt-4 inline-block"
              >
                Visit prinstineacademy.org →
              </a>
            </motion.div>

            {/* Prinstine Microfinance */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-heading font-bold mb-4 text-primary dark:text-accent">
                Prinstine Microfinance
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Prinstine Microfinance provides accessible microloans to support 
                entrepreneurship and financial inclusion. Our services include:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Business Loans</li>
                <li>Personal Loans</li>
                <li>Flexible Repayment Terms</li>
                <li>Financial Inclusion Programs</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <h2 className="text-4xl font-heading font-bold text-center mb-12 text-text dark:text-white">
              Leadership
            </h2>
            
            <div className="space-y-12">
              {/* CEO */}
              <div className="bg-neutral dark:bg-gray-700 p-8 md:p-12 rounded-xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-primary/20 flex-shrink-0">
                    <img
                      src={ceoPhoto}
                      alt="Mr. Prince S. Cooper, CEO"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold mb-4 text-text dark:text-white">
                      Mr. Prince S. Cooper
                    </h3>
                    <h4 className="text-xl font-semibold mb-4 text-primary dark:text-accent">
                      Chief Executive Officer & Founder
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Mr. Prince S. Cooper is a distinguished professional with extensive 
                      qualifications and experience in financial management, business consulting, 
                      and education. Under his leadership, Prinstine Group has grown to become 
                      a trusted name in Liberia's business and education sectors.
                    </p>
                    <div>
                      <h5 className="font-semibold mb-3 text-text dark:text-white">Qualifications:</h5>
                      <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                        <li>B.Sc. in Accounting</li>
                        <li>MBA in Finance</li>
                        <li>MA in Education</li>
                        <li>PGDE (Post Graduate Diploma in Education)</li>
                        <li>DIP-Re (Diploma in Reinsurance)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Finance Manager */}
              <div className="bg-neutral dark:bg-gray-700 p-8 md:p-12 rounded-xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-primary/20 flex-shrink-0">
                    <img
                      src={jamesPhoto}
                      alt="James S. Tokpa, Finance Manager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold mb-4 text-text dark:text-white">
                      James S. Tokpa
                    </h3>
                    <h4 className="text-xl font-semibold mb-4 text-primary dark:text-accent">
                      Finance Manager
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      Lead Accounting software trainer
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Mr. Tokpa is a professional Accountant with years of experience in accountancy and finance. His expertise and dedication continue to push PGC towards excellence.
                    </p>
                  </div>
                </div>
              </div>

              {/* Marketing Manager */}
              <div className="bg-neutral dark:bg-gray-700 p-8 md:p-12 rounded-xl shadow-xl">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-52 h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-primary/20 flex-shrink-0">
                    <img
                      src={jamesettaPhoto}
                      alt="Jamesetta L. Sieh, Marketing Manager"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-heading font-bold mb-4 text-text dark:text-white">
                      Jamesetta L. Sieh
                    </h3>
                    <h4 className="text-xl font-semibold mb-4 text-primary dark:text-accent">
                      Marketing Manager / Lead Tax Analyst
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Ms. Sieh is a professional in Accountancy, taxation and finance. She is Dedicated to ensuring that all PGC clients are well managed and coded. Her expertise in taxation has placed PGC in the best position of rendering an accurate tax consultancy service.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gradient-to-br from-primary via-blue-700 to-secondary text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <h2 className="text-4xl font-heading font-bold mb-6 flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                Our Vision
              </h2>
              <p className="text-lg leading-relaxed">
                We envision to be one of the leading service providers Internationally; thereby ensuring that we maintain our core values through all spheres of influence in an effective and efficient manner.
              </p>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20"
            >
              <h2 className="text-4xl font-heading font-bold mb-6 flex items-center gap-3">
                <div className="w-1 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded-full"></div>
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed">
                Prinstine Group exists to empower people economically, financially and academically, thereby ensuring that those who live in poverty, ignorant to basic knowledge and need consultancy services, are served in full.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-neutral dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-heading font-bold text-center mb-12 text-text dark:text-white">
            Company Milestones
          </h2>
          <div ref={timelineRef} className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="timeline-item mb-8 flex items-center gap-4"
                style={{ display: 'none' }}
              >
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <p className="text-lg text-text dark:text-white">{milestone.event}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

