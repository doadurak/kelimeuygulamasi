import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signInWithEmailAndPassword , createUserWithEmailAndPassword} from "firebase/auth";
import {analytics, auth} from "@/firebase";
import { db } from "../../firestore";
import { doc, setDoc } from "firebase/firestore";
import { collection } from 'firebase/firestore';
import{sendPasswordResetEmail,updateProfile} from "firebase/auth"

const LoginPage: React.FC = () => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerGender, setRegisterGender] = useState(''); 
  const [registerBirthdate, setRegisterBirthdate] = useState('');

  const router = useRouter();

  const handleLogin = () => {
    if (!loginEmail || !loginPassword) {
      return;
    }
  
    console.log('Giriş butonuna basıldı. Email:', loginEmail, 'Şifre:', loginPassword);
    setIsLoading(true);
  
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        console.log('Kullanıcı girişi başarılı:', userCredential.user);
        const userRef = doc(collection(db, 'users'), userCredential.user.uid);
        setDoc(userRef, {
          email: loginEmail
        }, { merge: true });
  
        // Giriş yapan kullanıcının e-postasını yerel depolamaya ekle
        localStorage.setItem('userEmail', loginEmail);
  
        setIsLoading(false);
        router.push('/home');
      })
      .catch((error) => {
        console.error('Kullanıcı girişi başarısız:', error);
        setIsLoading(false);
      });
  };

  const handleForgotPassword = () => {
    console.log('Şifremi unuttum butonuna basıldı. Email:', forgotPasswordEmail);
    setIsLoading(true);
    sendPasswordResetEmail(auth, forgotPasswordEmail)
      .then(() => {
        console.log('Şifre sıfırlama e-postası gönderildi');
        setIsLoading(false);
        setShowForgotPassword(false);
      })
      .catch((error) => {
        console.error('Şifre sıfırlama e-postası gönderilirken hata:', error);
        setIsLoading(false);
      });
  };

  const handleModalClose = () => {
    setShowForgotPassword(false);
    setShowRegisterModal(false);
  };
  const handleRegister = () => {
    console.log('Kayıt ol butonuna basıldı. Email:', registerEmail, 'Şifre:', registerPassword);
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
      .then((userCredential) => {
        updateProfile(userCredential.user, {displayName: registerFirstName})
        updateProfile(userCredential.user, {displayName: registerLastName})
        updateProfile(userCredential.user, {displayName: registerGender})
        updateProfile(userCredential.user, {displayName: registerBirthdate})
        // Kullanıcı başarıyla kaydedildi
        console.log('Kullanıcı başarıyla kaydedildi:', userCredential.user);
        setIsLoading(false);
        // Giriş yapılabilir veya başka bir işlem yapılabilir
      })
      .catch((error) => {
        // Kullanıcı kaydı sırasında hata oluştu
        console.error('Kullanıcı kaydı sırasında hata:', error);
        setIsLoading(false);
      });
  };
  const isUnder18 = (birthdate: string): boolean => {
    const today = new Date();
    const birth = new Date(birthdate);
    const age = today.getFullYear() - birth.getFullYear();
    const month = today.getMonth() - birth.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
      return age - 1 < 18;
    }
    return age < 18;
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
            <button onClick={() => setShowRegisterModal(true)} 
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
         {showRegisterModal && (
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
            <div style={{ 
              position: 'relative', 
              borderRadius: '8px', 
              padding: '20px', 
              width: '300px', 
              backgroundColor: '#1e90ff', 
              textAlign: 'center',
              margin: 'auto' }} onClick={(e) => e.stopPropagation()}>
              <span style={{ 
                position: 'absolute', 
                top: '8px', 
                right: '8px', 
                cursor: 'pointer', 
                fontSize: '18px' }} onClick={handleModalClose}>×</span>
              <h2 style={{ marginBottom: '20px', color: 'white', fontStyle: 'normal' }}></h2>
              <div style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="Adınız"
                  value={registerFirstName}
                  onChange={(e) => setRegisterFirstName(e.target.value)}
                  style={{ 
                    marginBottom: '10px', 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' }}
                />
                <input
                  type="text"
                  placeholder="Soyadınız"
                  value={registerLastName}
                  onChange={(e) => setRegisterLastName(e.target.value)}
                  style={{ 
                    marginBottom: '10px', 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' }}
                />

                <input
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
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
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  style={{ 
                    marginBottom: '10px', 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' }}
                />
                <input
                  type="date"
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split('T')[0]}
                  placeholder="Doğum Tarihi"
                  value={registerBirthdate}
                  onChange={(e) => setRegisterBirthdate(e.target.value)}
                  style={{ 
                    marginBottom: '20px', 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' }}
                />
                <select
                  value={registerGender}
                  onChange={(e) => setRegisterGender(e.target.value)}
                  style={{ 
                    marginBottom: '10px', 
                    width: '106%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' }}>
                  <option value="">Cinsiyet Seçin</option>
                  <option value="Erkek">Erkek</option>
                  <option value="Kadın">Kadın</option>
                  <option value="Diğer">Diğer</option>
                </select>
                <button disabled={isLoading || isUnder18(registerBirthdate)} onClick={handleRegister} style={{ 
                    width: '106%', 
                    backgroundColor: '#00008b', 
                    color: '#fff', 
                    padding: '8px 16px', 
                    borderRadius: '4px', 
                    border: 'none', 
                    cursor: 'pointer', 
                    fontWeight:'bold' }}>
                  {isLoading ? 'Kaydediliyor...' : 'Kayıt Ol'}
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