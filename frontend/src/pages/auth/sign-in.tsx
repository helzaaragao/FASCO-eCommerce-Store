export function SignIn(){
    return(
        <div className="p-8">
           <picture>
                <img className="w-full h-9/10" src="src/assets/signIn.jpg" alt="" />
           </picture>
           <section className="p-4">
                <h1 className="mt-4 font-volkhov text-3xl text-gray-700">FASCO</h1>
                <div className="mt-4">
                    <h2 className="font-volkhov text-xl">Sign In To FASCO</h2>
                    <div className="mt-4 flex flex-col gap-4">
                    <button className="border-1 border-blue-600 rounded-lg h-14 flex items-center justify-center gap-4 text-sm">
                        <svg className= "size-6"  viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                        <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"/><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"/><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"/><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"/>
                        </svg>
                        Sign up with Google
                    </button>
                    <button className="border-1 border-blue-600 rounded-lg h-14 flex items-center justify-center gap-4 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg"
                        aria-label="Gmail" role="img"
                        className= "size-8"
                        viewBox="0 0 512 512"><rect
                        rx="15%"
                        fill="#ffffff"/><path d="M158 391v-142l-82-63V361q0 30 30 30" fill="#4285f4"/><path d="M 154 248l102 77l102-77v-98l-102 77l-102-77" fill="#ea4335"/><path d="M354 391v-142l82-63V361q0 30-30 30" fill="#34a853"/><path d="M76 188l82 63v-98l-30-23c-27-21-52 0-52 26" fill="#c5221f"/><path d="M436 188l-82 63v-98l30-23c27-21 52 0 52 26" fill="#fbbc04"/></svg>
                        Sign up with email
                    </button>
                    </div>
                </div>
                <div className="mt-10 flex flex-col gap-8">
                    <div className="flex items-center justify-center gap-2">
                        <hr className="w-5 border-2 border-gray-500" />
                        <h3 className="text-gray-500 font-bold text-center text-lg"> OR </h3>
                         <hr className="w-5 border-2 border-gray-500"/>
                    </div>
                    
                    <form action="" className="flex flex-col gap-3 p-2">
                        <div>
                            <input type="email" placeholder="Email" 
                            className="mb-2"/>
                            <hr className="border-gray-400"/>
                        </div>
                       <div className="mb-4">
                            <input type="password" placeholder="Password" className="mb-2" />
                            <hr className="border-gray-400"/>
                       </div>
                        
                        <button className="bg-stone-900 text-stone-50 p-3 rounded-lg text-sm">Sign In</button>
                        <button className="border-1 border-blue-600 rounded-lg p-3 text-sm text-blue-600">Register Now</button>
                        <p className="text-blue-600 font-semibold text-sm text-right">Forget Password?</p>
                    </form>
                </div>
                <p className="mt-10 text-right text-sm">FASCO Terms & Codnitions</p>
           </section>
        </div>
    )
}