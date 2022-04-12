import React, { useState } from 'react'
import { timestamp } from '../../firebaseConfig/config'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import Avatar from '../Avatar/Avatar'
import './ProjectComments.css'

export default function ProjectComments({ project }) {
    const [newComments, setNewComments] = useState()
    const { user } = useAuthContext()
    const { updateDocument, response } = useFirestore('projects')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const commentToAdd = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            content: newComments,
            createdAt: timestamp.fromDate(new Date())
        }
        await updateDocument(project.id, {
            comments: [...project.comments, commentToAdd]
        })
        if (!response.error) {
            setNewComments('')
        }
    }
    return (
        <div>
            <h4>Project Comments</h4>
            {project.comments.length === 0 && <p>No Comments to display</p>}
            <ul className='project-comments'>
                {
                    project.comments.length > 0 && project.comments.map((comments, index) => (
                        <li key={index}>
                            <div className="comment-author">
                                <Avatar src={comments.photoURL} />
                                <p>{comments.displayName}</p>
                            </div>
                            <div className="comment-date">
                                <p>date</p>
                            </div>
                            <div className="comment-content">
                                {comments.content}
                            </div>
                        </li>
                    ))
                }
            </ul>
            <form className='add-comments' onSubmit={handleSubmit}>
                {
                    (project.createBy.id === user.uid) ? (
                        <>
                            <label>
                                <span>Add new Comment</span>
                                <textarea
                                    onChange={(e) => setNewComments(e.target.value)}
                                    value={newComments}
                                    required
                                ></textarea>
                            </label>
                            <button className="btn">Add Comment</button>
                        </>
                    ) : (
                        project.assignedUsersList.map((assignedUser, index) => (
                            (assignedUser.id === user.uid) ? (
                                <>
                                    <label key={index}>
                                        <span>Add new Comment</span>
                                        <textarea
                                            onChange={(e) => setNewComments(e.target.value)}
                                            value={newComments}
                                            required
                                        ></textarea>
                                    </label>
                                    <button className="btn">Add Comment</button>
                                </>
                            ) : null
                        ))
                    )
                }
            </form>
        </div>
    )
}
