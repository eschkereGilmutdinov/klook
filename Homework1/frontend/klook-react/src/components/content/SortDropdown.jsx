import { useEffect, useRef, useState } from "react";

export default function SortDropdown({ options, value, onChange }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const selectedOption = options.find((option) => option.value === value) ?? options[0];

    useEffect(() => {
        function handleOutsideClick(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button
                type="button"
                className={`dropdown-header ${isOpen ? "open" : ""}`}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span>{selectedOption.label}</span>
                <svg className="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 9l7 7 7-7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <div className={`dropdown-menu ${isOpen ? "open" : ""}`} role="listbox">
                {options.map((option) => {
                    const isSelected = option.value === value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            className={`dropdown-item ${isSelected ? "selected" : ""}`}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            role="option"
                            aria-selected={isSelected}
                        >
                            <span>{option.label}</span>
                            <span className="check" aria-hidden="true">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M6 12.5l4 4L18.2 8.3"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
