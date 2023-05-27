import {
  CollectionReference,
  DocumentData,
  onSnapshot,
} from "firebase/firestore"
import { useEffect, useState } from "react"

const useCollection = (colName: CollectionReference<DocumentData>) => {
  const [documents, setDocuments] = useState<any[] | null>(null)

  useEffect(() => {
    return onSnapshot(colName, snapshot => {
      const data: any[] = []
      snapshot.forEach(doc => {
        data.push({
          ...doc.data(),
          uid: doc.id,
        })
      })
      setDocuments(data)
    })
  }, [colName])

  return { documents }
}

export default useCollection
