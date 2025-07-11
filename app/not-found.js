import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#f8f9fa'
    }}>
      <div style={{
        maxWidth: '600px',
        padding: '40px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e9ecef'
      }}>
        <div style={{
          fontSize: '120px',
          marginBottom: '20px',
          color: '#6c757d',
          fontWeight: 'bold',
          lineHeight: '1'
        }}>
          404
        </div>
        
        <h1 style={{
          fontSize: '32px',
          marginBottom: '16px',
          color: '#212529',
          fontWeight: '600'
        }}>
          Page Not Found
        </h1>
        
        <p style={{
          fontSize: '18px',
          marginBottom: '32px',
          color: '#6c757d',
          lineHeight: '1.6'
        }}>
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or you might have typed the wrong URL.
        </p>
        
        <div style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link 
            href="/"
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background-color 0.2s',
              display: 'inline-block'
            }}
          >
            Go to Homepage
          </Link>
          
          <button
            onClick={() => window.history.back()}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#5a6268'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#6c757d'}
          >
            Go Back
          </button>
        </div>
        
        <div style={{
          marginTop: '40px',
          padding: '20px',
          backgroundColor: '#f8f9fa',
          borderRadius: '6px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{
            fontSize: '18px',
            marginBottom: '12px',
            color: '#495057'
          }}>
            Popular Pages
          </h3>
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <Link 
              href="/blog" 
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Blog
            </Link>
            <Link 
              href="/about" 
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              About
            </Link>
            <Link 
              href="/contact" 
              style={{
                color: '#007bff',
                textDecoration: 'none',
                fontSize: '14px'
              }}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        fontSize: '14px',
        color: '#6c757d'
      }}>
        <p>If you believe this is an error, please contact our support team.</p>
      </div>
    </div>
  );
}
