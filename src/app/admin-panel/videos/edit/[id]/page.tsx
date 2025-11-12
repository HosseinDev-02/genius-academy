import React from 'react'

export default async function EditVideoPage(context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params
    console.log('video id : ', id);
  return (
    <div>EditVideoPage</div>
  )
}
