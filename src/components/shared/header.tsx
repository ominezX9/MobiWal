import { useAppSelector } from '@hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';
// import {ArrowLeft} from '../../../assets/vectors/Arrow - Left.svg'
import React from 'react'

export default function Header() {
    const navigate = useNavigate();
    const { headerTitle, showBackButton, headToUrl } = useAppSelector(
        (store) => store.headerControls,
    )

    return (
        <header className=' p-10 w-full absolute top-0  left-0 right-0 z-[10]'>
            <div className="flex title outline-none items-center justify-center ">

            {showBackButton && (
              <button
                onClick={() =>
                  headToUrl ? navigate(headToUrl) : navigate(-1)}
                className={"flex items-center larr sm:mr-3 mr-1 sm:ml-0 ml-3"}
              >
                {/* <img src={ArrowLeft} alt="back" className="w-4" /> */}
                {/* &larr; */}
              </button>
            )}
            <h3 className="sm:ml-0 ml-2 capitalize text-primary font-extrabold text-lg lg:text-2xl">
              {headerTitle}
            </h3>
            </div>
        </header>
    )
}
