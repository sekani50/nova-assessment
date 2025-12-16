import * as React from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  searchable?: boolean;
  modalClassName?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  ({
    options,
    value,
    onValueChange,
    placeholder = "Select an option",
    className,
    disabled,
    modalClassName,
    searchable = false,
  }) => {
    const [open, setOpen] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const buttonRef = React.useRef<HTMLButtonElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const selectedOption = options.find((opt) => opt.value === value);

    const filteredOptions =
      searchable && searchTerm
        ? options.filter(
            (opt) =>
              opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
              opt.value.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : options;

    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setOpen(false);
        }
      };
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);

    return (
      <div className="relative" ref={containerRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => !disabled && setOpen(!open)}
          disabled={disabled}
          className={cn(
            "flex h-12 w-full items-center justify-between rounded-3xl border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#013941] focus:ring-offset-0 focus:border-[#013941] disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
        >
          <span className="flex items-center gap-2 min-w-0">
            {selectedOption?.icon && (
              <span className="shrink-0 flex items-center">
                {selectedOption.icon}
              </span>
            )}
            <span className="truncate">
              {selectedOption ? selectedOption.label : placeholder}
            </span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 opacity-50 transition-transform",
              open && "rotate-180"
            )}
          />
        </button>
        {open && (
          <div
            className={cn(
              "absolute z-50 mt-1 w-full rounded-3xl border border-gray-200 bg-white shadow-lg",
              modalClassName
            )}
          >
            <div className="p-1">
              {searchable && (
                <div className="relative px-2 py-1.5 mb-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-2 py-1.5 text-sm rounded-md border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              )}
              {filteredOptions.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground text-center">
                  No results found
                </div>
              ) : (
                filteredOptions.map((option) => (
                  <div
                    key={option.value}
                    onClick={() => {
                      onValueChange?.(option.value);
                      setOpen(false);
                      setSearchTerm("");
                    }}
                    className={cn(
                      "relative flex cursor-pointer select-none items-center rounded-md px-2 py-2 text-sm outline-none hover:bg-gray-100",
                      value === option.value && "bg-gray-100"
                    )}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {option.icon && (
                        <span className="shrink-0 flex items-center">
                          {option.icon}
                        </span>
                      )}
                      <span className="truncate">{option.label}</span>
                    </span>
                    {value === option.value && (
                      <Check className="ml-auto h-4 w-4" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
);
Select.displayName = "Select";

export { Select };
