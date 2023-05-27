"use client"

import { FormEvent, useState } from "react"
import { goodsCollection } from "../firebase/config"
import useDocument from "../hooks/useDocument"

const Form = () => {
  const [good, setGood] = useState("")
  const { addDocument } = useDocument(goodsCollection)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (good === "") return

    await addDocument({
      name: good,
      completed: false,
    })

    setGood("")
  }

  return (
    <form className="flex gap-1 mb-1 mx-auto max-w-lg" onSubmit={handleSubmit}>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        placeholder="What do you want to buy ?"
        value={good}
        onChange={e => setGood(e.target.value)}
      />
      <input
        className="bg-blue-700 hover:bg-blue-900 cursor-pointer  border-gray-300 text-white font-bold py-2 px-4 rounded"
        type="submit"
        value="ADD"
      />
    </form>
  )
}

export default Form
