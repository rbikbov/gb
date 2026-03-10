import { SearchInput } from "@/shared/ui";
import { useMemo, useState } from "react";
import { debounce } from "@/shared/lib/debounce";

export function UsersSearch({
  className,
  value,
  onChange,
}: {
  className?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [searchQuery, setSearchQuery] = useState(value || '');

  const debouncedOnChange = useMemo(() => debounce((newValue: string) => {
    onChange(newValue);
  }, 1000), [onChange]);

  return (
    <SearchInput
      className={className}
      value={searchQuery}
      onChange={(newValue) => {
        setSearchQuery(newValue);
        debouncedOnChange(newValue);
      }}
    />
  );
}
