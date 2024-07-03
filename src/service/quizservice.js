import { db } from 'Config';
import { collection, addDoc } from 'firebase/firestore';

// Reference to the quiz collection
const quizCollection = collection(db, 'quiz');

// Function to add a quiz question
export const addQuizQuestion = async (question) => {
  try {
    const docRef = await addDoc(quizCollection, {
      question,
      options:'',
      comment: "",
      like: 0,
      uid:'',
      createdAt: new Date()
    });
    return docRef;
  } catch (error) {
    console.error('Error adding quiz question:', error);
    throw error;
  }
};
