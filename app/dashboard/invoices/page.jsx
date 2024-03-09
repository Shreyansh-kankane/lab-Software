import { fetchInvoice } from "@/lib/data";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/users/users.module.css";
import Link from "next/link";
import { ITEM_PER_PAGE } from "@/lib/constants";


const InvoicePage = async ({ searchParams }) => {
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;
  const { count, invoices } = await fetchInvoice(q, page);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for invoice..." />
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Invoice ID</td>
            <td>Patient Name</td>
            <td>Total</td>
            <td>Payment Date</td>
            <td>Paid Amount</td>
            <td>Due Amount</td>
            <td>Payment Status</td>
            <td>Printed By</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
              <tr key={invoice.id}>
              <td>{ `${invoice._id}`.slice(-12) }</td>
              <td>{invoice.Patient.Name}</td>
              <td>{invoice.TotalAmount}</td>
              <td>{ invoice.PaymentDate.toString().slice(0,10)}</td>
              <td> ₹ {invoice.PaidAmount}</td>
              <td> ₹ {invoice.DueAmount}</td>
              <td>{invoice.Status}</td>
              <td>{invoice.PrintedBy}</td>
              <td>
                <div className={styles.buttons}>
                  <Link href={`/dashboard/invoices/update/${invoice.id}`}>
                    <button className={`${styles.button} ${styles.addTest}`}>
                      Update
                    </button>
                  </Link>
                  <Link href={`/dashboard/invoices/${invoice.id}`}>
                    <button className={`${styles.button} ${styles.view}`}>
                      View
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

export default InvoicePage;
