type TSectionHeader = {
    children: React.ReactNode
}

export default function SectionHeader({children}: TSectionHeader) {
    return (
        <div className='bg-gradient-to-l from-secondary to-background rounded-2xl flex items-center justify-between p-2.5 sm:p-5'>
            {
                children
            }
        </div>
    )
}