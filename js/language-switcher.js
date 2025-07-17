// Language Switcher Component
const LanguageSwitcher = {
  currentLanguage: 'en',
  translations: {},
  
  init() {
    this.loadTranslations()
      .then(() => {
        this.setupEventListeners();
        this.setLanguage(this.getCurrentLanguage());
      })
      .catch(error => {
        console.error('Failed to load translations:', error);
        this.setupFallback();
      });
  },
  
  async loadTranslations() {
    try {
      // Only try to fetch if we're on http/https
      if (window.location.protocol === 'file:') {
        throw new Error('Local file access, using fallback');
      }
      
      const response = await fetch('data/translations.json');
      if (!response.ok) {
        throw new Error('Failed to fetch translations');
      }
      this.translations = await response.json();
    } catch (error) {
      console.warn('Using fallback translations:', error.message);
      // Fallback translations embedded in the component
      this.translations = this.getFallbackTranslations();
    }
  },
  
  getFallbackTranslations() {
    return {
      en: {
        nav: {
          home: "Home",
          about: "About",
          features: "Features",
          team: "Team",
          contact: "Contact",
          fileSigningShort: "File Signing",
          fileEncryptionShort: "File Encryption",
          pdfSigningShort: "PDF Signing",
          officeSigningShort: "Office Signing",
          authApi: "Auth API",
          credentials: "Credentials",
          logs: "Log Management"
        },
        hero: {
          subtitle: "E-Signature Based Security Library And Services",
          slogan: "One Security Device to Rule Them All",
          badge1: "💻 Switch Computers Instantly",
          badge2: "🔒 Hardware-Secured",
          badge3: "✨ Seamless & Simple Experience",
          cta: "Start Your Security Journey"
        },
        about: {
          subtitle: "Revolutionary Security",
          title: "Secure Everything, Trust Nothing",
          description1: "E-SBSL is a next-generation security ecosystem built on the power of e-signature devices. It replaces fragile passwords, insecure file sharing, and untrusted communication with cryptographic certainty — directly in your hands.",
          description2: "Plus, we store the necessary data encrypted on our servers, so if you switch devices, simply setting up E-SBSL on your new device is all it takes to continue working securely without hassle.",
          tagline: "No leaks. No guesswork. Just trust, end-to-end."
        },
        benefits: {
          title: "Why E-Signature Devices?",
          item1: {
            title: "🔒 Unextractable Private Keys",
            description: "Your private keys stay locked inside the USB device - they can never be extracted or stolen"
          },
          item2: {
            title: "🛡️ Hardware-Level Security",
            description: "Built on Turkish e-signature standards for maximum cryptographic protection"
          },
          item3: {
            title: "🔥 Works with What You Already Use",
            description: "Trusted by countless users, your popular e-signature device works instantly with our browser extension"
          }
        },
        features: {
          subtitle: "Core Features",
          title: "Secure Everything, Control Everything!",
          fileSigning: {
            title: "FILE SIGNING",
            description: "Signing all kinds of files and verification of signature with cryptographic proof"
          },
          fileEncryption: {
            title: "FILE ENCRYPTION",
            description: "Encrypting and decrypting all kinds of files with high-level security"
          },
          pdfSigning: {
            title: "PDF SIGNING",
            description: "PDF signing that fits ETSI-PADES standards. Can be verified with Adobe Acrobat!"
          },
          officeSigning: {
            title: "OFFICE DOCUMENTS SIGNING",
            description: "Microsoft Office documents signing that fits ECMA-376 standards"
          },
          pgp: {
            title: "PGP MANAGEMENT",
            description: "Effortlessly create, manage, and protect your PGP key pair with hardware security"
          },
          gmail: {
            title: "SECURE GMAIL",
            description: "All mail flow is encrypted and signed with e-signature device or PGP key pair"
          },
          authApi: {
            title: "AUTHENTICATION API",
            description: "Passwordless authentication API for 3rd party websites with zero-trust security"
          },
          https: {
            title: "HTTP/S AUTHORIZATION",
            description: "HTTP/S header based authorization mechanism for restricted URLs"
          },
          credentials: {
            title: "CREDENTIAL VAULT",
            description: "A secure vault for your credentials, protected by your e-signature device"
          }
        },
        team: {
          subtitle: "Our Team",
          title: "Meet Our Dedicated Team",
          description: "Our team of computer engineers are dedicated to revolutionizing digital security through innovative e-signature technology.",
          supervisor: "Supervisor",
          advisor: "Advisor",
          developer: "Developer",
          sponsoredBy: "Proudly Sponsored By"
        },
        contact: {
          subtitle: "Get In Touch",
          title: "Contact Us",
          description: "Ready to secure your digital world? Get in touch with our team to learn more about E-SBSL.",
          metu: "Middle East Technical University"
        },
        footer: {
          copyright: "© 2025 E-SBSL. One Security Device to Rule Them All."
        }
      },
      tr: {
        nav: {
          home: "Ana Sayfa",
          about: "Hakkında",
          features: "Özellikler",
          team: "Ekip",
          contact: "İletişim",
          fileSigningShort: "Dosya İmzalama",
          fileEncryptionShort: "Dosya Şifreleme",
          pdfSigningShort: "PDF İmzalama",
          officeSigningShort: "Office İmzalama",
          authApi: "Kimlik Doğrulama API",
          credentials: "Kimlik Bilgileri",
          logs: "Log Yönetimi"
        },
        hero: {
          subtitle: "E-İmza Tabanlı Güvenlik Kütüphanesi ve Hizmetleri",
          slogan: "Hepsini Yöneten Tek Güvenlik Cihazı",
          badge1: "💻 Bilgisayarlar Arası Anında Geçiş",
          badge2: "🔒 Donanım Güvenliği",
          badge3: "✨ Sorunsuz & Basit Deneyim",
          cta: "Güvenlik Yolculuğunuza Başlayın"
        },
        about: {
          subtitle: "Devrimci Güvenlik",
          title: "Her Şeyi Güvenceye Alın, Hiçbir Şeye Güvenmeyin",
          description1: "E-SBSL, e-imza cihazlarının gücü üzerine kurulmuş yeni nesil bir güvenlik ekosistemidir. Kırılgan parolaları, güvensiz dosya paylaşımını ve güvenilmeyen iletişimi kriptografik kesinlikle değiştirir.",
          description2: "Ayrıca, gerekli verileri sunucularımızda şifreleyerek saklıyoruz, böylece cihaz değiştirdiğinizde E-SBSL'yi yeni cihazınızda kurmak güvenli çalışmaya devam etmek için yeterli.",
          tagline: "Sızıntı yok. Tahmin yok. Sadece güven, uçtan uca."
        },
        benefits: {
          title: "Neden E-İmza Cihazları?",
          item1: {
            title: "🔒 Çıkarılamaz Özel Anahtarlar",
            description: "Özel anahtarlarınız USB cihazının içinde kilitli kalır - asla çıkarılamaz veya çalınamaz"
          },
          item2: {
            title: "🛡️ Donanım Seviyesinde Güvenlik",
            description: "Maksimum kriptografik koruma için Türk e-imza standartları üzerine kurulmuş"
          },
          item3: {
            title: "🔥 Zaten Kullandığınızla Çalışır",
            description: "Sayısız kullanıcı tarafından güvenilir, popüler e-imza cihazınız tarayıcı uzantımızla anında çalışır"
          }
        },
        features: {
          subtitle: "Temel Özellikler",
          title: "Her Şeyi Güvenceye Alın, Her Şeyi Kontrol Edin!",
          fileSigning: {
            title: "DOSYA İMZALAMA",
            description: "Her türlü dosyayı imzalama ve kriptografik kanıtla imza doğrulama"
          },
          fileEncryption: {
            title: "DOSYA ŞİFRELEME",
            description: "Yüksek düzeyde güvenlikle her türlü dosyayı şifreleme ve şifre çözme"
          },
          pdfSigning: {
            title: "PDF İMZALAMA",
            description: "ETSI-PADES standartlarına uygun PDF imzalama. Adobe Acrobat ile doğrulanabilir!"
          },
          officeSigning: {
            title: "OFFICE BELGE İMZALAMA",
            description: "ECMA-376 standartlarına uygun Microsoft Office belge imzalama"
          },
          pgp: {
            title: "PGP YÖNETİMİ",
            description: "Donanım güvenliğiyle PGP anahtar çiftinizi zahmetsizce oluşturun, yönetin ve koruyun"
          },
          gmail: {
            title: "GÜVENLİ GMAIL",
            description: "Tüm mail akışı e-imza cihazı veya PGP anahtar çifti ile şifrelenir ve imzalanır"
          },
          authApi: {
            title: "KİMLİK DOĞRULAMA API",
            description: "Üçüncü taraf web siteleri için sıfır güven güvenliğiyle parolasız kimlik doğrulama API"
          },
          https: {
            title: "HTTP/S YETKİLENDİRME",
            description: "Kısıtlı URL'ler için HTTP/S başlık tabanlı yetkilendirme mekanizması"
          },
          credentials: {
            title: "KİMLİK BİLGİLERİ KASASI",
            description: "E-imza cihazınızla korunan kimlik bilgileriniz için güvenli kasa"
          }
        },
        team: {
          subtitle: "Ekibimiz",
          title: "Kendini Adamış Ekibimizle Tanışın",
          description: "Bilgisayar mühendislerinden oluşan ekibimiz, yenilikçi e-imza teknolojisi aracılığıyla dijital güvenliği devrime uğratmaya kendini adamıştır.",
          supervisor: "Danışman",
          advisor: "Danışman",
          developer: "Geliştirici",
          sponsoredBy: "Gururla Sponsorluğunda"
        },
        contact: {
          subtitle: "İletişime Geçin",
          title: "Bize Ulaşın",
          description: "Dijital dünyanızı güvence altına almaya hazır mısınız? E-SBSL hakkında daha fazla bilgi edinmek için ekibimizle iletişime geçin.",
          metu: "Orta Doğu Teknik Üniversitesi"
        },
        footer: {
          copyright: "© 2025 E-SBSL. Hepsini Yöneten Tek Güvenlik Cihazı."
        }
      }
    };
  },
  
  setupEventListeners() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const lang = button.getAttribute('data-lang');
        this.setLanguage(lang);
      });
    });
    
    // Keyboard navigation for language switcher
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
      languageSwitcher.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
          e.preventDefault();
          const buttons = languageSwitcher.querySelectorAll('.lang-btn');
          const currentIndex = Array.from(buttons).findIndex(btn => btn.classList.contains('active'));
          const nextIndex = e.key === 'ArrowRight' ? 
            (currentIndex + 1) % buttons.length : 
            (currentIndex - 1 + buttons.length) % buttons.length;
          
          buttons[nextIndex].click();
          buttons[nextIndex].focus();
        }
      });
    }
  },
  
  setLanguage(lang) {
    if (!this.translations[lang]) {
      console.warn(`Language ${lang} not found, falling back to English`);
      lang = 'en';
    }
    
    this.currentLanguage = lang;
    
    // Update UI
    this.updateLanguageButtons(lang);
    this.updateContent(lang);
    this.updateDocumentLanguage(lang);
    this.updatePageTitle(lang);
    this.saveLanguagePreference(lang);
    
    // Announce language change to screen readers
    this.announceLanguageChange(lang);
    
    // Dispatch custom event for other components
    const event = new CustomEvent('languageChanged', {
      detail: { language: lang, translations: this.translations[lang] }
    });
    document.dispatchEvent(event);
  },
  
  updateLanguageButtons(lang) {
    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(button => {
      button.classList.toggle('active', button.getAttribute('data-lang') === lang);
      button.setAttribute('aria-pressed', button.getAttribute('data-lang') === lang);
    });
  },
  
  updateContent(lang) {
    const translations = this.translations[lang];
    const elements = document.querySelectorAll('[data-translate]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      const translation = this.getNestedTranslation(translations, key);
      
      if (translation) {
        // Handle different types of content
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translation;
        } else if (element.tagName === 'IMG') {
          element.alt = translation;
        } else if (element.hasAttribute('aria-label')) {
          element.setAttribute('aria-label', translation);
        } else if (element.hasAttribute('title')) {
          element.title = translation;
        } else {
          // For regular text content, preserve HTML structure
          if (element.innerHTML.includes('<')) {
            // If element contains HTML, be more careful
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = element.innerHTML;
            const textNodes = this.getTextNodes(tempDiv);
            if (textNodes.length === 1) {
              element.innerHTML = element.innerHTML.replace(textNodes[0].textContent, translation);
            } else {
              element.textContent = translation;
            }
          } else {
            element.textContent = translation;
          }
        }
      }
    });
  },
  
  getTextNodes(element) {
    const textNodes = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      null,
      false
    );
    
    let node;
    while (node = walker.nextNode()) {
      if (node.textContent.trim()) {
        textNodes.push(node);
      }
    }
    
    return textNodes;
  },
  
  getNestedTranslation(translations, key) {
    const keys = key.split('.');
    let result = translations;
    
    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        return null;
      }
    }
    
    return result;
  },
  
  updateDocumentLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  },
  
  updatePageTitle(lang) {
    const titles = {
      'en': 'E-SBSL - One Security Device to Rule Them All',
      'tr': 'E-SBSL - Hepsini Yöneten Tek Güvenlik Cihazı'
    };
    
    document.title = titles[lang] || titles['en'];
  },
  
  getCurrentLanguage() {
    // Check URL parameter first
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang && this.translations[urlLang]) {
      return urlLang;
    }
    
    // Check localStorage
    const savedLang = localStorage.getItem('esbsl-language');
    if (savedLang && this.translations[savedLang]) {
      return savedLang;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (this.translations[browserLang]) {
      return browserLang;
    }
    
    // Default to English
    return 'en';
  },
  
  saveLanguagePreference(lang) {
    try {
      localStorage.setItem('esbsl-language', lang);
    } catch (e) {
      console.warn('Could not save language preference:', e);
    }
  },
  
  announceLanguageChange(lang) {
    const messages = {
      'en': 'Language changed to English',
      'tr': 'Dil Türkçe olarak değiştirildi'
    };
    
    const message = messages[lang] || messages['en'];
    
    // Create announcement element
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'visually-hidden';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
  },
  
  setupFallback() {
    // If translations fail to load, set up basic functionality
    console.warn('Using fallback language switcher');
    this.translations = this.getFallbackTranslations();
    this.setupEventListeners();
    this.setLanguage('en');
  },
  
  // Public API
  getTranslation(key, lang = this.currentLanguage) {
    const translations = this.translations[lang];
    return this.getNestedTranslation(translations, key);
  },
  
  getCurrentLanguage() {
    return this.currentLanguage;
  },
  
  getSupportedLanguages() {
    return Object.keys(this.translations);
  }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LanguageSwitcher;
}

// Auto-initialize if running in browser
if (typeof window !== 'undefined') {
  window.LanguageSwitcher = LanguageSwitcher;
}
