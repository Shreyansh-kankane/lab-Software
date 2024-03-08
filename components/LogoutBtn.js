"use client"
import React from 'react'
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

function LogoutBtn({styles}) {
  return (
    <button className={styles}
        onClick={() => signOut()}
    >
        <MdLogout />
        Logout
    </button>
  )

}

export default LogoutBtn