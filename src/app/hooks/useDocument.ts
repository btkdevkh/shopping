import {
  CollectionReference,
  DocumentData,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
} from "firebase/firestore"
import { firestore } from "../firebase/config"

const useDocument = (colName: CollectionReference<DocumentData>) => {
  const addDocument = async (data: any) => {
    try {
      await addDoc(colName, data)
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const updateDocument = async (data: any) => {
    try {
      await setDoc(doc(firestore, "goods", data.uid), data, { merge: true })
    } catch (error: any) {
      console.log(error.message)
    }
  }

  const deleteDocument = async (data: any) => {
    try {
      await deleteDoc(doc(firestore, "goods", data.uid))
    } catch (error: any) {
      console.log(error.message)
    }
  }

  return { addDocument, updateDocument, deleteDocument }
}

export default useDocument
