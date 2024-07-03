// services/helpSupportService.js
import { db } from 'Config';
import { collection, addDoc, getDocs, query } from 'firebase/firestore';

// Reference to the help&support collection
const helpSupportCollection = collection(db, 'help&support');

// Function to add a support query
export const addSupportQuery = async (topic, description, uid) => {
  try {
    const docRef = await addDoc(helpSupportCollection, {
      topic,
      description,
      uid,
      created_at: new Date(),
    });
    return docRef;
  } catch (error) {
    console.error('Error adding support query:', error);
    throw error;
  }
};

// Function to get all support queries
export const getSupportQueries = async () => {
  try {
    const q = query(helpSupportCollection);
    const querySnapshot = await getDocs(q);
    const queries = [];
    querySnapshot.forEach((doc) => {
      queries.push({ id: doc.id, ...doc.data() });
    });
    return queries;
  } catch (error) {
    console.error('Error getting support queries:', error);
    throw error;
  }
};
