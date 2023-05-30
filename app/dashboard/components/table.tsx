/* eslint-disable @next/next/no-img-element */

const Table = () => {
    return ( <div className='overflow-x-auto w-full px-4 '>
    <table className='table table-fixed w-full text-center'>
      {/* head */}
      <thead>
        <tr>
          <th>
            <label>
              <input type='checkbox' className='checkbox' />
            </label>
          </th>
          <th>url</th>
          <th>Alias</th>
          <th>views</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        <tr>
          <th>
            <label>
              <input type='checkbox' className='checkbox' />
            </label>
          </th>
          <td>
              <div>
                <div className="inline-block relative w-full whitespace-nowrap overflow-hidden text-ellipsis align-top hover:z-10 hover:w-auto hover:bg-base-200">www.google.comwww.google.comwww.google.comwww.google.comwww.google.comwww.google.comwww.google.comwww.google.comwww.google.comwww.google.com</div>
              </div>
          </td>
          <td>
            <span className='font-bold'>AshEw23</span>
          </td>
          <td>120</td>
        </tr>
      </tbody>
    </table>
  </div>)
}

export default Table