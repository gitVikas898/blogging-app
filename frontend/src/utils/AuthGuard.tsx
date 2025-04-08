import { ReactNode, useState } from "react"
import SignInModal from "../components/SignInModal";

interface AuthguardProps {
    isAuthenticated: boolean;
    children: ReactNode;
}

export default function AuthGuard({ isAuthenticated, children }: AuthguardProps) {

    const [showModal, setShowModal] = useState(false);
    const handleClick = (e: React.MouseEvent) => {
        if (!isAuthenticated) {
            e.preventDefault();
            setShowModal(true);
        }
    };
    return (
        <>
            <div onClick={handleClick}>
                {children}
            </div>
            {showModal && <SignInModal onClose={()=>setShowModal(false)}/>}
        </>
    )
}
