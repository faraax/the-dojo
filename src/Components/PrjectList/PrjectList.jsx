import React from 'react'
import './PrjectList.css'

export default function PrjectList({ list }) {
    return (
        <div>
            {/* Project List That were created */}
            {list.length === 0 && <p>No Projects yet!</p>}
            {
                list.map((doc, key) => (
                    <div key={key}>
                        {doc.name}
                    </div>
                ))
            }
        </div>
    )
}
