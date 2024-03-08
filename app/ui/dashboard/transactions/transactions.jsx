import Image from "next/image";
import styles from "./transactions.module.css";
import { fetchTransaction } from "@/lib/data";

const Transactions = async () => {
  const transactions = await fetchTransaction();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Latest Transactions</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Invoice Id</td>
            <td>Patient Name</td>
            <td>Status</td>
            <td>Total</td>
            <td>Paid Amount</td>
            <td>Due Amount</td>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction._id}>
              <td>{ `${transaction._id}`.slice(-12) }</td>
              <td>{transaction.Patient.Name}</td>
              <td>
                <span className={`${styles.status} ${
                  transaction.Status === "Paid"
                    ? styles.paid
                    : styles.pending
                }`}>{transaction.Status}</span>
              </td>
              <td>{transaction.TotalAmount}</td>
              <td>{transaction.PaidAmount}</td>
              <td>{transaction.DueAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transactions;
