"use client"
import styles from "@/app/ui/login/loginForm/loginForm.module.css";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  
  const [error, setError] = useState(null);
  
  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) =>{

    const {Email,Password} = formData;

    console.log(formData);

    try{
      const response = await signIn("credentials",{redirect:false,Email,Password});
      if(response.error){
        setError(response.error);
      }
      if(response.ok){
        router.push("/dashboard");
      }
    }
    catch(error){
      console.log(error);
    }

  }

  return (
    <div className={styles.container}>
      <form action={handleSubmit} className={styles.form}>
        <h1>Login</h1>
        <input type="text" placeholder="Your email" name="Email" onChange={handleChange} autoComplete="username"/>
        <input type="password" placeholder="Your password" name="Password" onChange={handleChange} autoComplete="current-password" />
        <button 
          type="submit"
        >Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
