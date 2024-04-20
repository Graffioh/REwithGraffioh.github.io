import { useState } from "react";

export default function Item({ item, path, onContentChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const fullPath = path ? `${path}/${item.name}` : item.name;
  
  const isDir = item.children.length !== 0;
  
  return (
    <div className={"border-stone-700 border-l-2 truncate"}>
      <button
        className={`p-1 w-full flex hover:bg-red-800 ${
          isDir ? "border-red-500" : "border-stone-600"
        }`}
        onClick={async () => {
          if (isDir) {
            setIsOpen(!isOpen);
          } else {
            const content = item.content;
            onContentChange(content);
          }
        }}
      >
        <div className="mx-1 font-bold">{isDir && (isOpen ? "v" : ">")}</div>
        {item.name}
      </button>
      {isDir && (
        <div>
          {item.children.map((subitem) => (
            <div key={subitem.id} className="pl-6" hidden={!isOpen}>
              <Item
                item={subitem}
                path={fullPath}
                onContentChange={onContentChange}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}