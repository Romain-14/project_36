import {Link} from "react-router-dom";

function Footer() {
    return (
      <footer>
        <p>&copy; 2024 - Romain FOURNIER / 3W Academy</p>
        <p>
          <Link href="/politique-de-confidentialite">Politique de confidentialité</Link> | {" "}
          <Link href="/conditions-d-utilisation">Conditions d&apos;utilisation</Link>
        </p>
      </footer>
    )
  }
  
  export default Footer