
import { useState } from "react";
import {
  HeartPulse, Globe, Stethoscope, MessageCircle, Languages,
  Mic, MicOff, Volume2, Send, ShieldCheck, Clock, UserRound,
  Menu, Video, Headphones, CheckCircle, Activity, ChevronDown
} from "lucide-react";
import "./App.css";

const translations = {
  English: {
    home: "Home", consultation: "Consultation", interpreter: "Interpreter",
    welcome: "Healthcare without language barriers.",
    subtitle: "Connect with healthcare professionals and communicate in the language you understand best.",
    book: "Start consultation", services: "Our services",
    translation: "Medical translation", translationDesc: "Communicate across languages with translated messages.",
    voice: "Voice assistance", voiceDesc: "Speak or listen using your browser's voice features.",
    interpreterTitle: "Interpreter support", interpreterDesc: "Request help from a language interpreter during your consultation.",
    start: "Start translating", patient: "Patient", doctor: "Doctor",
    message: "Type your message here...", send: "Translate message",
    original: "Your message", translated: "Translated message",
    language: "Choose your language", status: "Your health matters",
    secure: "Privacy-conscious communication", choose: "Select language",
    symptom: "Describe your symptoms", mic: "Speak symptoms",
    listening: "Listening...", stop: "Stop listening", listen: "Read aloud",
    clear: "Clear", ready: "Ready to help", request: "Request an interpreter",
    demo: "Demo interface — translated text may need clinical verification.",
    languages: "Available languages", online: "Online demo",
    disclaimer: "This app does not provide a diagnosis or emergency medical service."
  },
  Tamil: {
    home: "முகப்பு", consultation: "மருத்துவ ஆலோசனை", interpreter: "மொழிபெயர்ப்பாளர்",
    welcome: "மொழித் தடைகள் இல்லாத மருத்துவம்.",
    subtitle: "உங்களுக்குப் புரியும் மொழியில் மருத்துவ சேவைகளை அணுகுங்கள்.",
    book: "ஆலோசனையைத் தொடங்கு", services: "எங்கள் சேவைகள்",
    translation: "மருத்துவ மொழிபெயர்ப்பு", translationDesc: "மொழிபெயர்க்கப்பட்ட செய்திகளின் மூலம் தொடர்புகொள்ளுங்கள்.",
    voice: "குரல் உதவி", voiceDesc: "உங்கள் உலாவியின் குரல் வசதிகளைப் பயன்படுத்துங்கள்.",
    interpreterTitle: "மொழிபெயர்ப்பாளர் உதவி", interpreterDesc: "மருத்துவ ஆலோசனையின்போது மொழிபெயர்ப்பாளர் உதவியைக் கோருங்கள்.",
    start: "மொழிபெயர்ப்பைத் தொடங்கு", patient: "நோயாளர்", doctor: "மருத்துவர்",
    message: "உங்கள் செய்தியை உள்ளிடுங்கள்...", send: "செய்தியை மொழிபெயர்க்கவும்",
    original: "உங்கள் செய்தி", translated: "மொழிபெயர்க்கப்பட்ட செய்தி",
    language: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்", status: "உங்கள் ஆரோக்கியம் முக்கியம்",
    secure: "தனியுரிமையை மதிக்கும் தொடர்பு", choose: "மொழியைத் தேர்ந்தெடுக்கவும்",
    symptom: "உங்கள் அறிகுறிகளை விவரிக்கவும்", mic: "அறிகுறிகளைப் பேசுங்கள்",
    listening: "கேட்கிறது...", stop: "கேட்பதை நிறுத்து", listen: "சத்தமாகப் படிக்கவும்",
    clear: "அழி", ready: "உதவத் தயார்", request: "மொழிபெயர்ப்பாளரைக் கோருங்கள்",
    demo: "செயல்விளக்கம் — மொழிபெயர்க்கப்பட்ட தகவல்களை மருத்துவ நிபுணர் சரிபார்க்க வேண்டும்.",
    languages: "கிடைக்கும் மொழிகள்", online: "செயல்விளக்கம்",
    disclaimer: "இந்தச் செயலி நோயறிதல் அல்லது அவசர மருத்துவ சேவையை வழங்காது."
  },
  Hindi: {
    home: "होम", consultation: "परामर्श", interpreter: "दुभाषिया",
    welcome: "भाषा की बाधाओं के बिना स्वास्थ्य सेवा।",
    subtitle: "अपनी पसंद की भाषा में स्वास्थ्य सेवाओं से जुड़ें।",
    book: "परामर्श शुरू करें", services: "हमारी सेवाएँ",
    translation: "चिकित्सा अनुवाद", translationDesc: "अनुवादित संदेशों के माध्यम से संवाद करें।",
    voice: "आवाज़ सहायता", voiceDesc: "ब्राउज़र की आवाज़ सुविधाओं का उपयोग करें।",
    interpreterTitle: "दुभाषिया सहायता", interpreterDesc: "परामर्श के दौरान दुभाषिए की सहायता माँगें।",
    start: "अनुवाद शुरू करें", patient: "मरीज़", doctor: "डॉक्टर",
    message: "अपना संदेश यहाँ लिखें...", send: "संदेश का अनुवाद करें",
    original: "आपका संदेश", translated: "अनुवादित संदेश",
    language: "अपनी भाषा चुनें", status: "आपका स्वास्थ्य महत्वपूर्ण है",
    secure: "गोपनीयता का ध्यान रखने वाला संचार", choose: "भाषा चुनें",
    symptom: "अपने लक्षण बताएँ", mic: "लक्षण बोलें",
    listening: "सुन रहा है...", stop: "सुनना बंद करें", listen: "ज़ोर से पढ़ें",
    clear: "मिटाएँ", ready: "मदद के लिए तैयार", request: "दुभाषिए का अनुरोध करें",
    demo: "डेमो — अनुवादित जानकारी की चिकित्सकीय जाँच आवश्यक हो सकती है।",
    languages: "उपलब्ध भाषाएँ", online: "ऑनलाइन डेमो",
    disclaimer: "यह ऐप निदान या आपातकालीन चिकित्सा सेवा प्रदान नहीं करता।"
  },
  Spanish: {
    home: "Inicio", consultation: "Consulta", interpreter: "Intérprete",
    welcome: "Atención médica sin barreras lingüísticas.",
    subtitle: "Accede a profesionales de salud en el idioma que mejor comprendas.",
    book: "Iniciar consulta", services: "Nuestros servicios",
    translation: "Traducción médica", translationDesc: "Comunícate mediante mensajes traducidos.",
    voice: "Asistencia por voz", voiceDesc: "Usa las funciones de voz de tu navegador.",
    interpreterTitle: "Asistencia de intérprete", interpreterDesc: "Solicita un intérprete durante tu consulta.",
    start: "Empezar a traducir", patient: "Paciente", doctor: "Médico",
    message: "Escribe tu mensaje aquí...", send: "Traducir mensaje",
    original: "Tu mensaje", translated: "Mensaje traducido",
    language: "Elige tu idioma", status: "Tu salud importa",
    secure: "Comunicación respetuosa con la privacidad", choose: "Seleccionar idioma",
    symptom: "Describe tus síntomas", mic: "Dictar síntomas",
    listening: "Escuchando...", stop: "Dejar de escuchar", listen: "Leer en voz alta",
    clear: "Borrar", ready: "Listo para ayudar", request: "Solicitar un intérprete",
    demo: "Demostración: el texto traducido puede requerir revisión clínica.",
    languages: "Idiomas disponibles", online: "Demo en línea",
    disclaimer: "Esta aplicación no ofrece diagnósticos ni servicios médicos de emergencia."
  },
  French: {
    home: "Accueil", consultation: "Consultation", interpreter: "Interprète",
    welcome: "Des soins sans barrières linguistiques.",
    subtitle: "Accédez aux professionnels de santé dans la langue que vous comprenez le mieux.",
    book: "Commencer la consultation", services: "Nos services",
    translation: "Traduction médicale", translationDesc: "Communiquez grâce aux messages traduits.",
    voice: "Assistance vocale", voiceDesc: "Utilisez les fonctions vocales de votre navigateur.",
    interpreterTitle: "Assistance d'interprète", interpreterDesc: "Demandez un interprète pendant votre consultation.",
    start: "Commencer la traduction", patient: "Patient", doctor: "Médecin",
    message: "Écrivez votre message ici...", send: "Traduire le message",
    original: "Votre message", translated: "Message traduit",
    language: "Choisissez votre langue", status: "Votre santé compte",
    secure: "Communication respectueuse de la confidentialité", choose: "Choisir une langue",
    symptom: "Décrivez vos symptômes", mic: "Dicter les symptômes",
    listening: "Écoute en cours...", stop: "Arrêter l'écoute", listen: "Lire à voix haute",
    clear: "Effacer", ready: "Prêt à vous aider", request: "Demander un interprète",
    demo: "Démo : le texte traduit peut nécessiter une vérification clinique.",
    languages: "Langues disponibles", online: "Démo en ligne",
    disclaimer: "Cette application ne fournit ni diagnostic ni service médical d'urgence."
  }
};

const languageCodes = {
  English: "en-US",
  Tamil: "ta-IN",
  Hindi: "hi-IN",
  Spanish: "es-ES",
  French: "fr-FR"
};

export default function App() {
  const [language, setLanguage] = useState("English");
  const [targetLanguage, setTargetLanguage] = useState("Tamil");
  const [message, setMessage] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [translated, setTranslated] = useState("");
  const [listening, setListening] = useState(false);
  const [activeTab, setActiveTab] = useState("consultation");
  const [interpreterRequested, setInterpreterRequested] = useState(false);
  const [notice, setNotice] = useState("");

  const t = translations[language];

  
async function translateMessage() {
  if (!message.trim()) {
    setNotice("Please enter a message first.");
    return;
  }

  const codes = {
    English: "en",
    Tamil: "ta",
    Hindi: "hi",
    Spanish: "es",
    French: "fr",
  };

  setNotice("Translating...");
  setTranslated("");

  try {
    const response = await fetch("http://localhost:8000/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: message,
        source_language: codes[language],
        target_language: codes[targetLanguage],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.detail || "Translation failed.");
    }

    setTranslated(data.translatedText);
    setNotice(
      "Translation completed. Verify medical wording with a qualified interpreter."
    );
  } catch (error) {
    setNotice(error.message || "Could not connect to the backend.");
  }
}


  function startVoiceInput(field = "message") {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setNotice("Voice input is not supported in this browser. Try Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = languageCodes[language] || "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => {
      setListening(false);
      setNotice("Voice input failed. Please check microphone permissions.");
    };
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      if (field === "symptoms") setSymptoms((old) => old ? old + " " + text : text);
      else setMessage((old) => old ? old + " " + text : text);
    };
    recognition.start();
  }

  

async function readAloud(text) {
  if (!text.trim()) return;

  if (targetLanguage === "Tamil") {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/speak?text=${encodeURIComponent(text)}&lang=ta`
      );

      if (!response.ok) {
        throw new Error("Could not generate Tamil audio");
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      audio.onended = () => URL.revokeObjectURL(audioUrl);
      await audio.play();
    } catch (error) {
      setNotice("Tamil audio failed. Check your backend and internet connection.");
      console.error(error);
    }

    return;
  }

  if (!("speechSynthesis" in window)) {
    setNotice("Text-to-speech is not supported in this browser.");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = languageCodes[targetLanguage] || "en-US";

  window.speechSynthesis.speak(utterance);
}



  function requestInterpreter() {
    setInterpreterRequested(true);
    setNotice("Demo request recorded locally. No interpreter has been contacted.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a href="#home" className="brand" onClick={() => setActiveTab("home")}>
          <span className="brand-icon"><HeartPulse size={25} /></span>
          <span>Care<span className="brand-accent">Bridge</span><small>GLOBAL HEALTHCARE</small></span>
        </a>
        <nav className="desktop-nav">
          <button className={activeTab === "home" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("home")}>{t.home}</button>
          <button className={activeTab === "consultation" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("consultation")}>{t.consultation}</button>
          <button className={activeTab === "interpreter" ? "nav-link active" : "nav-link"} onClick={() => setActiveTab("interpreter")}>{t.interpreter}</button>
        </nav>
        <div className="header-right">
          <span className="online-dot" />
          <span className="online-label">{t.online}</span>
          <label className="language-select">
            <Globe size={17} />
            <select value={language} onChange={(e) => setLanguage(e.target.value)} aria-label={t.language}>
              {Object.keys(translations).map((lang) => <option key={lang}>{lang}</option>)}
            </select>
            <ChevronDown size={14} />
          </label>
        </div>
      </header>

      <main id="home">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> {t.status}</div>
            <h1>{t.welcome}</h1>
            <p>{t.subtitle}</p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={() => setActiveTab("consultation")}>
                <Video size={18} /> {t.book}
              </button>
              <button className="secondary-btn" onClick={() => setActiveTab("interpreter")}>
                <Headphones size={18} /> {t.interpreter}
              </button>
            </div>
            <div className="trust-row">
              <ShieldCheck size={18} />
              <span>{t.secure}</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-circle circle-back" />
            <div className="doctor-illustration">
              <div className="doctor-head"><div className="doctor-hair" /><div className="doctor-face"><span /><span /><i /></div></div>
              <div className="doctor-neck" />
              <div className="doctor-coat"><div className="coat-shirt" /><div className="coat-pocket" /><div className="coat-stethoscope" /></div>
            </div>
            <div className="floating-card patient-card">
              <span className="float-icon"><CheckCircle size={19} /></span>
              <div><strong>{t.ready}</strong><small>CareBridge support</small></div>
            </div>
            <div className="floating-card language-card">
              <span className="language-symbol"><Languages size={21} /></span>
              <div><strong>5 Languages</strong><small>Multilingual support</small></div>
            </div>
            <div className="hero-plus plus-one">+</div>
            <div className="hero-plus plus-two">+</div>
          </div>
        </section>

        <section className="services-section">
          <div className="section-heading">
            <span className="section-kicker">{t.services}</span>
            <h2>Care that speaks your language</h2>
            <p>Tools to make every healthcare conversation easier.</p>
          </div>
          <div className="service-grid">
            <button className="service-card" onClick={() => setActiveTab("consultation")}>
              <span className="service-icon purple"><Languages /></span>
              <h3>{t.translation}</h3><p>{t.translationDesc}</p>
              <span className="card-link">{t.start} ↗</span>
            </button>
            <button className="service-card" onClick={() => startVoiceInput("symptoms")}>
              <span className="service-icon green"><Mic /></span>
              <h3>{t.voice}</h3><p>{t.voiceDesc}</p>
              <span className="card-link">{t.mic} ↗</span>
            </button>
            <button className="service-card" onClick={() => setActiveTab("interpreter")}>
              <span className="service-icon orange"><Headphones /></span>
              <h3>{t.interpreterTitle}</h3><p>{t.interpreterDesc}</p>
              <span className="card-link">{t.request} ↗</span>
            </button>
          </div>
        </section>

        {activeTab === "consultation" && (
          <section className="workspace" id="consultation">
            <div className="workspace-heading">
              <div>
                <span className="section-kicker">COMMUNICATION CENTER</span>
                <h2><MessageCircle size={24} /> {t.consultation}</h2>
              </div>
              <span className="demo-pill"><span /> {t.online}</span>
            </div>
            <div className="workspace-grid">
              <div className="panel translator-panel">
                <div className="panel-title"><Languages size={19} /><h3>{t.translation}</h3></div>
                <p className="panel-desc">Send a message and view a translation preview.</p>
                <div className="language-pair">
                  <label>{t.patient}<select value={language} onChange={(e) => setLanguage(e.target.value)}>{Object.keys(translations).map((l) => <option key={l}>{l}</option>)}</select></label>
                  <span className="swap-icon">→</span>
                  <label>{t.doctor}<select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>{Object.keys(translations).map((l) => <option key={l}>{l}</option>)}</select></label>
                </div>
                <label className="field-label">{t.original}</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder={t.message} rows={4} />
                <div className="input-actions">
                  <button className="small-action" onClick={() => startVoiceInput("message")}><Mic size={16} /> {listening ? t.listening : t.mic}</button>
                  <button className="small-action" onClick={() => readAloud(translated)}></button>
                  <button className="small-action" onClick={() => {setMessage(""); setTranslated(""); setNotice("");}}>{t.clear}</button>
                </div>
                <button className="primary-btn full-btn" onClick={translateMessage}><Send size={17} /> {t.send}</button>
                {translated && <div className="translation-result"><span className="result-label">{t.translated} · {targetLanguage}</span><p>{translated}</p><button className="small-action" onClick={() => readAloud(translated)}><Volume2 size={16} /> {t.listen}</button></div>}
                {notice && <p className="notice">{notice}</p>}
                <p className="demo-note">{t.demo}</p>
              </div>
              <div className="panel symptoms-panel">
                <div className="panel-title"><Stethoscope size={19} /><h3>{t.symptom}</h3></div>
                <p className="panel-desc">Write or speak the symptoms you want to communicate.</p>
                <textarea value={symptoms} onChange={(e) => setSymptoms(e.target.value)} placeholder={t.symptom + "..."} rows={5} />
                <button className="secondary-btn full-btn" onClick={() => startVoiceInput("symptoms")}><Mic size={17} /> {listening ? t.listening : t.mic}</button>
                <button className="primary-btn full-btn" onClick={() => {setMessage(symptoms); setActiveTab("consultation"); document.getElementById("consultation")?.scrollIntoView({behavior:"smooth"});}}><MessageCircle size={17} /> Use in translator</button>
                <div className="safety-note"><ShieldCheck size={19} /><span>Share symptoms with a qualified healthcare professional. This tool does not diagnose conditions.</span></div>
              </div>
            </div>
          </section>
        )}

        {activeTab === "interpreter" && (
          <section className="workspace">
            <div className="workspace-heading"><div><span className="section-kicker">LANGUAGE ACCESS</span><h2><Headphones size={24} /> {t.interpreterTitle}</h2></div></div>
            <div className="panel interpreter-panel">
              <div className="interpreter-illustration"><Headphones size={42} /></div>
              <h3>{t.interpreterDesc}</h3>
              <p>Choose your preferred language and request interpreter assistance. This demo does not contact a real interpreter.</p>
              <div className="language-pair">
                <label>{t.patient}<select value={language} onChange={(e) => setLanguage(e.target.value)}>{Object.keys(translations).map((l) => <option key={l}>{l}</option>)}</select></label>
                <label>{t.doctor}<select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>{Object.keys(translations).map((l) => <option key={l}>{l}</option>)}</select></label>
              </div>
              <button className="primary-btn" onClick={requestInterpreter}><Headphones size={18} /> {t.request}</button>
              {interpreterRequested && <p className="notice"><CheckCircle size={17} /> Demo request recorded locally. No interpreter has been contacted.</p>}
              {notice && <p className="notice">{notice}</p>}
            </div>
          </section>
        )}

        {activeTab === "home" && (
          <section className="workspace home-info">
            <div className="workspace-heading"><div><span className="section-kicker">WELCOME</span><h2><Activity size={24} /> {t.status}</h2></div></div>
            <div className="panel">
              <p>{t.subtitle}</p>
              <p><strong>{t.languages}:</strong> English, Tamil, Hindi, Spanish, French.</p>
              <button className="primary-btn" onClick={() => setActiveTab("consultation")}>{t.book} ↗</button>
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <div className="brand footer-brand"><span className="brand-icon"><HeartPulse size={22} /></span><span>Care<span className="brand-accent">Bridge</span><small>GLOBAL HEALTHCARE</small></span></div>
        <p>{t.disclaimer}</p>
        <span>© 2026 CareBridge · Student project demo</span>
      </footer>
    </div>
  );
}
