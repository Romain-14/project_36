import { useCheckAuth } from "../../hooks/useCheckAuth"
import useMenu from "../../hooks/useMenu";


function Dashboard() {
    useMenu();
    const [ user ] = useCheckAuth();

    if(user.isLogged) {
        return (
          <div>Dashboard</div>
        ) 
    }

}

export default Dashboard