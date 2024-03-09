import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import { fetchPatientById,fetchHospitalName,fetchDoctorName,fetchAssociateName,fetchPROName } from "@/lib/data";
import { updatePatient } from "@/lib/actions";

const SingleUserPage = async ({ params }) => {
  const { id } = params;
  const patient = await fetchPatientById(id);
  const hospitals = await fetchHospitalName();
  const doctors = await fetchDoctorName();
  const associates = await fetchAssociateName();
  const pros = await fetchPROName();

  return (

    <div className={styles.wrapper}>
      <div className={styles.formContainer}>
        <h2> Patient Details </h2>
        <div className={styles.container}>
          <p> Name: {patient.Name} </p>
          <p> Gender: {patient.Gender} </p>
          <p> Age: {patient.Age} </p>
        </div>

      </div>

      <div className={styles.container}>

        <div className={styles.formContainer}>
          <form action={updatePatient} className={styles.form}>
            <input type="hidden" name="_id" value={id}/>
            <label>Email</label>
            <input type="email" name="Email" placeholder={patient.Email || 'patient-email' }  />

            <label>Mobile No</label>
            <input type="text" name="MobileNo" placeholder={patient.MobileNo || '+1234567890' } />

            <label>Patient Address</label>
            <textarea type="text" name="Address" placeholder={patient.Address || 'patient-address' }/>

            <label>Center</label>
            <input list="centers" name="Center" placeholder="Center" disabled/>

            <label>PRO</label>
            <input list="pros" name="PRO" placeholder="PRO" disabled={pros.length === 0} />
            <datalist>
              {pros.map((pro) => (
                <option value={pro.Name} key={pro._id}>
                  {pro.Name} ({pro._id.toString()})
                </option>
              ))}
            </datalist>

            <label>Hospital</label>
            <input list="hospitals" name="Hospital" placeholder="Hospital" />
            <datalist id="hospitals">
              {hospitals.map((hospital) => (
                <option key={hospital._id}>
                  {hospital.Name} ({hospital._id.toString()})
                </option>
              ))}
            </datalist>

            <label>Doctor</label>
            <input list="doctors" name="Doctor" placeholder="Doctor" disabled={doctors.length == 0}/>
            <datalist id="doctors">
              {doctors.map((doctor) => (
                <option key={doctor._id}>
                  {doctor.Name} ({doctor._id.toString()})
                </option>
              ))}
            </datalist>


            <label>Assosciate</label>
            <input list="associates" name="Associate" placeholder="Associate" disabled={ associates.length === 0 } />
            <datalist id="associates">
              {associates.map((associate) => (
                <option value={associate.Name} key={associate._id}>
                  {associate.Name} ({associate._id.toString()})
                </option> 
              ))}
            </datalist>

            <label>Refer Type</label>
            <select name="ReferType" id="">
              <option value="Self">Self</option>
              <option value="Associate">Associate</option>
              <option value="Hospital">Hospital</option>
              <option value="Doctor">Doctor</option>
            </select>

            <button>Update</button>

          </form>
        </div>
        
      </div>

    </div>
  );
};

export default SingleUserPage;
