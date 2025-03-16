import { Editor } from "./_components/editor";
import { Navbar } from "./_components/navbar";
import { Toolbar } from "./_components/toolbar";

interface DocumentIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentIdPage = async ({ params }: DocumentIdPageProps) => {
  const { documentId } = await params;
  console.log(documentId)

  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 ring-0 z-10 bg-[#FAFBFD] print:hidden w-screen">
        <Navbar />
        <Toolbar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  )
}

export default DocumentIdPage;
