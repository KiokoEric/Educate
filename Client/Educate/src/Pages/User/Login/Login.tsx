import * as z from 'zod';
import axios from "axios";
import React from 'react';
import { useSnackbar } from 'notistack';
import { useCookies } from "react-cookie";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import LoginImage from "../../../assets/Login_HomePage.jpg";
import Button from '../../../Components/Common/Button/Button';

interface FormValues {
    Email: string;
    Password: string;
};

const Login: React.FC  = () => {

    const LoginSchema = z.object({
        Email: z.string().min(1, { message: 'Email is required'}),
        Password: z.string().min(1, { message: 'Password is required'}),
    });

    const { enqueueSnackbar } = useSnackbar();
    const [_,setCookie] = useCookies(["auth_token"]);

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(LoginSchema)
    });

    const onLogin : SubmitHandler<FormValues> = async (data) => {
        try {
            const response = await axios.post("https://educate-server-sooty.vercel.app/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                }})  
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            }) 
            console.log(error) 
        }
    }

    // DEMO LOGIN FUNCTION

    const DemoLogin = async (e: any) => {
        e.preventDefault()
        const data = {
            Email : "kiokoerick040@gmail.com" , Password : "Victory2024"
        }
        try {
                const response = await axios.post("https://educate-server-sooty.vercel.app/Users/Login", data)
                setCookie("auth_token", response.data.Token)
                window.localStorage.setItem("UserID", response.data.UserID)
                enqueueSnackbar("Logged in successfully!" , {variant: "success"}) 
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
        } catch (error) { 
            enqueueSnackbar("Login unsuccessful!" , {variant: "error"}) 
            console.log(error) 
        }
    }

return (
    <div className='grid grid-cols-1 gap-5 items-center justify-center mt-1 sm:grid-cols-2'>
        <figure className='hidden sm:block'>
            <img src={LoginImage} alt="" />
        </figure>
        <form method="post" onSubmit={handleSubmit(onLogin)} encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2 m-auto w-11/12'>
            <div className='my-10'>
                <h2 className='text-5xl'>Welcome to <span className='text-green-800'>E</span>ducate</h2>
                <p className='mt-5 text-xl text-center' >Login & start playing</p>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold' htmlFor="Email">Email</label> 
                <input placeholder="Enter Email..." {...register('Email', { required: 'Email is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 lg:w-96' required />
                {errors.Email && <p className="text-center text-red-700">{errors.Email.message}</p>}
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold' htmlFor="Password">Password</label> 
                <input placeholder="Enter Password..." {...register('Password', { required: 'Password is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 lg:w-96' required />
                {errors.Password && <p className="text-center text-red-700">{errors.Password.message}</p>}
            </div>
            <div className='flex gap-5 mt-5'>
                <Button
                    ButtonText='Login'
                    ButtonStyle='bg-Blue cursor-pointer mt-5 text-center text-white px-3 py-1 rounded w-40 hover:bg-black'
                    onClick={handleSubmit(onLogin)}
                />
                <Button
                    ButtonText='Demo Login'
                    ButtonStyle='bg-Blue cursor-pointer mt-5 text-center text-white px-3 py-1 rounded w-40 hover:bg-black'
                    onClick={DemoLogin}
                />
            </div>
        </form>
    </div>
)
}

export default Login
