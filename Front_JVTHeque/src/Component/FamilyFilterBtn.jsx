import { useState, useRef, useEffect } from "react";

function FamilyFilterBtn({ name, children }) {
  const [open, setOpen] = useState(false);
  const openRef = useRef(null);

  useEffect(() => {
    const closeClickOutside = (event) => {
      if (openRef.current && !openRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", closeClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeClickOutside);
    };
  }, [openRef]);

  const click = () => {
    if (!open) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        className={`btn-filtre ${open && "activeFiltre"}`}
        //ref={openRef}
        onClick={() => {
          click();
        }}
      >
        {name}
      </button>
      {open && children}
    </>
  );
}
export default FamilyFilterBtn;
