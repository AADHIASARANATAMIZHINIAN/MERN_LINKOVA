import React from 'react';
import { motion } from 'framer-motion';

const SplashScreen = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0A66C2',
        flexDirection: 'column',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
      }}
    >
      {/* Logo Animation */}
      <motion.div
        animate={{ scale: [0.8, 1.1, 1] }}
        transition={{ duration: 0.8, ease: 'easeInOut' }}
        style={{
          marginBottom: '30px',
        }}
      >
        <img 
          src="/logo.svg" 
          alt="LINKOVA Logo"
          style={{
            width: '120px',
            height: '120px',
            filter: 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.2))',
          }}
        />
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        style={{
          color: 'rgba(255, 255, 255, 0.9)',
          fontSize: '14px',
          marginTop: '20px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}
      >
        Connect. Share. Inspire.
      </motion.p>

      {/* Loading Text */}
      <motion.p
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
        style={{
          color: 'rgba(255, 255, 255, 0.7)',
          fontSize: '14px',
          marginTop: '40px',
          letterSpacing: '0.5px',
        }}
      >
        Loading your social world...
      </motion.p>

      {/* Animated Loading Dots */}
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginTop: '30px',
        }}
      >
        {[0, 1, 2].map((dot) => (
          <motion.div
            key={dot}
            animate={{ y: [-10, 10, -10] }}
            transition={{
              duration: 0.8,
              delay: dot * 0.15,
              repeat: Infinity,
            }}
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: 'white',
              borderRadius: '50%',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
            }}
          />
        ))}
      </div>

      {/* Bottom accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          width: '60px',
          height: '3px',
          backgroundColor: 'white',
          borderRadius: '2px',
          transformOrigin: 'center',
        }}
      />
    </motion.div>
  );
};

export default SplashScreen;
