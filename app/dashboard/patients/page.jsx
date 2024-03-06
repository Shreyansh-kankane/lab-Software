import { fetchPatients } from "@/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/constants";

const PatientsPage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, patients } = await fetchPatients(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href="/dashboard/patients/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Patient Code</td>
            <td>Patient Name</td>
            <td>Age</td>
            <td>Gender</td>
            <td>Contact No</td>
            <td>Registered By</td>
            <td>Registered On</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.PatientCode}</td>
              <td>{patient.Name}</td>
              <td>{patient.Age}</td>
              <td>{patient.Gender}</td>
              <td>{patient.MobileNo}</td>
              <td>{patient.RegisteredBy}</td>
              <td>{patient.createdAt?.toString().slice(0, 10)}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/patients/${patient.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      Update
                    </button>
                  </Link>
                  <Link
                    href={`/dashboard/patients/addTest/${patient.id}`}
                  >
                    <button className={`${styles.button} ${styles.delete}`}>
                      Add Tests
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

export default PatientsPage;
