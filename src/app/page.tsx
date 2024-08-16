"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase";
import { toast } from 'react-toastify';

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): string | null => {
    if (!email) return "Can't be empty";
    return null;
  };

  const validatePassword = (password: string): string | null => {
    if (!password) return "Please check again";
    return null;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    //fm@test.com
    //0987654321
    setIsSubmitting(true);
    const emailError = validateEmail(formState.email);
    const passwordError = validatePassword(formState.password);

    if (emailError || passwordError ) {
      setErrors({
        email: emailError || '',
        password: passwordError || '',
      });
      setIsSubmitting(false);
      return;
    }
    setErrors({});
    try {
      const credential = await signInWithEmailAndPassword(
        getAuth(app),
        formState.email,
        formState.password
      );
      const idToken = await credential.user.getIdToken();

      await fetch("/api/login", {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      router.push("/home");
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error("Invalid details, please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
      <div className="bg-white sm:p-6 p-3 rounded-xl sm:w-[450px] w-[95%]">
        <form onSubmit={handleSubmit}>
          <div className="relative flex flex-col">
            <label className={`${errors.email ? 'text-red' : 'text-dark-grey'} font-normal text-sm mb-1`}>Email Address</label>
            <input 
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formState.email}
              onChange={handleChange}
              className={`p-3 border ${errors.email ? 'border-red' : 'border-[#D9D9D9]'} rounded-lg w-full focus:outline-none focus:border-purple`}
            />
              {errors.email && <p className="text-sm mt-1 text-red-500">{errors.email}</p>}
          </div>

          <div className="relative flex flex-col my-6">
            <label className={`${errors.password ? 'text-red' : 'text-dark-grey'} font-normal text-sm mb-1`}>Password</label>
            <input 
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formState.password}
              onChange={handleChange}
              className={`p-3 border ${errors.password ? 'border-red' : 'border-[#D9D9D9]'} rounded-lg w-full focus:outline-none focus:border-purple`}
            />
            {errors.password && <p className="text-sm mt-1 text-red-500">{errors.password}</p>}
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple text-white p-3 rounded-lg font-normal text-base mb-6 hover:shadow-custom hover:bg-[#BEADFF]"
          >
            {isSubmitting ? "Submitting..." : "Login"}
          </button>

          <p className="text-center font-normal text-base text-[#737373]">Don&apos;t have an account? 
            <Link href="/sign-up" className="text-purple ml-1">Create acoount</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
