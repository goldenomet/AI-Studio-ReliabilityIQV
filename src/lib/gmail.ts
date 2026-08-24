import { initializeApp, getApps } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase App safely
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);

// Google Auth Provider configured with Gmail scopes
const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.compose');
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');

// In-memory token cache (Do NOT put in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;
let isSigningIn = false;

export interface FormSubmissionPayload {
  name: string;
  email: string;
  service?: string;
  details?: string;
  subject?: string;
}

/**
 * Listen to auth state changes and manage cached token
 */
export const initGmailAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

/**
 * Sign in with Google Popup to obtain Gmail OAuth Access Token
 */
export const signInWithGmail = async (): Promise<{ user: User; accessToken: string }> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    
    if (!credential?.accessToken) {
      throw new Error('Failed to retrieve access token from Google Sign-In.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Gmail OAuth Sign-in error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

/**
 * Retrieve current cached token
 */
export const getGmailAccessToken = (): string | null => {
  return cachedAccessToken;
};

/**
 * Manually set or update cached token
 */
export const setGmailAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

/**
 * Sign out of Google / Firebase Auth
 */
export const logoutGmail = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

/**
 * Send an email directly via the Gmail REST API (users.me.messages.send)
 */
export const sendFormSubmissionViaGmail = async (
  accessToken: string,
  submission: FormSubmissionPayload,
  recipientEmail?: string
) => {
  const targetRecipient = recipientEmail || 'reliabilityiqventures@gmail.com';
  const emailSubject = submission.subject || `[ReliabilityIQ] New Form Submission: ${submission.service || 'General Inquiry'}`;
  
  const bodyText = [
    `NEW FORM SUBMISSION RECEIVED`,
    `----------------------------------------`,
    `Name: ${submission.name}`,
    `Sender Email: ${submission.email}`,
    `Service Stream: ${submission.service || 'N/A'}`,
    `Submitted At: ${new Date().toLocaleString()}`,
    ``,
    `DETAILS / TRANSMISSION PACKET:`,
    `${submission.details || 'No additional details provided.'}`,
    ``,
    `----------------------------------------`,
    `Transmitted via ReliabilityIQ Ventures Gmail Integration.`
  ].join('\n');

  // Format RFC 2822 email string
  const rawEmailString = [
    `To: ${targetRecipient}`,
    `Subject: ${emailSubject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    ``,
    bodyText
  ].join('\r\n');

  // URL-safe base64 encoding (base64url)
  const base64Encoded = btoa(unescape(encodeURIComponent(rawEmailString)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const response = await fetch('https://gmail.googleapis.com/v1/users/me/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      raw: base64Encoded
    })
  });

  if (!response.ok) {
    const errorJson = await response.json();
    throw new Error(errorJson.error?.message || 'Failed to dispatch email via Gmail API');
  }

  return await response.json();
};
