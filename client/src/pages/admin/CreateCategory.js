import React, { useEffect, useState } from 'react'
import Header from '../../components/layouts/Header'
import Footer from '../../components/layouts/Footer'
import AdminMenu from '../../components/layouts/AdminMenu'
import toast from 'react-hot-toast'
import axios from "axios"
import { Modal } from "antd";
import CategoryForm from '../../components/Form/CategoryForm'




const CreateCategory = () => {
  const [categories, setCategories] = useState([]);

  const [selected,setSelected]=useState(false);
  const [updated,setUpdated]=useState("");

  const [visible,setVisible]=useState(false)

  const [name, setName] = useState("")

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
      if (data?.success) {
        toast.success(`${name} is created successfully!`)
        getAllCategory();
        setName("")
      }
      else {
        toast.error("Product not created failed!")
      }

    } catch (error) {
      console.log(error)
      toast.error("Something went wrong in input form")
    }
  }

  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/category/categories')
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error)
      toast.error("something went wrong in getting categoires")
    }
  }

  useEffect(() => {
    getAllCategory();
  }, [])

//update category using form
const handleupdated=async(e)=>{
  e.preventDefault()
  try {
    const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,{name:updated})
    if(data.success){
      toast.success("Updated succcessfully!")
      setSelected(null)
      setUpdated(null)
      setVisible(false)
      getAllCategory();
    }
    else{
      toast.error("Updated failed!")
    }
  } catch (error) {
    toast.error("something went wrong in updating category!")
  }
}

const handledelete=async(id)=>{
  
  try {
    const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${id}`)
    if(data.success){
      toast.success("deleted succcessfully!")
      getAllCategory();
    }
    else{
      toast.error("deleted failed!")
    }
  } catch (error) {
    toast.error("something went wrong in deleting category!")
  }
}




  return (
    <>
      <Header />
      <div className="row m-3">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3>Manage Categories</h3>
          <div className="p-3 w-50">
            <CategoryForm handlesubmit={handlesubmit} value={name} setValue={setName} />
          </div>
          <div className="w-75">
            <table className="table">
              <thead>
                <tr>

                  <th scope="col">Name</th>
                  <th scope="col">Action</th>

                </tr>
              </thead>
              <tbody>
                {categories?.map(c => (
                  <tr key={c._id}>
                    <>
                      <td>{c.name}</td>
                      <td className='btn btn-primary m-1' onClick={()=>{setVisible(true);setSelected(c); setUpdated(c.name)} }>Edit</td>
                      <td className='btn btn-danger m-1' onClick={()=>handledelete(c._id)}>Delete</td>
                    </>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>

          <Modal onCancel={()=>setVisible(false)} className='m-2' visible={visible} footer={null}>
            <CategoryForm value={updated} setValue={setUpdated} handlesubmit={handleupdated}/>
          </Modal>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default CreateCategory