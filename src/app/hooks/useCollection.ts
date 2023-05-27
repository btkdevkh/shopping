import {
  CollectionReference,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore"
import { useEffect, useState } from "react"

const useCollection = (colName: CollectionReference<DocumentData>) => {
  const [documents, setDocuments] = useState<any[] | null>(null)

  const q = query(colName, orderBy("name"))

  useEffect(() => {
    return onSnapshot(q, snapshot => {
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
