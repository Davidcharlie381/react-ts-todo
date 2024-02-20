import { Dispatch, SetStateAction } from "react";

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
}) => {

  return (
    <div className="flex w-full justify-center gap-10 border border-y-0 border-x-0 border-b">
      <div className="flex justify-between relative">
        <span
          className={`top-[37px] bg-blue-500 w-28 absolute ${
            activeTab === "all"
              ? "left-0"
              : activeTab === "active"
              ? "left-28"
              : activeTab === "completed" && "left-56"
          } transition-all duration-300 rounded-sm rounded-tl rounded-tr h-1`}
        />
        <button onClick={() => setActiveTab("all")} className="p-2 w-28">
          All
        </button>
        <button onClick={() => setActiveTab("active")} className="p-2 w-28">
          Active
        </button>
        <button onClick={() => setActiveTab("completed")} className="p-2 w-28">
          Completed
        </button>
      </div>
    </div>
  );
};

export default Tabs;
