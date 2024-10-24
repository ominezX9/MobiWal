import { AppDispatch, type RootState } from "store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch : () => AppDispatch = useDispatch;