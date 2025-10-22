import Link from 'next/link'
import React from 'react'

type PageHeader = {
    title: string;
    href?: string;
}

export default function PageHeader({ title, href }: PageHeader) {
  return (
    <div className='p-8 bg-zinc-800 rounded-2xl flex items-center justify-between mb-8'>
        <h2 className='font-YekanBakh-Bold text-2xl text-indigo-600'>
            {title}
        </h2>
        {
            href && <Link className='bg-indigo-500 h-12 rounded-2xl px-8 flex items-center justify-center font-YekanBakh-SemiBold' href={href}>افزودن</Link>
        }
    </div>
  )
}
