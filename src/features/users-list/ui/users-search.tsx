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
  const [localSearchQuery, setLocalSearchQuery] = useState(value || '');
  const [prevSearchQuery, setPrevSearchQuery] = useState(value || '');

  if (value !== prevSearchQuery) {
    setLocalSearchQuery(value);
    setPrevSearchQuery(value);
  }

  const debouncedOnChange = useMemo(() => debounce((newValue: string) => {
    onChange(newValue);
  }, 1000), [onChange]);

  return (
    <SearchInput
      className={className}
      value={localSearchQuery}
      onChange={(newValue) => {
        setLocalSearchQuery(newValue);
        debouncedOnChange(newValue);
      }}
    />
  );
}
