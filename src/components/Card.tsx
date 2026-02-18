import type { ReactNode } from 'react'

interface CardProps {
    children: ReactNode
    className?: string
}

const Card = ({ children, className = '' }: CardProps) => {
    return (
        <div className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 ${className}`}>
            {children}
        </div>
    )
}

export default Card
