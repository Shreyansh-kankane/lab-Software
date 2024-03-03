import { fetchTests } from "@/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

const LabTestPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, tests } = await fetchTests(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a test name.." />
        <Link href="/dashboard/tests/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Test Code</td>
            <td>Test Name</td>
            <td>Lab Name</td>
            <td>Type</td>
            <td>Available</td>
            <td>Status</td>
            <td>Test Rate</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {tests.map((test) => (
            <tr key={test.id}>
              <td>{test.TestCode}</td>
              <td>{test.Name}</td>
              <td>{test.LabName}</td>
              <td>{test.Type}</td>
              <td>{test.Available}</td>
              <td>{
                test.Status == 'Active' ? <span className={styles.active}>Active</span> 
               : <span className={styles.blocked}>Blocked</span>  
              }</td>
              <td>₹ {test.Price}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/users/${test.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Update
                    </button>
                  </Link>
                  <form action="">
                    <input type="hidden" name="id" value={(test.id)} />
                    <button className={`${styles.button} ${styles.delete}`}>
                      Add Tests
                    </button>
                  </form>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination count={count} />
    </div>
  );
};

export default LabTestPage;
