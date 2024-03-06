
import React from 'react'
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import {addUser} from '@/lib/actions'

export default function AddMembers() {
  return (
    <div className={styles.container}>
      <form action={addUser} className={styles.form}>
        <input type="text" placeholder="Name" name="Name" required />
        <input type="text" placeholder="Contact No" name="Contact" required  autoComplete="off"
            maxLength={10}
        />
        <select name="gender" defaultValue="male" >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="not specified">not specified</option>
          <option value="other">Other</option>
        </select>

        <input type="email" placeholder="Email" name="email" required autoComplete="off"/>
        <input type="text" placeholder='Address' name='address' required/>
        <input type="text" placeholder='Create password' name='password' required  minLength={6}/>
        <select name="Role" id="role" defaultValue="RECEPTIONIST" >
            <option value="ADMIN">ADMIN</option>
            <option value="DOCTOR">DOCTOR</option>
            <option value="RECEPTIONIST">RECEPTIONIST</option>
            <option value="PRO">PRO</option>
            <option value="ASSOCIATE">ASSOCIATE</option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
