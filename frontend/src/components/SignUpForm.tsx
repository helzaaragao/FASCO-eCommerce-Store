import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { requiredSignUpSchema, type SignUpFormData } from "../schemas/signUpSchema"
import { toast } from "sonner";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { Input } from "./ui/Input";

const toastDuration  = 5000;

export function SignUpForm(){
    const {
        register, 
        handleSubmit, 
        reset, 
        formState: { errors, touchedFields, isSubmitting },
    } = useForm<SignUpFormData>({
        resolver: zodResolver(requiredSignUpSchema),
        //  resolver:"use o Zod para validar tudo"
        mode: 'onBlur',
        // Evita mostrar erros para campos que o usuário ainda nem tocou.
        reValidateMode: 'onChange'
        // o usuário vê o erro sumir conforme corrige, em tempo real. Apôs o primeiro blur que eu coloquei, revalida cada tecla.
    }) 

    const navigate = useNavigate();

    async function handleSignUp(data: SignUpFormData) {
        try {
            await axios.post("http://localhost:7777/users", data);

            toast.success("Cadastro realizado com sucesso!", {
                description: "Realize o seu login",
                duration: toastDuration,
            });
            reset({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                password: "",
            });

            setTimeout(() => {
                navigate("/sign-in");
            }, toastDuration);
        } catch (error) {
            toast.error("Erro ao realizar cadastro", {
                description: "Tente novamente mais tarde.",
            });
            console.error("Error", error);
            // classificação de erros
        }
    }
    return(
        <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-8">
                <Input
                  type="text"
                  placeholder="First Name"
                  error={errors.firstName?.message}
                  touched={touchedFields.firstName}
                  {...register("firstName")}
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  error={errors.lastName?.message}
                  touched={touchedFields.lastName}
                  {...register("lastName")}               
                />
                <Input
                    type="email"
                    placeholder="Email Address"
                    {...register("email")}
                    error={errors.email?.message}
                    touched={touchedFields.email}
                />
                <Input
                    type="text"
                    placeholder="Phone Number"
                    error={errors.phone?.message}
                    touched={touchedFields.phone}
                  {...register("phone")}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                    touched={touchedFields.password}
                    {...register("password")}
                />
                 <Input
                    type="password"
                    placeholder="Password"
                    error={errors.confirmPassword?.message}
                    touched={touchedFields.confirmPassword}
                    {...register("confirmPassword")}
                />
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-3xs cursor-pointer rounded-lg bg-stone-900 p-3 text-sm font-semibold text-stone-50 shadow-md lg:mt-10 lg:w-lg"
              >
                Create Account
              </button>
              <p className="p-4 text-center text-sm">
                Already have a account?{" "}
                <Link to="/sign-in" className="text-blue-600">
                  Login
                </Link>
              </p>
            </div>
          </form>
    )
}