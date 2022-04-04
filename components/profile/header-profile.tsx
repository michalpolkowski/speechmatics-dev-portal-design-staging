import Image from 'next/image';
import { useEffect } from 'react';

const HeaderProfile = ({ accounts }) => {
    useEffect(() => {
        console.log(accounts);
    }, [ accounts ]);

    return (
        <>
        { accounts.length > 0 && 
        <div className='profile'>
            <span className='profile__name hidden md:flex'>
                {accounts[0].username}
            </span>
            <span className='profile__name md:hidden'>
                {accounts[0].name}
            </span>
            <span className='profile__arrow'>
            <Image
                src="/assets/icon-drop-arrow.svg"
                alt="Speechmatics"
                width={16}
                height={12}
            />
            </span>
            <div className='profile__dropdown absolute bg-speech-navy w-full'>
            <ul>
                <li><a href="#">
                <span className='icon h-6 w-6'>
                    <Image
                    src="/assets/icon-profile.svg"
                    alt="Speechmatics"
                    width={24}
                    height={24}
                    />
                </span> Profile</a></li>
                <li><a href="#">
                <span className='icon h-6 w-6'>
                    <Image
                    src="/assets/icon-logout.svg"
                    alt="Speechmatics"
                    width={24}
                    height={24}
                    />
                </span> Logout</a></li>
            </ul>
            </div>
        </div>}</>
    )
}

export default HeaderProfile;