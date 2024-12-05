import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { useCookies } from "react-cookie";
import { IoMdHome } from "react-icons/io";
import Button from '../Common/Button/Button';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/Educate_Logo.jpg";
import Navigate from "../Common/Navigate/Navigate";
import React, { useEffect, useState } from 'react';
import { useGetUserID } from '../Hooks/useGetUserID';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header: React.FC = () => {

    const UserID = useGetUserID()
    const navigate = useNavigate()
    const [Cookie,setCookie] = useCookies(["auth_token"])

    // USESTATE HOOK

    const [Name, setName] = useState<string>("")
    const [ExtendNavbar,setExtendNavbar ] = useState<boolean>(false)

    // OPENING AND CLOSING OF THE MOBILE MENU

    const toggleMenu = () => {
        setExtendNavbar(!ExtendNavbar);
    };

    // RECEIVING THE NAME OF THE USER

    useEffect(() => {
        
        const FetchName  = async() => {
            await axios.get(`https://storykeeper-server.onrender.com/Users/${UserID}/Name`, {
            headers: { authorization: Cookie.auth_token },
            }) 
            .then((Response) => {
                setName(Response.data.Name)
            })
        } 
    
        FetchName()

    },[UserID])

    // LOGGING OUT OF ONE'S ACCOUNT

    const Logout = () => {
        setCookie("auth_token", "");
        window.localStorage.clear();
        navigate("/");
    }

return (
    <div className='flex items-center justify-between min-h-10 px-2 shadow-lg'>
        <Navigate
            Navigation='/Home'
            NavigateStyle="flex gap-0 items-center justify-center font-bold text-3xl text-black no-underline"
            NavigateText="ducate"
            children={<img src={Logo} alt="" width="24px" />}
        />
        <Navigate
            Navigation='/Home'
            children={<IoMdHome size="1.8rem" color='black' />}
        />
        <section className="hidden xl:flex items-center justify-center gap-2">
                {!UserID?
                    <Navigate
                        Navigation="/Registration"
                        NavigateStyle="bg-black cursor-pointer text-center text-base text-white px-5 py-1 rounded"
                        NavigateText="Sign Up"
                    /> : null
                }
                {
                !Cookie.auth_token ?
                (
                    <Navigate
                        Navigation="/"
                        NavigateStyle="bg-black cursor-pointer text-center text-base text-white px-5 py-1 rounded w-20"
                        NavigateText="Login"
                    />
                ) : 
                (
                    <Button
                        ButtonText='Logout'
                        ButtonStyle='bg-black cursor-pointer h-8 text-center text-base text-white px-3 py-1 rounded w-20'
                        onClick={Logout}
                    />
                )
            }
            {
                UserID ?
                <Navigate
                    ID='ProfileIcon'
                    Navigation={`/Profile/${UserID}`}
                    children={<FaUser size="2rem" className="bg-black text-white cursor-pointer px-1.5 py-1.5 rounded-full" />}
                />
                : null
            }
            { UserID ? <h4 className="font-bold flex flex-col text-center"><span>Welcome</span>{Name}</h4> : null }
        </section>
        <div className="xl:hidden flex items-center gap-3">
            {
                UserID ? 
                <Navigate
                    ID='ProfileIcon'
                    Navigation={`/Profile/${UserID}`}
                    children={<FaUser size="1.8rem" className="bg-black text-white cursor-pointer px-1.5 py-1.5 rounded-full" />}
                /> : null
            }
            <button onClick={toggleMenu} className="focus:outline-none">
                {ExtendNavbar ? <FontAwesomeIcon icon={faX} className="text-sm" /> : <FontAwesomeIcon icon={faBars} className="text-base" />}
            </button>
            { UserID ? <h4 className="font-bold flex flex-col text-center"><span>Welcome</span>{Name}</h4> : null }
            {/* MOBILE MENU */}
            {ExtendNavbar && (
                <nav className="bg-white absolute top-12 mt-1.5 right-0 flex flex-col gap-4 m-auto pl-4 pt-2 pb-8 rounded-Header text-base text-black w-36 z-50 xl:hidden">
                    {
                        !UserID? 
                        <Navigate
                            Navigation="/Registration"
                            NavigateStyle="border-b border-black text-black no-underline w-28"
                            NavigateText="Sign Up"
                        /> : null
                    }
                    {
                        !Cookie.auth_token ?
                        (
                            <Navigate
                                Navigation="/"
                                NavigateStyle="border-b border-black text-black no-underline w-28"
                                NavigateText="Login"
                            />
                        ) : 
                        (
                            <Navigate
                                NavigateStyle="border-b border-black text-black no-underline w-28"
                                NavigateText="Logout"
                                onClick={Logout}
                            />
                        )
                    }
                </nav>
            )}
        </div>
    </div>
)
}

export default Header
