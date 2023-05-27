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

  return (
    <>
      {goods && goods.length === 0 && (
        <p className="text-white">Liste de shopping indisponible</p>
      )}
      <div className="flex-col">
        {goods &&
          goods.length > 0 &&
          goods.map((good, idx) => (
            <div
              className="bg-slate-900 mb-2 p-2 flex justify-between items-center rounded"
              key={good.uid}
            >
              <h6>
                <span>{idx + 1}).</span>{" "}
                {good.name.substring(0, 1).toUpperCase()}
                {good.name.substring(1)}
              </h6>
              <div className="flex gap-5 justify-center items-center">
                <input
                  type="checkbox"
                  defaultChecked={good.completed}
                  onChange={e => handleCheckbox(e, good)}
                  style={{
                    cursor: "pointer",
                  }}
                />

                <i
                  className="fa-solid fa-trash-can"
                  style={{ color: "#ff0000", fontSize: 13, cursor: "pointer" }}
                  onClick={e => handleDelete(e, good)}
                />
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default Goods
