'use client';
import parse from 'html-react-parser';
import { useState } from 'react';

import { processHtmlContent } from '@/utils/process-html-content';

import styles from './VideoDescription.module.scss';

export function VideoDescription({ description }: { description: string }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { isShouldShowToggle, initialContent } = processHtmlContent(description, 3);

  return (
    <div className='relative mb-4'>
      <article className={styles.article}>
        {parse(isExpanded ? description : initialContent)}
      </article>

      {isShouldShowToggle && (
        <button
          onClick={() => setIsExpanded((prev) => !prev)}
          className='cursor-pointer text-gray-400 uppercase transition-colors hover:text-gray-200'
          aria-expanded={isExpanded}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
