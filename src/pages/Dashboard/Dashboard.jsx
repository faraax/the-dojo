import React from 'react'
import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../Components/PrjectList/PrjectList'
import './Dashboard.css'
import ProjectFilter from './ProjectFilter'

export default function Dashboard() {
    const { documents, error } = useCollection('projects')
    return (
        <div>
            <h2 className='page-title'>Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter />}
            {documents && <ProjectList list={documents} />}
        </div>
    )
}
