import { FaSpinner } from "react-icons/fa";

export default function Loading() {
  return (
    <div className="flex items-center gap-3 text-xl justify-center m-3">
      <FaSpinner className="animate-spin text-2xl" /> Loading...
    </div>
  );
}
