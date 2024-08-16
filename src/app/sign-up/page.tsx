"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../../firebase";
import { toast } from 'react-toastify';

interface FormState {
  email: string;
  password: string;
  confirmation: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  confirmation?: string;
}

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const router = useRouter();
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    confirmation: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string): string | null => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return "Can't be empty";
    if (!emailPattern.test(email)) return 'Invalid email address';
    return null;
  };

  const validatePassword = (password: string, confirmation: string): string | null => {
    if (!password) return "Can't be empty";
    if (password.length < 8) return 'Password too short';
    if (confirmation !== password) return 'Please check again';
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
    setIsSubmitting(true);
    const emailError = validateEmail(formState.email);
    const passwordError = validatePassword(formState.password, formState.confirmation);

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
      await createUserWithEmailAndPassword(getAuth(app), formState.email, formState.password);
      router.push("/");
      toast.success("Account created successfully!");
    } catch (error) {
      // console.error(error);
      toast.error("Error signing up, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-[#FAFAFA]">
        <div className="bg-white sm:p-6 p-3 rounded-xl sm:w-[450px] w-[95%]">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className={`${errors.email ? 'text-red' : 'text-dark-grey'} font-normal text-sm mb-1`}>Email Address</label>
              <input 
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formState.email}
                onChange={handleChange}
                className={`p-3 border ${errors.email ? 'border-red-500' : 'border-[#D9D9D9]'} rounded-lg w-full focus:outline-none focus:border-purple`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="flex flex-col my-6">
              <label className={`${errors.password ? 'text-red' : 'text-dark-grey'} font-normal text-sm mb-1`}>Password</label>
              <input 
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formState.password}
                onChange={handleChange}
                className={`p-3 border ${errors.password ? 'border-red' : 'border-[#D9D9D9]'} rounded-lg w-full focus:outline-none focus:border-purple`}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>

            <div className="flex flex-col my-6">
              <label className="text-[#333] font-normal text-sm mb-1">Confirm password</label>
              <input 
                type="password"
                name="confirmation"
                placeholder="Confirm password"
                value={formState.confirmation}
                onChange={handleChange}
                className="p-3 border border-[#D9D9D9] rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom"
              />
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-purple text-white p-3 rounded-lg font-normal text-base mb-6 hover:shadow-custom hover:bg-[#BEADFF]"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            <p className="text-center font-normal text-base text-[#737373]">Already have an account? 
              <Link href="/" className="text-purple ml-1">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
