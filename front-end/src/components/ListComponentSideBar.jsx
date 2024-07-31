import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TABS } from "../data/tabs";
import { useGetCurrentTab } from "../hooks/useGetCurrentTab";

export function ListComponentSideBar() {
  const [activeTab, setActiveTab] = useGetCurrentTab(TABS);

  return (
    <div className="flex flex-col">
      {TABS.map((tab) => (
        <Link to={tab.path} key={tab.id}>
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={` relative min-w-full px-3 py-3 text-lg font-thin transition focus-visible:outline-2 flex justify-start items-center `}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="bubble"
                className={`absolute inset-0 z-10  mix-blend-multiply bg-zinc-200`}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <img src={tab.img} className="inline-block max-w-[1.2rem] mr-5" />
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
