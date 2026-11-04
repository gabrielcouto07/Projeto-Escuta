// Conecta o site ao projeto criado no console do Firebase.
// As chaves ficam no arquivo .env.local (fora do GitHub).
//
// O Authentication NÃO é carregado aqui: só a área da ouvidoria usa login,
// então ele fica em firebaseAuth.js e só é baixado por quem entra nela.
import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';

export const usandoEmuladores = import.meta.env.VITE_USE_EMULATORS === 'true';

// O .env.example vem com "cole-aqui" nos campos: conta como não preenchido
const chave = (valor) => (valor && valor !== 'cole-aqui' ? valor : undefined);
const projectId = chave(import.meta.env.VITE_FIREBASE_PROJECT_ID);

const firebaseConfig =
  usandoEmuladores && !projectId
    ? // Projetos "demo-" funcionam só com os emuladores, sem conta no Google
      { apiKey: 'demo', projectId: 'demo-escuta', authDomain: 'demo-escuta.firebaseapp.com' }
    : {
        apiKey: chave(import.meta.env.VITE_FIREBASE_API_KEY),
        authDomain: chave(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
        projectId,
        storageBucket: chave(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
        messagingSenderId: chave(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
        appId: chave(import.meta.env.VITE_FIREBASE_APP_ID),
      };

export const firebaseConfigurado = Boolean(firebaseConfig.projectId);

// Sem configuração o site ainda abre e mostra um aviso (ver LayoutPublico.jsx),
// em vez de quebrar com tela branca.
export const app = initializeApp(
  firebaseConfigurado ? firebaseConfig : { ...firebaseConfig, projectId: 'nao-configurado' },
);

// Feedback 2: App Check com reCAPTCHA v3 barra envio em massa por robôs.
// Depois de testar, ative a "aplicação obrigatória" no console do Firebase.
const chaveRecaptcha = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
if (chaveRecaptcha && !usandoEmuladores) {
  if (import.meta.env.DEV) {
    // Em localhost o console mostra um token de depuração para cadastrar
    self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
  }
  initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider(chaveRecaptcha),
    isTokenAutoRefreshEnabled: true,
  });
}

// Cache só em memória (padrão): nada das denúncias fica gravado no
// navegador, o que importa em computadores compartilhados.
export const db = getFirestore(app);

if (usandoEmuladores) {
  connectFirestoreEmulator(db, '127.0.0.1', 8080);
}
