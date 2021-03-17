import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppStateType } from '../../store';

const useTypedSelector: TypedUseSelectorHook<AppStateType> = useSelector;

export default useTypedSelector;
