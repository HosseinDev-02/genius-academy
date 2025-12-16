export const revalidate = 10;

import PageHeader from '@/src/components/admin-panel/PageHeader';
import SessionsTable from '@/src/components/admin-panel/sessions/SessionsTable';
import { getAllSessions } from '@/src/lib/storage/sessions';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function SessionsPage() {
    const sessions = await getAllSessions();
    return (
        <div dir='rtl'>
            {/* Page Header */}
            <PageHeader />
            {/* Page Content */}
            <div className="h-full overflow-hidden">
                <Link
                    href="sessions/add"
                    className="col-span-1 inline-flex items-center justify-center gap-2 text-sm h-10 px-3 rounded transition-colors duration-300 bg-teal-800 hover:bg-teal-600 font-YekanBakh-SemiBold text-white cursor-pointer mb-3"
                >
                    <span>افزودن سرفصل</span>
                    <Plus strokeWidth={"2.5px"} size={16} />
                </Link>
                <SessionsTable data={sessions}/>
            </div>
        </div>
    );
}
