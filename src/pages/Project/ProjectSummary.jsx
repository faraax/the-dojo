import React from 'react'
import Avatar from '../../Components/Avatar/Avatar'
import './Project.css'


export default function ProjectSummary({ project }) {
    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className='due-date'>Project due by: {project.dueDate.toDate().toDateString()}</p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project assigned to:
                    <div className="assigned-users">
                        {project.assignedUsersList.map((users, index) => (
                            <div key={index}>
                                <Avatar src={users.photoURL} />
                            </div>
                        ))
                        }
                    </div>
                </h4>
            </div>
        </div>
    )
}
