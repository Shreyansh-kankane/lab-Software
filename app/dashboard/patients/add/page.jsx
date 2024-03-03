import { addPatient } from "@/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddUserPage = () => {
  return (
    <div className={styles.container}>
      <form action={addPatient} className={styles.form}>
        <input type="text" placeholder="Patient Name" name="Name" required autoComplete="off" />
        <input type="number" placeholder="Age" name="Age" required  autoComplete="off"/>

        <select name="Gender" defaultValue="male" >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="not specified">not specified</option>
          <option value="other">Other</option>
        </select>
       
        <input type="text" placeholder="Mobile No" name="MobileNo" required autoComplete="off" maxLength="10" />
        
        <textarea
          name="Address"
          id="address"
          rows="1"
          placeholder="Address"
          autoComplete="off"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
