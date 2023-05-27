"use client"

import { FormEvent, useState } from "react"
import { goodsCollection } from "../firebase/config"
import useDocument from "../hooks/useDocument"

const Form = () => {
  const [good, setGood] = useState("")
  const { addDocument } = useDocument(goodsCollection)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await addDocument({
      name: good,
      completed: false,
    })

    setGood("")
  }

  return (
    <form className="flex gap-1 mb-3" onSubmit={handleSubmit}>
      <input
        className="bg-slate-900 border rounded w-full pl-2"
        type="text"
        placeholder="Que voulez vous acheter...?"
        value={good}
        onChange={e => setGood(e.target.value)}
      />
      <input
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        value="Valider"
      />
    </form>
  )
}

export default Form
