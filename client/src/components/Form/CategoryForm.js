import React from 'react'

const CategoryForm=({handlesubmit,value,setValue})=> {

    
    return (
        <>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <input type="text" id='createcategory' className="form-control" placeholder='Enter category' value={value} onChange={(e)=>setValue(e.target.value)}/>
                </div>
                 
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>

    )
}

export default CategoryForm