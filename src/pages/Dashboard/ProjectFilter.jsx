

const filterList = ['all', 'mine', 'development', 'design', 'marketing', 'sales']

export default function ProjectFilter({ currentFilter, setCurrentFilter }) {
    const handleClick = (newFilter) => {
        setCurrentFilter(newFilter)
    }
    return (
        <div className='project-filter'>
            <nav>
                <p>Filter by :</p>
                {
                    filterList.map((list, index) => (
                        <button key={index} onClick={() => handleClick(list)} className={currentFilter === list ? 'active' : ''}>
                            {list.charAt(0).toUpperCase() + list.slice(1)}
                        </button>
                    ))
                }
            </nav>
        </div >
    )
}
