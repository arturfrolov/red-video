'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { Heading } from '@/ui/heading/Heading';
import { VerifiedBadge } from '@/ui/verified-badge/VerifiedBadge';

import { PAGE } from '@/config/public-page.config';

import { transformDate } from '@/utils/transform-date';

import { getInitials } from '@/app/(public)/v/[publicId]/comments/get-initials';
import type { ISingleVideoResponse } from '@/types/video.types';

const DynamicCommentActions = dynamic(
  () =>
    import('@/app/(public)/v/[publicId]/comments/CommentActions').then((mod) => mod.CommentActions),
  { ssr: false }
);

interface Props {
  comment: ISingleVideoResponse['comments'][0];
  refetch: () => void;
}

export function CommentItem({ comment, refetch }: Props) {
  const [text, setText] = useState(comment.text);

  return (
    <div className='flex items-start gap-3.5 border-b border-b-border/50 py-5 last:border-none'>
      {comment.user?.channel ? (
        <Link href={PAGE.CHANNEL(comment.user.channel?.slug || '')}>
          <Image
            src={comment.user.channel?.avatarUrl || ''}
            alt={comment.user.name || 'Avatar'}
            width={40}
            height={40}
            className='shrink-0 rounded-md shadow'
          />
        </Link>
      ) : (
        <div
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-gray-200
            text-xl font-medium text-gray-800 shadow'
        >
          {getInitials(comment.user.name || 'Anonym')}
        </div>
      )}
      <div className='w-full'>
        <div className='mb-3 flex items-center gap-2'>
          <Heading
            className='mb-0'
            classNameHeading='text-base'
          >
            <span className='flex items-center gap-2 truncate'>
              {comment.user.name}
              {comment.user.channel?.isVerified && <VerifiedBadge size={14} />}
            </span>
          </Heading>

          <div className='text-xs text-gray-500'>{transformDate(comment.createdAt)}</div>
        </div>

        <div>
          <textarea
            className='field-sizing-content w-full resize-none border border-transparent
              bg-transparent text-sm leading-snug text-gray-300 outline-none focus:border-border'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <DynamicCommentActions
          comment={comment}
          refetch={refetch}
          newText={text}
        />
      </div>
    </div>
  );
}
