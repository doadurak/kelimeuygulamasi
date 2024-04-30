import React, { useState } from 'react';
import { useRouter } from 'next/router';

const LoginPage: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const router = useRouter();

  const handleLogin = () => {
    console.log('Giriş butonuna basıldı. Email:', loginEmail, 'Şifre:', loginPassword);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      router.push('');
    }, 2000);
  };

  const handleForgotPassword = () => {
    console.log('Şifremi unuttum butonuna basıldı. Email:', forgotPasswordEmail);
    setShowForgotPassword(false);
  };

  const handleModalClose = () => {
    setShowForgotPassword(false);
  };

  return (
   
    <div style={{
      backgroundColor:'#00008b',
      // backgroundImage: "url('/black.png')", // Resmin yolunu doğru şekilde belirtin
      // backgroundSize: 'cover', // Resmi kaplamasını sağlar
      // backgroundRepeat: 'no-repeat', // Resmin tek seferde görünmesini sağlar
      // position: 'relative', // Container'ın içeriğini tutmak için
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      
    }}>
      <div style={{ 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', 
        height: '100vh'  }}>
        <div style={{ 
          border: '1px solid ', 
          borderRadius: '12px', 
          padding: '20px', 
          width: '300px', 
          backgroundColor: '#1e90ff' }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center' }}>
            <input
              type="email"
              placeholder="E-posta adresinizi girin"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              style={{ 
              marginBottom: '10px', 
              width: '100%', 
              padding: '8px', 
              borderRadius: '4px', 
              border: '1px solid #ccc' }}
            />
            <input
              type="password"
              placeholder="Şifrenizi girin"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              style={{ 
                marginBottom: '20px',
                width: '100%', 
                padding: '8px', 
                borderRadius: '4px', 
                border: '1px solid #ccc' }}
            />
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '10px' }}>
            <button disabled={isLoading} onClick={handleLogin} 
            style={{ 
              backgroundColor: '#00008b', 
              color: 'white', 
              padding: '8px 16px', 
              borderRadius: '4px', 
              border: 'none', 
              cursor: 'pointer', 
              width: '100%',
              fontWeight:'bold' }}>
              {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
            </button>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '10px' }}>
            <button onClick={() => router.push('/register')} 
            style={{ backgroundColor: '#00bfff', 
            color: 'white', padding: '8px 16px', 
            borderRadius: '4px', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight:'bold' }}>Kayıt Ol</button>
          </div>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: '10px' }}>
            <span style={{ 
              color: 'white', 
              cursor: 'pointer', 
              fontStyle:'normal' }} 
              onClick={() => 
              setShowForgotPassword(true)}>Şifreni mi Unuttun?</span>
          </div>
        </div>

        {/* Şifremi Unuttum Modal */}
        {showForgotPassword && (
          <div style={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', }} onClick={handleModalClose}>
            <div style={{ position: 'relative', borderRadius: '8px', padding: '20px', width: '300px', backgroundColor: '#1e90ff', textAlign: 'center',margin:'auto' }} onClick={(e) => e.stopPropagation()}>
              <span style={{ position: 'absolute', top: '8px', right: '8px', cursor: 'pointer', fontSize: '18px' }} onClick={handleModalClose}>×</span>
              <h2 style={{ marginBottom: '20px',color: 'white', fontStyle:'normal'}}>Şifreni mi Unuttun?</h2>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <input
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
                  style={{ marginBottom: '20px', width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button disabled={isLoading} onClick={handleForgotPassword} style={{ width: '100%', backgroundColor: '#00008b', color: '#fff', padding: '8px 16px', borderRadius: '4px', border: 'none', cursor: 'pointer', fontWeight:'bold' }}>
                  {isLoading ? 'Gönderiliyor...' : 'Giriş Bağlantısı Gönder'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
