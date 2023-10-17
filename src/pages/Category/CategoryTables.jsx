import { useEffect, useState } from 'react'
import styles from './styles/CategoryTables.module.css'
import { getToken } from '../AxiosHeaders';
import { useAuth } from '../../AuthContext';
import { FlaotingError } from '../GlobalTemplates/FloatingError';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../GlobalTemplates/Empty';

const CategoryTables = () => {
    const {logout} = useAuth()
    const [fetched, setFetched] = useState(false)
    const [err, setErr] = useState(false)

    const [message, setMessage] = useState("Error.")

    const [data,setData] = useState([])
    
    useEffect(() => {
        setFetched(false)
        const url = '/admin/category/'
        getToken(url)
          .then(response => {
            if (response.status === 200) {
                setData(response.data)
                setFetched(true)
            }
          })
          .catch(error => {
            setErr(true)
            if(error.response){
              if(error.response.status===401){
                logout()
              }else{
                setMessage("Unexprected error.")
              }
            }else{
                setMessage("No response received from the server.")
            }
          });

        return () => { 
        };

    }, []);

    return (
        <>
            {err? <FlaotingError err={err} setErr = {setErr} message = {message} />:""}

            <div className={`${styles.CategoryTables} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Category
                </div>
                <div className="btn btn-primary" onClick={() => document.getElementById('newmodal').showModal()}>
                    New Category
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Category</th>
                            <th>Description</th>
                            <th className='text-center'>Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(category=>{
                            return <Row
                                key = {category.id}
                                id = {category.id}
                                title = {category.title}
                                description = {category.description}
                            />
                        })}
                    </tbody>
                    
                </table>
                <div className={`w-[100%] h-[700px] ${fetched?"hidden":""}`}>
                    {<LoadingArea />}
                </div>
                <div className={`w-[100%] h-[700px] ${fetched && data.length<0 ?"":"hidden"}`}>
                    {<EmptyMessage message = {"No category found."}/>}
                </div>
            </div>
            {/* <div className='btnArea flex justify-center flex-wrap p-5 pb-2'>
                <div className="btn btn-primary w-[150px]"> Previous </div>
                <div className="btn btn-primary w-[160px] ml-2"> Next </div>
            </div>
            <div className={`flex justify-center items-center p-2 pb-5 `}>
                <input type="text" placeholder="Page" className={` text-sm p-1 w-[50px] h-[30px] input rounded-none input-bordered`} />
                <div className="px-3 font-light">
                    of {10}
                </div>
                <div className="btn btn-sm btn-primary">Go</div>
            </div> */}
            <NewCategory />
        </>
    )
}

export default CategoryTables

const Row = (props) => {
    const handleEdit = (event) => {
        document.getElementById(`updatemodal${props.id}`).showModal()
    }
    const handleDelete = (event) => {
        document.getElementById(`deletemodal${props.id}`).showModal()
    }
    return (
        <>
            <tr>
                <th>{props.id}</th>
                <td>{props.title}</td>
                <td>{props.description}</td>
                <td className='flex justify-center'>
                    <span onClick={handleEdit} className='btn btn-success w-[150px] btn-sm' >Edit</span>
                    <span onClick={handleDelete} className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                </td>
                <td>
                    <UpdateCategory  id={props.id} title = {props.title} description = {props.description} />
                    <DeleteCategory   id={props.id} />
                </td>
            </tr>

        </>
    )
}


const NewCategory = () => {
    return (
        <>
            <dialog id="newmodal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">ADD A NEW CATEGORY</h3>

                    <div className="categoryInput">
                        <div htmlFor="category" className="my-2 text-xl">Title</div>
                        <input type="text" placeholder="Category Title" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Description</div>
                        <input type="text" placeholder="Description (optional)" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-success mt-2">ADD TO DATABASE</button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}
const UpdateCategory = (props) => {
    const [title,setTitle] = useState(props.title)
    const [description,setDescription] = useState(props.description)
    const handleChange = (e) => {
        setTitle(e.target.value);
      };

    return (
        <>

            <dialog id={`updatemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">UPDATE CATEGORY</h3>
                    <h3 className="font-bold text-lg">ID#:{props.id}</h3>
                    
                    <div className="categoryInput">
                        <div htmlFor="category" className="my-2 text-xl">Title</div>
                        <input onChange={handleChange} value={title} type="text" placeholder="Category Title" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Description</div>
                        <input onChange={e=>setDescription(e.target.value)} value={props.description}type="text" placeholder="Description (optional)" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button className="btn btn-success mt-2 w-[200px]">UPDATE</button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

const DeleteCategory = (props) => {
    const handleDelete = (event)=>{
        // console.log(props.id);
        // event.target.parentElement.parentElement.parentElement.remove()
        console.log(event.target.closest('tr').remove());
    }
    
    return (
        <>
            <dialog id={`deletemodal${props.id}`} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">DELETE CATEGORY</h3>
                    
                    <div className="categoryInput">
                        <div htmlFor="category" className="my-2 text-xl">Title</div>
                        <input value={props.id} disabled type="text" placeholder="Category Title" className="input input-bordered w-full max-w-lg" />
                        <div htmlFor="description" className="my-2 text-xl">Description</div>
                        <input type="text" disabled placeholder="Description (optional)" className="input input-bordered w-full max-w-lg" />
                    </div>

                    <button onClick={handleDelete} className="btn btn-error mt-2 w-[200px]">DELETE</button>

                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}

