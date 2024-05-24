import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import MenuBar from "@/components/customMenuBar/customMenuBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const router = useRouter();

  const handleFirstImageClick = () => {
    router.push('/add-word'); 
  };

  const handleSecondImageClick = () => {
    router.push('/quiz'); 
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#00008b', 
      display: 'flex' 
    }}>
      <MenuBar /> 
      <div style={{
        flex: '1',
        marginLeft: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
      }}>
        <main style={{ 
          textAlign: 'center', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            margin: '20px' }}>
            <div style={{ 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '2px solid #1e90ff' }}>
              <Image
                src="/kalem.png"
                alt="Kalem Resmi"
                width={200}
                height={200}
                onClick={handleFirstImageClick}
              />
            </div>
            <p style={{ 
              color: '#fff', 
              marginTop: '10px' 
              }}>Kelime Ekle</p>
          </div>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            margin: '20px' }}>
            <div style={{ 
              borderRadius: '50%', 
              overflow: 'hidden', 
              border: '2px solid #1e90ff' }}>
              <Image
                src="/sinav.png"
                alt="Sınav Resmi"
                width={200}
                height={200}
                onClick={handleSecondImageClick}
              />
            </div>
            <p style={{ color: '#fff', marginTop: '10px' }}>Quiz</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;