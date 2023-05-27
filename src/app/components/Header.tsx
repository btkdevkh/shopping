import Form from "./Form"

const Header = () => {
  return (
    <header className="w-full bg-slate-800 p-2 sticky top-0">
      <h1 className="bg-blue-800 rounded p-2 text-center mb-1 mx-auto max-w-lg">
        SHOPPING TIME
      </h1>
      <Form />
    </header>
  )
}

export default Header
