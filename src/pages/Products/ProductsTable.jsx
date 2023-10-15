import styles from './styles/ProductsTable.module.css'

const ProductsTable = () => {
    return (
        <>
            <div className={`${styles.ProductsTable} flex justify-between items-center px-3`}>
                <div className="text-2xl">
                    Products
                </div>
            </div>
            <div className={`${styles.ProductsTable} flex items-center px-3 bg-[#F2F2F2]`}>
                <input type="text" placeholder="USERNAME / PRODUCTS ID" className="input input-bordered rounded-none w-full max-w-lg" />
                <div className="btn btn-success rounded-none  ml-2 w-[100px]">
                    Search
                </div>
            </div>
            <div className={`${styles.ProductsTable} flex items-center px-3`}>
                <select className="select select-bordered rounded-none w-full max-w-lg">
                    <option disabled selected>Filter</option>
                    <option>FEATURED</option>
                    <option>NOT_FEATURED</option>
                </select>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th className='min-w-[250px]'>PRODUCT TITLE</th>
                            <th >DESCRIPTION</th>
                            <th>PRODUCT IMG</th>
                            <th>INVENTORY</th>
                            <th>PRICE</th>
                            <th>SELLER USERNAME</th>
                            <th>SALES</th>
                            <th>VIEW COUNT</th>
                            <th>FEATURED</th>
                            <th>CREATED AT</th>
                            <th className='min-w-[370px]'>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
                        <Row />
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
                <div className="btn btn-sm btn-primary">Go</div>
            </div>
        </>
    )
}

export default ProductsTable

const Row = (props) => {
    return (
        <>
            <tr>
                <th>8</th>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis culpa consectetur vitae? Beatae, laborum voluptate repellat ad dolores voluptatum perspiciatis!</td>
                <td title={"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptate, voluptates fugit dolorum corrupti at eius iusto maiores, quasi ducimus nam itaque odit laborum, alias provident! Impedit iure nostrum iste laboriosam dicta aspernatur vero illum praesentium ab culpa libero ipsa soluta, ea sequi optio eius quo aperiam obcaecati velit quam!"} className='whitespace-nowrap max-w-[250px] overflow-hidden'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex voluptate, voluptates fugit dolorum corrupti at eius iusto maiores, quasi ducimus nam itaque odit laborum, alias provident! Impedit iure nostrum iste laboriosam dicta aspernatur vero illum praesentium ab culpa libero ipsa soluta, ea sequi optio eius quo aperiam obcaecati velit quam!</td>
                <td>
                    <img className='w-[80px] h-[80px] border-2 rounded-lg' src="./dashboard/test.jpg" alt="" />
                </td>
                <td>100000</td>
                <td>10000.00</td>
                <td>SELLER USERNAME</td>
                <td>1000000</td>
                <td>1000</td>
                <td>YES</td>
                <td>12/10/20</td>
                <td>
                    <span className='btn btn-success w-[170px] btn-sm' >MAKE THIS FEATURED</span>
                    <span className='btn btn-error w-[160px] ml-2 btn-sm' >DELIST</span>
                </td>
            </tr>
        </>
    )
}


