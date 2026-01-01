import React, { useEffect } from 'react';

export default function AuthModal({ open, onClose, children }) {
  // Disable background scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      // Clean up: re-enable scrolling when modal closes/unmounts
      document.body.style.overflow = 'auto';
    };
  }, [open]); // re-run effect when `open` changes:contentReference[oaicite:6]{index=6}

  if (!open) return null;  // Do not render anything if modal is not open

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        zIndex: 1000
      }}
    >
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white', padding: '20px', borderRadius: '4px',
          maxWidth: '400px', width: '100%'
        }}
      >
        {children}
      </div>
    </div>
  );
}
