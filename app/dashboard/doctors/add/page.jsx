import { addDoctor } from "@/lib/actions";
import styles from "@/app/ui/dashboard/users/addUser/addUser.module.css";
import { fetchHospitals } from "@/lib/data";

const AddDoctor = async () => {
    const hospitalData = await fetchHospitals();
    const hospitals = hospitalData.hospitals.map((hospital) => hospital.Name);

  return (
    <div className={styles.container}>
      <form action={addDoctor} className={styles.form}>

        <input type="text" placeholder="Doctor Name" name="Name" required autoComplete="off"/>
        <input type="text" placeholder="Specialist At" name="SpecialistAt" required  autoComplete="off"/>
        <input type="text" placeholder="Contact No" name="Contact" required  autoComplete="off"
            maxLength={10}
        />
        <input list="Hospital" placeholder="Hospital" name="Hospital"/>
        <datalist id="Hospital">
            {hospitals.map((hospital) => (
                <option value={hospital} key={hospital} />
            ))}
        </datalist>


        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDoctor;
