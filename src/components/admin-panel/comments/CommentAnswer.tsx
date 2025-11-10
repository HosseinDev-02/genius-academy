import { Button } from '@/components/ui/button';
import { Comment, CommentWithRelations } from '@/src/lib/type-definition'
import React from 'react'

export default function CommentAnswer({ comment }: { comment: CommentWithRelations }) {
    console.log('comment :', comment);
    const commentAnswerHandler = () => {
        console.log('answer')
    }
  return (
    <div>
        <Button onClick={commentAnswerHandler} size={'sm'} variant='ghost' type='button' className='bg-primary text-xs cursor-pointer'>
            پاسخ
        </Button>
    </div>
  )
}
