import NavHeader from '@/layer/NavHeader';

interface FilterTabsProps {
    currentFilter: string;
    setFilter: (filter: string) => void;
    filters: string[]; // 추가
    title?: string;    // 선택적으로 헤더 타이틀 받을 수 있게
    showBack?: boolean;
  }
  
  const FilterTabs = ({
    currentFilter,
    setFilter,
    filters,
    title = '',
    showBack = false,
  }: FilterTabsProps) => {
    return (
      <div className="flex flex-col gap-2 px-4 pt-4 pb-2">
        {title && <NavHeader title={title} showBack={showBack} />}
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setFilter(filter)}
              className={`px-4 py-1 rounded-full border text-sm ${
                currentFilter === filter
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    );
  };
  
  export default FilterTabs;
  