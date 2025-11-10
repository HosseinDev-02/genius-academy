import PageHeader from '@/src/components/admin-panel/PageHeader'
import CategoriesTable from '@/src/components/admin-panel/articles/ArticlesTable'
import CommentsTable from '@/src/components/admin-panel/comments/CommentsTable'
import { getAllComments } from '@/src/lib/actions'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function CommentsPage() {
    const comments = await getAllComments();
    console.log('comments :', comments);
  return (
    <div>
            {/* Page Header */}
            <PageHeader className="!flex" title="نظرات" />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="comments/add-comment"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن نظر</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
            </div>
            <CommentsTable data={comments}/>
        </div>
  )
}
