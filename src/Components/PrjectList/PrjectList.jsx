import React from 'react'
import { Link } from 'react-router-dom'
import './PrjectList.css'
import Avatar from '../Avatar/Avatar'

export default function PrjectList({ list }) {
    return (
        <div className="project-list">
            {/* Project List That were created */}
            {list.length === 0 && <p>No Projects yet!</p>}
            {
                list.map((doc, key) => (
                    <Link key={key} to={`/project/${doc.id}`}>
                        <h4>{doc.name}</h4>
                        <p>Due by: {doc.dueDate.toDate().toDateString()}</p>
                        <div className="assigned-to">
                            <p><strong>Assigned to:</strong></p>
                            <ul>
                                {
                                    doc.assignedUsersList.map((user, index) => (
                                        <div key={index}>
                                            <Avatar src={user.photoURL} />
                                        </div>
                                    ))
                                }
                            </ul>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}
