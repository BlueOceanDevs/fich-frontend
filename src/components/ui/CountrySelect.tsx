import React, {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { COUNTRIES, countryName } from "@/data/countries";
import {
  Wrapper,
  Control,
  SearchInput,
  SelectedDisplay,
  Popup,
  Option,
  OptionCode,
  EmptyState,
} from "./CountrySelect.styles";

interface Props {
  /** Current ISO 3166-1 alpha-2 code, "" for "Prefer not to say". */
  value: string;
  /** Called with the new code (or "" when the user clears the selection). */
  onChange: (code: string) => void;
  /** Label id, for the clickable <label> → control association. */
  id?: string;
  placeholder?: string;
  $hasError?: boolean;
  disabled?: boolean;
  /** autoComplete hint passed through to the inner input. */
  autoComplete?: string;
}

// Sentinel option at the top of the popup — picking it clears the
// selection. Makes "I changed my mind and don't want to specify" a
// one-click affordance rather than requiring clear-button furniture.
const CLEAR_VALUE = "";
const CLEAR_LABEL = "Prefer not to say";

/**
 * Searchable country combobox. Native <select> elements don't support
 * substring search across an alphabetical ~250-entry list — users end
 * up scrolling or using the single-character jump which is ambiguous
 * for names like "United States" vs "United Kingdom". This component
 * gives them type-to-filter with keyboard nav + click-outside-to-close.
 *
 * Accessibility: implemented as a combobox with a popup listbox per the
 * WAI-ARIA Authoring Practices pattern. Screen readers announce the
 * highlighted option via aria-activedescendant; Enter/Arrow keys work
 * without a mouse.
 */
const CountrySelect: React.FC<Props> = ({
  value,
  onChange,
  id,
  placeholder = "Select a country",
  $hasError,
  disabled,
  autoComplete,
}) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // Stable id prefix for aria-activedescendant — useId ensures two
  // CountrySelect instances on the same page don't collide.
  const listboxId = useId();

  // Filter options by the query. Match on BOTH the country name (primary
  // search axis) and the 2-letter code (users who know ISO codes get to
  // type "GB" instead of "united kingdom"). Empty query → full list.
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COUNTRIES;
    return COUNTRIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().startsWith(q),
    );
  }, [query]);

  // Options list = [Clear, ...filtered]. The clear row is always
  // available so users with a current selection can wipe it without
  // discovering a hidden keyboard shortcut.
  const options = useMemo(
    () => [{ code: CLEAR_VALUE, name: CLEAR_LABEL }, ...filtered],
    [filtered],
  );

  // Keep highlight in range when the filtered list shrinks below it.
  useEffect(() => {
    if (highlight >= options.length) setHighlight(0);
  }, [options.length, highlight]);

  // Close on outside click — standard popup behaviour users expect.
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  // Scroll the highlighted option into view when it moves off-screen via
  // keyboard nav. Without this, arrow keys appear to do nothing below
  // the visible area.
  useEffect(() => {
    if (!open) return;
    const el = popupRef.current?.querySelector<HTMLElement>(
      `[data-idx="${highlight}"]`,
    );
    el?.scrollIntoView({ block: "nearest" });
  }, [highlight, open]);

  const openPopup = useCallback(() => {
    if (disabled) return;
    setOpen(true);
    setHighlight(0);
  }, [disabled]);

  const commit = useCallback(
    (code: string) => {
      onChange(code);
      setOpen(false);
      setQuery("");
      // Return focus to the control so the user can keep typing/tabbing
      // without having to click back in — matches native <select>.
      inputRef.current?.focus();
    },
    [onChange],
  );

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (!open) {
          openPopup();
        } else {
          setHighlight((h) => Math.min(options.length - 1, h + 1));
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlight((h) => Math.max(0, h - 1));
        break;
      case "Enter":
        if (open) {
          e.preventDefault();
          commit(options[highlight]?.code ?? CLEAR_VALUE);
        }
        break;
      case "Escape":
        if (open) {
          e.preventDefault();
          setOpen(false);
          setQuery("");
        }
        break;
      case "Tab":
        // Let the browser handle Tab naturally — just close the popup
        // so it doesn't visually follow the user to the next field.
        setOpen(false);
        setQuery("");
        break;
      default:
        break;
    }
  };

  const selectedName = value ? countryName(value) : "";

  return (
    <Wrapper ref={rootRef}>
      <Control
        $hasError={$hasError}
        $open={open}
        $disabled={disabled}
        onClick={() => {
          if (disabled) return;
          inputRef.current?.focus();
          openPopup();
        }}
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listboxId}
      >
        {/* When the popup is open we show the query text the user is
            typing. When closed we show the selected country name (or a
            placeholder) so the control reads like a read-only label —
            consistent with how <select> looks in its resting state. */}
        {open ? (
          <SearchInput
            ref={inputRef}
            id={id}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setHighlight(0);
              if (!open) setOpen(true);
            }}
            onKeyDown={onKeyDown}
            placeholder={selectedName || placeholder}
            autoComplete={autoComplete}
            disabled={disabled}
            aria-autocomplete="list"
            aria-activedescendant={`${listboxId}-opt-${highlight}`}
          />
        ) : (
          <>
            {/* Hidden input still present in closed state so keyboard
                users can Tab into the control and open it via ArrowDown
                / typing. Visually hidden via zero width, not display:none
                so focus mechanics still work. */}
            <SearchInput
              ref={inputRef}
              id={id}
              value=""
              onChange={(e) => {
                // Typing on the closed control transitions to open and
                // treats the keystroke as the first search character.
                setOpen(true);
                setQuery(e.target.value);
                setHighlight(0);
              }}
              onKeyDown={onKeyDown}
              autoComplete={autoComplete}
              disabled={disabled}
              style={{ width: 0, minWidth: 0 }}
              aria-autocomplete="list"
            />
            <SelectedDisplay $muted={!selectedName}>
              {selectedName || placeholder}
            </SelectedDisplay>
          </>
        )}
      </Control>

      {open && (
        <Popup
          ref={popupRef}
          id={listboxId}
          role="listbox"
          // Prevent the control's click handler from re-firing when the
          // user clicks an option — stopPropagation on mousedown keeps
          // the outside-click detection from treating this as outside.
          onMouseDown={(e) => e.preventDefault()}
        >
          {options.length === 0 ? (
            <EmptyState>No countries match &quot;{query}&quot;</EmptyState>
          ) : (
            options.map((opt, idx) => (
              <Option
                key={opt.code || "__clear__"}
                id={`${listboxId}-opt-${idx}`}
                role="option"
                aria-selected={opt.code === value}
                data-idx={idx}
                $highlighted={idx === highlight}
                $selected={opt.code === value}
                onClick={() => commit(opt.code)}
                onMouseEnter={() => setHighlight(idx)}
              >
                <span>{opt.name}</span>
                {opt.code && <OptionCode>{opt.code}</OptionCode>}
              </Option>
            ))
          )}
        </Popup>
      )}
    </Wrapper>
  );
};

export default CountrySelect;
