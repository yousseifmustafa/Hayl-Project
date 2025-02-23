import { BsDownload } from "react-icons/bs";

export default function ActionButtons() {
  return (
    <div className="flex gap-3">
      <button className="border rounded-xl px-6 py-2 flex items-center gap-2">
        <BsDownload /> Export CSV
      </button>
    </div>
  );
}
