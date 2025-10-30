import React from 'react';

const LoadingSkeleton = ({ count = 3 }) => {
  return (
    <>
      <style>
        {`
          @keyframes shimmer {
            0% {
              background-position: -1000px 0;
            }
            100% {
              background-position: 1000px 0;
            }
          }
          .skeleton {
            background: linear-gradient(
              90deg,
              #f0f0f0 25%,
              #e0e0e0 50%,
              #f0f0f0 75%
            );
            background-size: 1000px 100%;
            animation: shimmer 2s infinite;
          }
        `}
      </style>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} style={{ 
          border: '1px solid #dfdfdf', 
          borderRadius: '8px', 
          padding: '18px 19px', 
          marginBottom: '15px', 
          background: '#fff', 
          boxShadow: '0 0.5px 2px 0 #eaeaea' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div className="skeleton" style={{
              width: 42, 
              height: 42, 
              borderRadius: '50%'
            }}></div>
            <div style={{ flex: 1 }}>
              <div className="skeleton" style={{
                width: '150px',
                height: 16,
                borderRadius: 4,
                marginBottom: 8
              }}></div>
              <div className="skeleton" style={{
                width: '100px',
                height: 12,
                borderRadius: 4
              }}></div>
            </div>
          </div>
          <div className="skeleton" style={{
            width: '100%',
            height: 14,
            borderRadius: 4,
            marginBottom: 8
          }}></div>
          <div className="skeleton" style={{
            width: '80%',
            height: 14,
            borderRadius: 4,
            marginBottom: 8
          }}></div>
          <div className="skeleton" style={{
            width: '60%',
            height: 14,
            borderRadius: 4
          }}></div>
        </div>
      ))}
    </>
  );
};

export default LoadingSkeleton;
