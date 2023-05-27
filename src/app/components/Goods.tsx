"use client"

import { ChangeEvent, MouseEvent } from "react"
import useCollection from "../hooks/useCollection"
import { goodsCollection } from "../firebase/config"
import useDocument from "../hooks/useDocument"
import Good from "../models/Good"

const Goods = () => {
  const { documents: goods } = useCollection(goodsCollection)
  const { updateDocument, deleteDocument } = useDocument(goodsCollection)

  const handleCheckbox = async (
    e: ChangeEvent<HTMLInputElement>,
    good: Good
  ) => {
    const data: Good = {
      uid: good.uid,
      name: good.name,
      completed: e.target.checked,
    }
    await updateDocument(data)
  }

  const handleDelete = async (e: MouseEvent, good: Good) => {
    e.preventDefault()
    await deleteDocument(good)
  }

  const handleDeleteAllGoods = async (e: MouseEvent, allCompleted: boolean) => {
    e.preventDefault()

    if (allCompleted) {
      if (confirm("Are you sur to delete all done goods ?")) {
        goods?.forEach(async good => {
          await deleteDocument(good)
        })
      }
    }
  }

  const goodsCompleted = goods?.every(g => g.completed)

  return (
    <>
      {goods && goods.length === 0 && (
        <p className="text-gray-500 text-center uppercase text-sm">
          Please add goods to buy !
        </p>
      )}

      <div className="flex-col pt-1">
        {goods &&
          goods.length > 0 &&
          goods.map((good, idx) => (
            <div
              className="bg-slate-900 p-2 flex justify-between mb-2 items-center rounded"
              key={good.uid}
            >
              <h6>
                <span>{idx + 1}).</span>{" "}
                <span className={`${good.completed ? "line-through" : ""}`}>
                  {good.name.substring(0, 1).toUpperCase()}
                  {good.name.substring(1)}
                </span>
              </h6>
              <div className="flex gap-5 justify-center items-center">
                <input
                  className="cursor-pointer"
                  type="checkbox"
                  defaultChecked={good.completed}
                  onChange={e => handleCheckbox(e, good)}
                />

                <i
                  className="fa-solid fa-trash-can text-red-700 cursor-pointer text-sm"
                  onClick={e => handleDelete(e, good)}
                />
              </div>
            </div>
          ))}
      </div>
      {goodsCompleted && goodsCompleted && goods && goods.length > 0 && (
        <p className="text-white text-center bg-blue-800 p-2 text-sm rounded flex gap-3 justify-center">
          <span>DONE !</span>{" "}
          <i
            className="fa-solid fa-eraser text-red-700 cursor-pointer text-lg"
            onClick={e => handleDeleteAllGoods(e, goodsCompleted)}
          />
        </p>
      )}
    </>
  )
}

export default Goods
