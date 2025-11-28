import VideoForm from '@/src/components/admin-panel/videos/VideoForm'
import { getShortSessions } from '@/src/lib/storage/sessions'
import React from 'react'

export default async function AddVideoPage() {
  const sessions = await getShortSessions()
  return (
    <VideoForm sessions={sessions} mode='add'/>
  )
}
