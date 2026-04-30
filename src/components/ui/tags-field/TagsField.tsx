import cn from 'clsx';
import { type ChangeEvent, type KeyboardEvent, useId, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface TagsFieldProps {
  label: string;
  placeholder?: string;
  error?: string;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  className?: string;
}

export function TagsField({
  label,
  placeholder = 'Enter tags:',
  error,
  tags = [],
  onTagsChange,
  className,
}: TagsFieldProps) {
  const [inputValue, setInputValue] = useState<string>('');

  const id = useId();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ',' || e.key === 'Enter') {
      e.preventDefault();
      addTag(inputValue.trim());
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      e.preventDefault();
      removeTag(tags[tags.length - 1].trim());
    }
  };

  const addTag = (tag: string) => {
    if (tag && !tags.includes(tag)) {
      const newTags = [...tags, tag];
      setInputValue('');
      onTagsChange(newTags);
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    onTagsChange(newTags);
  };

  return (
    <div className={twMerge('mb-4', className)}>
      <label
        htmlFor={id}
        className='mb-2 block font-semibold text-gray-400'
      >
        {label}
      </label>

      <div
        className={cn(
          `flex w-full flex-wrap gap-2 rounded border bg-transparent px-3 py-2 shadow-sm
          transition-colors focus-within:border-gray-500`,
          error ? 'border-red-500' : 'border-border'
        )}
      >
        {tags.map((tag) => (
          <div
            key={tag}
            className='flex items-center rounded bg-gray-700 px-2 py-1 text-white'
          >
            <span>{tag}</span>
            <button
              type='button'
              onClick={() => {
                removeTag(tag.trim());
              }}
              className='ml-2 cursor-pointer text-gray-400 hover:text-gray-200'
            >
              &times;
            </button>
          </div>
        ))}

        <input
          id={id}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className='grow bg-transparent text-white outline-none'
        />
      </div>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
}
