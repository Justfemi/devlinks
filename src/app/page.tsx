"use client"
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logo from "../../public/images/logo.svg";
import logoText from "../../public/images/devlink.svg";
import lock from "../../public/images/padlock.svg";
import envelope from "../../public/images/mail.svg";
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
      <div>
        <div className="flex items-center justify-center gap-1 mb-[50px]">
          <div className="w-7 h-7">
            <Image 
              src={logo}
              alt="devlink logo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-25 h-4">
            <Image
              src={logoText}
              alt="devlink"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="bg-white sm:p-10 p-6 rounded-xl">
          <h3 className="text-[#333] font-bold text-[32px] mb-2">Login</h3>
          <p className="text-[#737373] font-normal text-base mb-4">Add your details below to get back into the app</p>
          <form onSubmit={handleSubmit}>
            <div className="relative flex flex-col">
              <label className={`${errors.email ? 'text-red' : 'text-dark-grey'} font-normal text-xs mb-1`}>Email Address</label>
              <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                <Image 
                  src={envelope}
                  alt="envelope icon for email"
                />
              </div>
              <input 
                type="email"
                name="email"
                placeholder="e.g. alex@email.com"
                value={formState.email}
                onChange={handleChange}
                className={`pl-9 pr-4 py-3 border ${errors.email ? 'border-red' : 'border-[#D9D9D9]'} rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom`}
              />
               {errors.email && <p className="absolute right-3 bottom-1/4 transform -translate-y-1/6 text-red">{errors.email}</p>}
            </div>

            <div className="relative flex flex-col my-6">
              <label className={`${errors.password ? 'text-red' : 'text-dark-grey'} font-normal text-xs mb-1`}>Password</label>
              <div className="absolute bottom-1/4 transform -translate-y-1/6 left-0 pl-3 flex items-center pointer-events-none">
                <Image 
                  src={lock}
                  alt="lock icon for password"
                />
              </div>
              <input 
                type="password"
                name="password"
                placeholder="At least 8 characters"
                value={formState.password}
                onChange={handleChange}
                className={`pl-9 pr-4 py-3 border ${errors.password ? 'border-red' : 'border-[#D9D9D9]'} rounded-lg w-full focus:outline-none focus:border-purple focus:shadow-custom`}
              />
              {errors.password && <p className="absolute right-3 bottom-1/4 transform -translate-y-1/6 text-red">{errors.password}</p>}
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
    </div>
  );
}
