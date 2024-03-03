import { addHospital } from "@/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddHospital = () => {
  return (
    <div className={styles.container}>
      <form action={addHospital} className={styles.form}>

        <input type="text" placeholder="Hospital Name" name="Name" required />
        <input type="text" placeholder="Address" name="Address" required autoComplete="off" />
        <input type="text" placeholder="Contact No" name="Contact" required  autoComplete="off"
            maxLength={10}
        />
        <input type="email" placeholder="email" name="email" required autoComplete="off"/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddHospital;
