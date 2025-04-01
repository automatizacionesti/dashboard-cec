import React from "react";

interface SocialButtonsProps {
    handleSignIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleFacebookSignIn?: () => void; // Opcional, si deseas manejar el inicio de sesión con Facebook
}

export function SocialButtons({ handleSignIn, handleFacebookSignIn }: SocialButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-4 w-full">
      <button
        onClick={handleSignIn}
        className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Iniciar sesión con Google"
      >
        <svg
          className="h-6 w-6 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-0.5 0 48 48"
        >
          <title>Google-color</title>
          <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g id="Color-" transform="translate(-401.000000, -860.000000)">
              <g id="Google" transform="translate(401.000000, 860.000000)">
                <path
                  d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                  id="Fill-1"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                  id="Fill-2"
                  fill="#EB4335"
                ></path>
                <path
                  d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                  id="Fill-3"
                  fill="#34A853"
                ></path>
                <path
                  d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                  id="Fill-4"
                  fill="#4285F4"
                ></path>
              </g>
            </g>
          </g>
        </svg>
        <span>Google</span>
      </button>

      <button
        onClick={handleFacebookSignIn}
        className="flex-1 flex items-center justify-center bg-white dark:bg-gray-900 border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 dark:text-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        aria-label="Iniciar sesión con Facebook"
      >
        <div className="rounded-full overflow-hidden mr-2">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#1877F2"
          >
            <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.337v21.326C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.762v2.31h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.663V1.337C24 .597 23.403 0 22.675 0z" />
          </svg>
        </div>
        <span>Facebook</span>
      </button>
    </div>
  );
}
