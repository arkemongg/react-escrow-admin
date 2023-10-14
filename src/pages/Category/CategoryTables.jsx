import styles from './styles/CategoryTables.module.css'

const CategoryTables = () => {
    return (
        <>
            <div className={`${styles.CategoryTables} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Category
                </div>
                <div className="btn btn-primary">
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
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>Hart Hagerty</td>
                            <td>Hart Hagerty</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>

                            </td>

                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>Hart Hagerty</td>
                            <td>Hart Hagerty</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                            </td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>Brice Swyre</td>
                            <td>Brice Swyre</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>

                            </td>
                        </tr>
                        {/* row 4 */}
                        <tr>
                            <th>4</th>
                            <td>Brice Swyre</td>
                            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, omnis!</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                            </td>
                        </tr>
                        {/* row 5 */}
                        <tr>
                            <th>5</th>
                            <td>Brice Swyre</td>
                            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, omnis!</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                            </td>
                        </tr>
                        {/* row 6 */}
                        <tr>
                            <th>6</th>
                            <td>Brice Swyre</td>
                            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, omnis!</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                            </td>
                        </tr>
                        {/* row 7 */}
                        <tr>
                            <th>7</th>
                            <td>Brice Swyre</td>
                            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, omnis!</td>
                            <td className='flex justify-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                            </td>
                        </tr>
                        {/* row 8 */}
                        <tr>
                            <th>8</th>
                            <td>Brice Swyre</td>
                            <td>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quaerat, omnis!</td>
                            <td className='flex justify-center items-center'>
                                <span className='btn btn-success w-[150px] btn-sm' >Edit</span>
                                <span className='btn btn-error w-[150px] btn-sm ml-2' >delete</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className='btnArea flex justify-center flex-wrap p-5 pb-2'>
                <div className="btn btn-primary w-[150px]"> Previous </div>
                <div className="btn btn-primary w-[160px] ml-2"> Next </div>
            </div>
            <div className={`flex justify-center items-center p-2 pb-5 `}>
                    <input type="text" placeholder="Page" className={` text-sm p-1 w-[50px] h-[30px] input rounded-none input-bordered`} /> 
                    <div className="px-3 font-light">
                         of {10}
                    </div>
                    <div  className="btn btn-sm btn-primary">Go</div>
            </div>
        </>
    )
}

export default CategoryTables