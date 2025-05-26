interface RequestTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[]; // 🔥 추가
}

const RequestTabs = ({ activeTab, setActiveTab, tabs }: RequestTabsProps) => {
  return (
    <div className="flex px-4 border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`flex-1 py-3 text-sm font-medium ${
            activeTab === tab
              ? 'text-indigo-600 border-b-2 border-indigo-600 font-bold'
              : 'text-gray-500'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default RequestTabs;