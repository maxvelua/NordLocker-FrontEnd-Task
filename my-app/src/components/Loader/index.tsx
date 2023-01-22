import "./style.scss";

import { Oval } from "react-loader-spinner";

export function Loader() {
  return (
    <div className="loader">
      <Oval
        height={80}
        width={80}
        color="#4fa94d"
        visible
        ariaLabel="oval-loading"
        secondaryColor="#4fa94d"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}
