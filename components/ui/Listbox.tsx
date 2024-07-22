interface ListboxProps {
    items: string[];
    onSelect: (item: string) => void;
  }
  
  const Listbox = ({ items, onSelect }: ListboxProps) => (
    <ul className="absolute bg-white border border-gray-300 rounded w-full mt-1 max-h-60 overflow-auto">
      {items.map((item) => (
        <li
          key={item}
          onClick={() => onSelect(item)}
          className="p-2 cursor-pointer hover:bg-gray-100"
        >
          {item}
        </li>
      ))}
    </ul>
  );
  
  export default Listbox;
  