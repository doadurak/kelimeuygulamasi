# Kelime Sitesi (Next.js + React)

Kelime Sitesi, kullanıcıların Türkçe kelime bilgisini geliştirmesi için hazırlanmış modern bir web uygulamasıdır. Kullanıcılar uygulama sayesinde kelimeleri öğrenebilir, örnek cümleler üzerinden pekiştirme yapabilir, analiz ve quiz gibi ek modüllerle bilgilerini test edebilir.

## Özellikler

- Günlük yeni kelime gösterimi
- Kelime anlamı, türü ve örnek cümle
- Quiz ve analiz sayfaları
- Firebase entegrasyonu (veritabanı veya auth)
- Next.js ile SSR/SEO avantajı
- Tailwind CSS ile modern tasarım
- Responsive (mobil uyumlu) yapı

## Kullanılan Teknolojiler

| Teknoloji      | Açıklama                                |
|----------------|-----------------------------------------|
| React          | UI bileşenleri                          |
| Next.js        | Sayfa yönlendirme ve sunucu tarafı render |
| TypeScript     | Tip güvenliği                           |
| Tailwind CSS   | Hızlı ve esnek tasarım                  |
| Firebase       | Veritabanı, auth veya barındırma        |
| ESLint & Prettier | Kod düzeni ve stil kontrolü         |

## Kurulum ve Çalıştırma

> Projeyi kendi bilgisayarınızda çalıştırmak için aşağıdaki adımları takip edin.

```bash
# 1. Repoyu klonlayın
git clone https://github.com/doadurak/kelimeuygulamasi.git
cd kelimeuygulamasi/kelime-sitesi

# 2. Bağımlılıkları yükleyin
npm install

# 3. Uygulamayı çalıştırın
npm run dev
