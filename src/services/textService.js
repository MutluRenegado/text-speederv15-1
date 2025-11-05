// src/services/textService.js

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 🔹 Reference to Firestore collection
const textsCollection = collection(db, "texts");

/**
 * Create a new text document
 * @param {Object} textData - { title, content, difficulty, category, author, wordCount, language }
 */
export async function createText(textData) {
  try {
    const newTextRef = await addDoc(textsCollection, {
      ...textData,
      createdAt: new Date(),
    });
    return newTextRef.id;
  } catch (error) {
    console.error("❌ Error creating text:", error);
    throw error;
  }
}

/**
 * Get a single text by ID
 * @param {string} textId
 */
export async function getTextById(textId) {
  try {
    const textDoc = await getDoc(doc(db, "texts", textId));
    if (textDoc.exists()) {
      return { id: textDoc.id, ...textDoc.data() };
    } else {
      console.warn(`⚠️ Text not found: ${textId}`);
      return null;
    }
  } catch (error) {
    console.error("❌ Error fetching text:", error);
    throw error;
  }
}

/**
 * Get all texts (optionally filtered)
 * @param {Object} filters - { category, difficulty, language }
 */
export async function getAllTexts(filters = {}) {
  try {
    const constraints = [];

    if (filters.category) {
      constraints.push(where("category", "==", filters.category));
    }
    if (filters.difficulty) {
      constraints.push(where("difficulty", "==", filters.difficulty));
    }
    if (filters.language) {
      constraints.push(where("language", "==", filters.language));
    }

    // Sort by creation date
    constraints.push(orderBy("createdAt", "desc"));

    const q = constraints.length > 0 ? query(textsCollection, ...constraints) : query(textsCollection);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.error("❌ Error fetching texts:", error);
    throw error;
  }
}

/**
 * Update a text document
 * @param {string} textId
 * @param {Object} updates - fields to update
 */
export async function updateText(textId, updates) {
  try {
    await updateDoc(doc(db, "texts", textId), updates);
    console.log(`✅ Updated text: ${textId}`);
  } catch (error) {
    console.error("❌ Error updating text:", error);
    throw error;
  }
}

/**
 * Delete a text document
 * @param {string} textId
 */
export async function deleteText(textId) {
  try {
    await deleteDoc(doc(db, "texts", textId));
    console.log(`🗑️ Deleted text: ${textId}`);
  } catch (error) {
    console.error("❌ Error deleting text:", error);
    throw error;
  }
}

