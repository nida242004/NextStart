import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_QUERY_BY_ID } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
import markdownit from 'markdown-it';

export const experimental_ppt = true;


const md = markdownit();

const page = async ({ params } : { params: Promise<{ id: string }>}) => {
  const id = (await params).id;
  console.log({ id });
  const post = await client.fetch(STARTUP_QUERY_BY_ID, { id });
  if(!post) return notFound();
  const parsedContent = md.render(post?.pitch || "");

  return (
  <>
    <section className='pink_container !min-h-[230px]'>
      <p className='tag'>
        {formatDate(post._createdAt)}
      </p>
      <h1 className='heading'>
        {post.title}
      </h1>
      <p className='sub-heading !max-w-5xl'>
        {post.description}
      </p>
    </section>

    <section className='section_container'>
      <img className='w-full h-auto rounded-xl' src={post.image ?? ''} alt="thumbnail" />
      <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
        <div className='flex-between gap-5'>
          <Link href={`/user/${post.author?._id}`} 
          className='flex gap-2 items-center mb-3'>
            <Image src={post.author?.image ?? ''} alt='avatar' width={64} height={64} className='rounded-full drop-shadow-lg aspect-square object-cover'/>
            <div>
              <p className='text-20-medium'>
                {post.author?.name}
              </p>
              <p className='text-16-medium !text-black-300'>
                @{post.author?.username}
              </p>
            </div>
          </Link>
          <p className='category-tag'>{post.category}</p>
        </div>
        <h3 className='text-30-bold'>Pitch Details</h3>
        {parsedContent ? (
          <article className='prose max-w-4xl font-work-sans' dangerouslySetInnerHTML={{ __html: parsedContent }} />
        ) : (
          <p className='no-result'>No pitch details available</p>
        )}
      </div>

        <hr className='divider'/>

    </section>

  </>
  );
};

export default page;