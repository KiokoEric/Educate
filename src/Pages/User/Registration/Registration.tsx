import * as z from 'zod';
import axios from "axios";
import React from 'react';
import { useSnackbar } from 'notistack';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from '../../../Components/Common/Button/Button';
import RegistrationImage from "../../../assets/Registration_HomePage.jpg";

const Registration:React.FC = () => {
    interface FormValues {
        Name: string;
        Email: string;
        Password: string;
    };

    const RegistrationSchema = z.object({
        Name: z.string().min(1, { message: 'Name is required'}),
        Email: z.string().email({ message: "Invalid email address" }),
        Password: z.string().min(1, { message: 'Password is required'})
    });

    const { enqueueSnackbar } = useSnackbar();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(RegistrationSchema)
    });

    type UserData = z.infer<typeof RegistrationSchema>

    const onRegistration : SubmitHandler<FormValues> = async (data: UserData) => {
        try {
            await axios.post("http://localhost:4000/Users/Registration", data) 
            .then(() => {
                enqueueSnackbar("Registration Completed! Kindly Log in", { 
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right', 
                    },
                })
            })
        }catch (error) { 
            enqueueSnackbar("Registration Failed!" , { 
                variant: 'error',
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                },
            })  
            console.error(error)
        }
    }

return (
    <div className='grid grid-cols-1 gap-5 items-center justify-center m-auto mt-1 w-11/12 sm:grid-cols-2'>
        <figure className='hidden sm:block'>
            <img src={RegistrationImage} alt="" />
        </figure>
        <form method="post" onSubmit={handleSubmit(onRegistration)} encType="multipart/form-data" className='flex flex-col items-center justify-start gap-2 m-auto w-11/12'>
            <div className='my-10'>
                <h2 className='text-5xl'>Welcome to <span className='text-green-800' >E</span>ducate</h2>
                <p className='mt-5 text-xl text-center'>Create your account.</p>
            </div>
            <div className='flex flex-col gap-2'>
                <label className='font-bold' htmlFor="">Name</label> 
                <input placeholder="Enter Name..." {...register('Name', { required: 'Name is required' })} className='border-black border-b h-8 outline-none truncate px-1 py-2 text-black w-80 lg:w-96' required />
                {errors.Name && <p className="text-center text-red-700">{errors.Name.message}</p>}
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
            <Button
                ButtonText='Sign Up'
                ButtonStyle='bg-black cursor-pointer mt-5 text-center text-white px-3 py-1 rounded w-40'
                onClick={handleSubmit(onRegistration)}
            />
        </form>
    </div>
)
}

export default Registration
