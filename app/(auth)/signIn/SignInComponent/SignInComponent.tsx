"use client";

import { MouseEventHandler, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { authProvider } from '@/services/firebase.config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { SocialButtons } from '@/components/SocialButtons';



const initUser = {
  name: '',
  email: '',
  photo: '',
}
export function SignInPage() {
  const router = useRouter();
  const auth = getAuth();
  const [user, setUser] = useState(initUser);

  const handleGoogleAuth: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    try {
      await authProvider("google");

      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser({
            name: user.displayName || "",
            email: user.email || "",
            photo: user.photoURL || "",
          });
         
          // Redirige a /dashboard cuando el usuario se autentica
          router.push("/Dashboard");

        }
      });
      console.log(user);
    } catch (error) {
      console.log("Error al iniciar sesión:", error);
    }
  };

  return (
    <section >
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <Image
            className="w-35 h-18"
            src="/Logo color.svg"
            alt="logo"
            width={32}
            height={32}
          />
        </Link>
        <div className="w-full bg-white rounded-lg shadow-2xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Inicia sesión
              </h1>
              <p className="text-gray-500 text-xs">
                para iniciar con tracking app
              </p>
            </div>
            <SocialButtons handleSignIn={handleGoogleAuth} />
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">O</span>
              </div>
            </div>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="name@company.com"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  required
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      required
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Recordar
                    </label>
                  </div>
                </div>
                <Link href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Olvidé mi contraseña
                </Link>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-900 dark:hover:to-gray-800 cursor-pointer"
              >
                Iniciar sesión
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                ¿Aún no tienes una cuenta?{" "}
                <Link href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Registrarse
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
