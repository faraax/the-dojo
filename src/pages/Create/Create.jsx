import { useEffect, useState } from 'react'
import './Create.css'
import Select from 'react-select'
import { useCollection } from '../../hooks/useCollection'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore'
import { timestamp } from '../../firebaseConfig/config'
import { useNavigate } from 'react-router-dom'

const categories = [
  { value: 'development', label: 'Development' },
  { value: 'design', label: 'Design' },
  { value: 'sales', label: 'Sales' },
  { value: 'marketing', label: 'Marketing' },
]

export default function Create() {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  const [users, setUsers] = useState([])
  const [formError, setFormError] = useState(null)
  const { documents } = useCollection('users')
  const { user } = useAuthContext()
  const { addDocument, response } = useFirestore('projects')
  const history = useNavigate()


  // console.log(documents)

  useEffect(() => {
    if (documents) {
      const options = documents.map(user => {
        return { value: user, label: user.displayName }
      })
      setUsers(options)
    }
  }, [documents])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError(null)
    if (!category) {
      setFormError('Please select project categories')
      return
    }
    if (assignedUsers.length < 1) {
      setFormError('Please assign project to altest one user')
      return
    }

    const createBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid

    }

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
    })

    const project = {
      name,
      details,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createBy,
      assignedUsersList
    }

    await addDocument(project);

    if (!response.error) {
      history('/')
    } else {
      console.log(response.error);
    }

  }


  return (
    <div className="create-form">
      <h2 className='className="page-title"'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Projectg Name</span>
          <input type="text" name='project name' required onChange={(e) => setName(e.target.value)} value={name} />
        </label>
        <label>
          <span>Projectg Details</span>
          <textarea type="text" name='project details' required onChange={(e) => setDetails(e.target.value)} value={details} />
        </label>
        <label>
          <span>Set Due Date</span>
          <input type="date" name='project due date' required onChange={(e) => setDueDate(e.target.value)} value={dueDate} />
        </label>
        <label>
          <span>Project Category: </span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label>
          <span>Assigned to: </span>
          <Select
            options={users}
            onChange={(option => setAssignedUsers(option))}
            isMulti={true}
          />
        </label>
        <button className='btn'>Add Project</button>
        {
          formError && <p className='error'>{formError}</p>
        }
      </form>
    </div>
  )
}
