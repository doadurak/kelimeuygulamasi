import Image from 'next/image';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const router = useRouter();

  const handleFirstImageClick = () => {
    router.push('/add-word'); 
  };

  const handleSecondImageClick = () => {
    router.push('/quiz'); // Quiz sayfası
  };

  return (
    <div style={{ backgroundColor: '#00008b', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <header style={{ textAlign: 'right',position: 'absolute', top: '10px', right: '10px'  }}>
      <FontAwesomeIcon icon={faCog} onClick={() => console.log('Ayarlar butonuna tıklandı')} style={{ cursor: 'pointer' , fontSize: '24px'}} />

      </header>
      <main style={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
          <div style={{ borderRadius: '50%', overflow: 'hidden', border: '2px solid #1e90ff' }}>
            <Image
              src="/kalem.png"
              alt="Kalem Resmi"
              width={200}
              height={200}
              onClick={handleFirstImageClick}
            />
          </div>
          <p style={{ color: '#fff', marginTop: '10px' }}>Kelime Ekle</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px' }}>
          <div style={{ borderRadius: '50%', overflow: 'hidden', border: '2px solid #1e90ff' }}>
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
  );
};

export default HomePage;