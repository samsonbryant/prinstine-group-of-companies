import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import $ from 'jquery';

function CertificateVerification() {
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const [certNumber, setCertNumber] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!certNumber.trim()) return;

    // If no API, show contact message
    if (!API_BASE) {
      setVerificationResult({
        status: 'info',
        message: 'Certificate verification requires backend service. Please contact us at info@prinstinegroup.org or info@prinstineacademy.org for verification.'
      });
      setShowModal(true);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/verify-certificate`, {
        cert_number: certNumber.trim()
      });
      setVerificationResult(response.data);
      setShowModal(true);
    } catch (error) {
      setVerificationResult({
        status: 'error',
        message: 'Failed to verify certificate. Please contact us at info@prinstinegroup.org for assistance.'
      });
      setShowModal(true);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setVerificationResult(null);
    setCertNumber('');
  };

  useEffect(() => {
    // jQuery modal functionality
    if (showModal) {
      $('body').css('overflow', 'hidden');
    } else {
      $('body').css('overflow', 'auto');
    }
    return () => {
      $('body').css('overflow', 'auto');
    };
  }, [showModal]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-700 to-secondary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 animated-gradient opacity-50"></div>
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
              Verification System
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-4"
            >
              Certificate Verification
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl text-white/90 max-w-2xl mx-auto"
            >
              Verify the authenticity of your certificates instantly
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Verification Form */}
      <section className="py-24 bg-gradient-to-b from-white to-neutral dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4 text-text dark:text-white">
                Verify Your Certificate
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Enter your certificate number below to verify its authenticity and validity.
              </p>
            </div>
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-text dark:text-white">
                  Certificate Number
                </label>
                <input
                  type="text"
                  value={certNumber}
                  onChange={(e) => setCertNumber(e.target.value)}
                  placeholder="e.g., PGC-2024-001"
                  required
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-text dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-lg font-mono text-lg"
                />
              </div>
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02, y: loading ? 0 : -2 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-glow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </span>
                ) : (
                  'Verify Certificate'
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {showModal && verificationResult && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-8"
              >
                <div className="text-center mb-6">
                  {verificationResult.status === 'valid' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                  {(verificationResult.status === 'invalid' || verificationResult.status === 'expired') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                  {(verificationResult.status === 'error' || verificationResult.status === 'info') && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4"
                    >
                      <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </motion.div>
                  )}
                  <h3 className="text-2xl font-heading font-bold mb-2 text-text dark:text-white">
                    {verificationResult.status === 'valid' && 'Certificate Valid'}
                    {verificationResult.status === 'invalid' && 'Certificate Not Found'}
                    {verificationResult.status === 'expired' && 'Certificate Expired'}
                    {verificationResult.status === 'error' && 'Verification Error'}
                    {verificationResult.status === 'info' && 'Contact Us for Verification'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {verificationResult.message}
                  </p>
                </div>

                {verificationResult.details && (
                  <div className="bg-neutral dark:bg-gray-700 p-6 rounded-lg mb-6">
                    <h4 className="font-semibold mb-3 text-text dark:text-white">Certificate Details:</h4>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Certificate Number:</span>
                        <span className="font-mono font-semibold text-text dark:text-white">
                          {verificationResult.details.cert_number}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Holder Name:</span>
                        <span className="font-semibold text-text dark:text-white">
                          {verificationResult.details.holder_name}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Issue Date:</span>
                        <span className="text-text dark:text-white">
                          {new Date(verificationResult.details.issue_date).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Expiry Date:</span>
                        <span className="text-text dark:text-white">
                          {new Date(verificationResult.details.expiry_date).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                )}

                <button
                  onClick={closeModal}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CertificateVerification;

