import React from 'react'
import { useNavigate } from 'react-router-dom'
import Avatar from '../../Components/Avatar/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import './Project.css'


export default function ProjectSummary({ project }) {
    const { deleteDocument, response } = useFirestore('projects')
    const { user } = useAuthContext()
    const history = useNavigate()
    const handleDelete = (e) => {
        e.preventDefault()
        deleteDocument(project.id)
        if (!response.error) {
            history('/')
        }
    }
    return (
        <div>
            <div className="project-summary">
                <h2 className="page-title">{project.name}</h2>
                <p className='due-date'>Project due by: {project.dueDate.toDate().toDateString()}</p>
                <p className="details">
                    {project.details}
                </p>
                <h4>Project assigned to:</h4>
                <div className="assigned-users">
                    {project.assignedUsersList.map((users, index) => (
                        <div key={index}>
                            <Avatar src={users.photoURL} />
                        </div>
                    ))
                    }
                </div>
                {
                    project.createBy.id === user.uid && <button className="btn" onClick={handleDelete}>Mark as complete</button>
                }
            </div>
        </div>
    )
}
