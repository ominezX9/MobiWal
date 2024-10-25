import { Link } from "react-router-dom"
import { useState } from "react";
import useDeviceType from "@utils/screensize";
export default function MenuBar() {
  const deviceType = useDeviceType();
  const options = [
        "dashboard", 
        "more", 
        "profile", 
        "contacts"
    ]
    const svgs = [
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M261.56 101.28a8 8 0 0 0-11.06 0L66.4 277.15a8 8 0 0 0-2.47 5.79L63.9 448a32 32 0 0 0 32 32H192a16 16 0 0 0 16-16V328a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v136a16 16 0 0 0 16 16h96.06a32 32 0 0 0 32-32V282.94a8 8 0 0 0-2.47-5.79z"></path><path d="m490.91 244.15-74.8-71.56V64a16 16 0 0 0-16-16h-48a16 16 0 0 0-16 16v32l-57.92-55.38C272.77 35.14 264.71 32 256 32c-8.68 0-16.72 3.14-22.14 8.63l-212.7 203.5c-6.22 6-7 15.87-1.34 22.37A16 16 0 0 0 43 267.56L250.5 69.28a8 8 0 0 1 11.06 0l207.52 198.28a16 16 0 0 0 22.59-.44c6.14-6.36 5.63-16.86-.76-22.97z"></path></svg>,
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" aria-hidden="true" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M2 4.25A2.25 2.25 0 0 1 4.25 2h2.5A2.25 2.25 0 0 1 9 4.25v2.5A2.25 2.25 0 0 1 6.75 9h-2.5A2.25 2.25 0 0 1 2 6.75v-2.5ZM2 13.25A2.25 2.25 0 0 1 4.25 11h2.5A2.25 2.25 0 0 1 9 13.25v2.5A2.25 2.25 0 0 1 6.75 18h-2.5A2.25 2.25 0 0 1 2 15.75v-2.5ZM11 4.25A2.25 2.25 0 0 1 13.25 2h2.5A2.25 2.25 0 0 1 18 4.25v2.5A2.25 2.25 0 0 1 15.75 9h-2.5A2.25 2.25 0 0 1 11 6.75v-2.5ZM15.25 11.75a.75.75 0 0 0-1.5 0v2h-2a.75.75 0 0 0 0 1.5h2v2a.75.75 0 0 0 1.5 0v-2h2a.75.75 0 0 0 0-1.5h-2v-2Z"></path></svg>,
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 0 1-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 0 1 432 480z"></path></svg>,
        <svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="30px" width="30px" xmlns="http://www.w3.org/2000/svg"><g><path d="M19 3h-11c-1.654 0-3 1.346-3 3v1h-1c-.553 0-1 .448-1 1s.447 1 1 1h1v2h-1c-.553 0-1 .448-1 1s.447 1 1 1h1v2h-1c-.553 0-1 .448-1 1s.447 1 1 1h1v1c0 1.654 1.346 3 3 3h11c1.654 0 3-1.346 3-3v-12c0-1.654-1.346-3-3-3zm-12 3c0-.551.449-1 1-1v2h-1v-1zm0 3h1v2h-1v-2zm0 4h1v2h-1v-2zm0 5v-1h1v2c-.551 0-1-.449-1-1zm13 0c0 .551-.449 1-1 1h-10v-14h10c.551 0 1 .449 1 1v12z"></path><circle cx="14" cy="10.5" r="2"></circle><path d="M14 13.356c-1.562 0-2.5.715-2.5 1.429 0 .357.938.715 2.5.715 1.466 0 2.5-.357 2.5-.715 0-.714-.98-1.429-2.5-1.429z"></path></g></svg>
    ];

    const [selected, setSelected] = useState(0);
    
    // alert(deviceType)
  return (
    <div className={`absolute bg-white ${deviceType === "phone" ? "bottom-0 left-0 right-0" : "left-0 bottom-0 top-0" }`}>
      {
        deviceType === "phone" ? (
          <div>
            <ul className="flex justify-between align-center py-10 px-20">
              {
                options.map((item, i ) => (
                    <Link 
                        className={`text-gray hover:text-secondary border-2 border-transparent hover:border-secondary transition-all rounded-lg flex-none flex items-center justify-center shadow w-[40px] h-[40px] p-2 ${selected == i ? "!text-secondary !border-secondary" : ""}`} 
                        key={i} 
                        to={`/${item}`}>
                        {svgs[i]}
                    </Link>
                ))
                }
            </ul>
          </div>
        ) : (
            <div className="h-full">
              <ul className="flex flex-col gap-5 p-5 shadow h-full">
                {
                  options.map((item, i ) => (
                      <Link className={`text-gray hover:text-secondary border-2 border-transparent hover:border-secondary transition-all h-[80px] w-[80px] flex-none flex items-center justify-center rounded-lg p-3 ${selected == i ? "!text-secondary !border-secondary" : ""}`} key={i} to={`/${item}`}>
                       {svgs[i]}
                      </Link>
                  ))
                  }
              </ul>
            </div>
          ) 
      }
       
    </div>
  )
}
