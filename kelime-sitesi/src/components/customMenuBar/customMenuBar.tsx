import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const MenuBar: React.FC = () => {
  const router = useRouter();

  const handleQuiz = () => {
    router.push('/quiz');
  };

  const handleAddWordPage = () => {
    router.push('/add-word');
  };

  const handleSettings = () => {
    router.push('/settings');
  };

  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <div style={{
      width: '200px',
      backgroundColor: '#1e90ff',
      padding: '20px',
      position: 'fixed',
      left: '0',
      top: '0',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    }}>
      <h1 style={{ color: '#fff', marginBottom: '20px', textAlign: 'left' }}>Kelime Sitesi</h1>
      <ul style={{
        listStyle: 'none',
        padding: '0',
        width: '100%',
        textAlign: 'left',
      }}>
        <li style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
            <a href="#" onClick={handleQuiz} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <img src="/soruisareti.png" alt="Quiz" style={{ width: '20px', marginRight: '10px' }} />
              Quiz
            </a>
          </div>
        </li>
        <li style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
            <a href="#" onClick={handleAddWordPage} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <img src="/ekleme.png" alt="Add Word" style={{ width: '20px', marginRight: '10px' }} />
              Kelime Ekleme
            </a>
          </div>
        </li>
        <li style={{ marginBottom: '20px', width: '100%' }}>
          <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
            <a href="#" onClick={handleSettings} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <img src="/ayarlar.png" alt="Settings" style={{ width: '20px', marginRight: '10px' }} />
              Ayarlar
            </a>
          </div>
        </li>
      </ul>
      <div style={{ width: '100%', textAlign: 'left', marginTop: '420px' }}>
          <div style={{ border: '2px solid #00008b', padding: '6px', borderRadius: '8px', width: '100%' }}>
            <a href="#" onClick={handleLogout} style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <img src="/cikis.png" alt="Logout" style={{ width: '20px', marginRight: '10px' }} />
              Çıkış
            </a>
          </div>
        </div>
    </div>
  );
};

export default MenuBar;