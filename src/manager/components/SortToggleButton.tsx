import { HiOutlineMenuAlt2 } from 'react-icons/hi';

const SortToggleButton = ({ sortOrder, onClick }: { sortOrder: string, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium"
  >
    <HiOutlineMenuAlt2 className="w-4 h-4 text-gray-500" />
    {sortOrder === 'recent' ? '최근순' : '오래된순'}
  </button>
);

export default SortToggleButton;