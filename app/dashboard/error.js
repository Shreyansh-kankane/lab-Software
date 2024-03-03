'use client'
 
import { useEffect } from 'react'
import styles from '@/app/ui/error/error.module.css'
import Image from 'next/image'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className={styles.container}>

        <Image 
            src={'/error.jpg'}
            alt="error"
            width={400}
            height={400}
            className={styles.image}
        />

        <div className={styles.errorContainer}>
            <h2>Something went wrong!</h2>
            <button
                onClick={
                () => reset()
                }
            >
                Try again
            </button>

        </div>
    </div>
  )
}