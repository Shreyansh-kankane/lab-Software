import { fetchHospitals } from "@/lib/data";
// import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";

const HospitalPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, hospitals } = await fetchHospitals(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for hospital..." />
        <Link href="/dashboard/hospitals/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Address</td>
            <td>Contact</td>
            <td>email</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {hospitals.map((hospital) => (
              <tr key={hospital.id}>
              <td>{hospital.Name}</td>
              <td>{hospital.Address}</td>
              <td>{hospital.Contact}</td>
              <td>{hospital.email}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/hospitals/${hospital.id}`}>
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
      {/* <Pagination count={count} /> */}
    </div>
  );
};

export default HospitalPage;
