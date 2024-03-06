import { fetchDoctors } from "@/lib/data";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import { ITEM_PER_PAGE } from "@/lib/constants";

const DoctorsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, doctors } = await fetchDoctors(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for doctor..." />
        <Link href="/dashboard/doctors/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Specialist At</td>
            <td>Contact</td>
            <td>Hospital</td>
            <td>Update</td>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
              <tr key={doctor.id}>
              <td>{doctor.Name}</td>
              <td>{doctor.SpecialistAt}</td>
              <td>{doctor.Contact}</td>
              <td>{doctor.Hospital}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/doctors/${doctor.id}`}>
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
      {
        count > ITEM_PER_PAGE && (
          <Pagination count={count} />
        )
      }
    </div>
  );
};

export default DoctorsPage;
