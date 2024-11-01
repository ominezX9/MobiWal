import { useAppSelector } from '@hooks/redux-hooks';
import { useNavigate } from 'react-router-dom';

export default function Header() {
    const navigate = useNavigate();
    const { headerTitle, showBackButton, headToUrl } = useAppSelector(
        (store) => store.headerControls,
    )

    return (
        <header className='p-5 w-full absolute top-0 left-0 right-0 z-[10]'>
            <div className="flex title outline-none items-center justify-center">

            {showBackButton && (
              <button
                onClick={() =>
                  headToUrl ? navigate(headToUrl) : navigate(-1)}
                className={"flex items-center larr sm:mr-3 mr-1 sm:ml-[100px] ml-3"}
              >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.25 12.2743L19.25 12.2743" stroke="#200E32" stroke-width="1.656" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969" stroke="#200E32" stroke-width="1.656" stroke-linecap="round" stroke-linejoin="round" />
              </svg>

                {/* <img src={ArrowLeft} alt="back" className="w-4" /> */}
                {/* &larr; */}
              </button>
            )}
            <h3 className="flex-none sm:ml-0 ml-2 capitalize text-primary font-extrabold text-lg lg:text-2xl">
              {headerTitle}
            </h3>
            </div>
        </header>
    )
}
