import Header from "../Header/Header";
import { useLocation } from "react-router-dom";
import { routesWithoutHeader } from "../../utils/constants/constants";
import { LayoutProps } from "../../utils/interfaces/authInterface";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const shouldShowHeader = !routesWithoutHeader.includes(location.pathname);

  return (
    <div>
      {shouldShowHeader && <Header />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;
