import Goods from "@/app/components/Goods"
import Header from "@/app/components/Header"

export default function Home() {
  return (
    <>
      <Header />
      <main className="container mx-auto p-2 max-w-lg">
        <Goods />
      </main>
    </>
  )
}
