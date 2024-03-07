"use client";

import { authenticate } from "@/lib/actions";
import styles from "./loginForm.module.css";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction} className={styles.form}>
      <h1>Login</h1>
      <input type="text" placeholder="Your email" name="Email" />
      <input type="password" placeholder="Your password" name="Password" />
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;
