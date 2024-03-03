import { addTest, addTestd } from "@/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";

const AddTest = () => {
  return (
    <div className={styles.container}>
      <form action={addTest} className={styles.form}>
        <input type="text" placeholder="Test Code" name="TestCode" required />
        <input type="text" placeholder="Test Name" name="Name" required autoComplete="off" />
        <input type="text" placeholder="Lab Name" name="LabName" required  autoComplete="off"/>

        <select name="Type"required >
          <option value="Template">Template</option>
          <option value="Free Writing">Free Writing</option>
          <option value="Numeric">Numeric Range</option>
          <option value="Yes/No">yes/no</option>
        </select>

        <select name="Status" id="" required>
            <option value="Active"> Status </option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
        </select>

        <select name="Available" id="" required>
            <option value="Yes">Available </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
        </select>
        
        <input type="number" placeholder="Price in INR" name="Price" required />

        <textarea
          name="NormalRange"
          rows="1"
          placeholder="Normal Value"
          autoComplete="off"
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTest;
