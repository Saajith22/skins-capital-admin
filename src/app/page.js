import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";

export default function Home() {
  return (
    <>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />
          <div className="flex flex-col gap-5 mx-4 my-4">
            <h1 className="text-center">Welcome to Dashboard</h1>
            <Widgets />
          </div>
        </div>
      </div>
    </>
  );
}
