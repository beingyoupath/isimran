import { 
  collection, 
  doc, 
  setDoc, 
  getDocs, 
  query, 
  orderBy, 
  updateDoc 
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';

export interface ChatInquiry {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  question: string;
  userId?: string;
  status: 'pending' | 'reviewed' | 'emailed';
  frequency?: 'daily' | 'weekly';
  createdAt: string;
}

export const CTA_EMAIL = 'beingyoupath@gmail.com';

/**
 * Saves a user inquiry captured via chatbot to Firestore.
 */
export async function saveInquiry(data: {
  name: string;
  email: string;
  whatsapp?: string;
  question: string;
  userId?: string;
  frequency?: 'daily' | 'weekly';
}): Promise<string> {
  const id = 'inq_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const newInquiry: ChatInquiry = {
    id,
    name: data.name.trim().slice(0, 100),
    email: data.email.trim().toLowerCase().slice(0, 150),
    whatsapp: (data.whatsapp || '').trim().slice(0, 40),
    question: data.question.trim().slice(0, 2000),
    userId: data.userId || '',
    status: 'pending',
    frequency: data.frequency || 'daily',
    createdAt: now,
  };

  const path = `inquiries/${id}`;
  try {
    await setDoc(doc(db, 'inquiries', id), newInquiry);
    return id;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    throw error;
  }
}

/**
 * Fetches all inquiries (accessible by administrators).
 */
export async function getInquiries(): Promise<ChatInquiry[]> {
  const path = 'inquiries';
  try {
    const q = query(collection(db, 'inquiries'), orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    const list: ChatInquiry[] = [];
    snapshot.forEach((docSnap) => {
      list.push(docSnap.data() as ChatInquiry);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
    throw error;
  }
}

/**
 * Updates status of an inquiry.
 */
export async function updateInquiryStatus(id: string, status: 'pending' | 'reviewed' | 'emailed'): Promise<void> {
  const path = `inquiries/${id}`;
  try {
    await updateDoc(doc(db, 'inquiries', id), { status });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
    throw error;
  }
}

/**
 * Prepares a formatted email digest mailto link to beingyoupath@gmail.com.
 */
export function buildDigestMailtoUrl(inquiries: ChatInquiry[], type: 'Daily' | 'Weekly' | 'Summary'): string {
  const subject = encodeURIComponent(`Being You Path - ${type} Chatbot Inquiries Digest (${new Date().toLocaleDateString()})`);
  
  let bodyContent = `Hello Imran & Tejaswini,\n\nHere is the latest ${type.toLowerCase()} digest of questions collected from your website visitors:\n\n`;
  
  if (inquiries.length === 0) {
    bodyContent += `No new pending inquiries at this moment.\n`;
  } else {
    inquiries.forEach((item, index) => {
      const dateStr = new Date(item.createdAt).toLocaleString();
      bodyContent += `------------------------------------\n`;
      bodyContent += `#${index + 1} | Visitor: ${item.name}\n`;
      bodyContent += `Email: ${item.email}\n`;
      if (item.whatsapp) {
        bodyContent += `WhatsApp: ${item.whatsapp}\n`;
      }
      bodyContent += `Date Received: ${dateStr}\n`;
      if (item.frequency) {
        bodyContent += `Schedule Preference: ${item.frequency}\n`;
      }
      bodyContent += `Question / Inquiry:\n"${item.question}"\n\n`;
    });
  }

  bodyContent += `------------------------------------\n`;
  bodyContent += `Being You Path Wellness Concierge`;

  return `mailto:${CTA_EMAIL}?subject=${subject}&body=${encodeURIComponent(bodyContent)}`;
}
