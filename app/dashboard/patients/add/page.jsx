import styles from "@/app/ui/dashboard/users/singleUser/singleUser.module.css";
import {fetchHospitalName,fetchDoctorName,fetchAssociateName,fetchPROName } from "@/lib/data";
import {addPatient } from "@/lib/actions";
// import { centers } from "@/lib/constants";

const SingleUserPage = async () => {

  const hospitals = await fetchHospitalName();
  const doctors = await fetchDoctorName();
  const associates = await fetchAssociateName();
  const pros = await fetchPROName();

  const centers = ['center1','center2','center3'];

  return (

    <div className={styles.wrapper}>

      <div className={styles.container}>

        <div className={styles.formContainer}>
          <form action={addPatient} className={styles.form}>
            <label>Name</label>
            <input type="text" name="Name" placeholder="patient-name" />

            <label>Gender</label>
            <select name="Gender" id="">
              <option value="NA">NA</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>

            <label>Age</label>
            <input type="number" name="Age" placeholder={ 'patient-age' } />

            <label>Email</label>
            <input type="email" name="Email" placeholder={ 'patient-email' }  />

            <label>Mobile No</label>
            <input type="text" name="MobileNo" placeholder={ '+1234567890' } />

            <label>Patient Address</label>
            <textarea type="text" name="Address" placeholder={'patient-address' }/>

            <label>Center</label>
            <input list="centers" name="Center" placeholder="Center" disabled={centers.length==0}/>
            <datalist id="centers">
              {centers.map((center,index) => (
                <option key={center} value={center}/>
              ))}
            </datalist>

            <label>PRO</label>
            <input list="pro" name="PRO" placeholder="PRO" disabled={pros.length === 0} />
            <datalist id="pro">
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

            <button>Add Patient</button>

          </form>
        </div>
        
      </div>

    </div>
  );
};

export default SingleUserPage;

