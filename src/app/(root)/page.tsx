import EditorPannel from "./_components/EditorPannel"
import Header from "./_components/Header"
import OutputPannel from './_components/OutputPannel'

const page = () => {

  return (
    <div className="min-h-screen">
        <div className="max-w-[1800px] mx-auto p-4 py-1">
            <Header />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-10">
                <EditorPannel />
                <OutputPannel />
            </div>
        </div>
    </div>
  )
}

export default page