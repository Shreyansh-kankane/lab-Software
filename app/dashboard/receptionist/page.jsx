import React from 'react'
import styles from "@/app/ui/dashboard/members/members.module.css"
import { ROLES } from '@/lib/constants'
import { fetchUser } from '@/lib/data'
import Search from '@/app/ui/dashboard/search/search'
import Link from 'next/link'

async function MembersPage ({searchParams}) {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, users } = await fetchUser('RECEPTIONIST', q, page);
  
  return (
    <div className={styles.container}>

      <div className={styles.top}>
        <Search placeholder="Search for hospital..." />
        <Link href="/dashboard/addMembers">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>

        {/* <select name="Role" id="role" defaultValue={'RECEPTIONIST'} >
          { Object.keys(ROLES).map((role,index) => {
            return <option key={index} value={ROLES[role]}>{ROLES[role]}</option>
          })}
        </select> */}
        
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Address</td>
            <td>Contact</td>
            <td>Email</td>
            <td>Update</td>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
              <tr key={user.id}>
              <td>{user.Name}</td>
              <td>{user.address}</td>
              <td>{user.Contact}</td>
              <td>{user.email}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${user.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Update
                    </button>
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


export default MembersPage;