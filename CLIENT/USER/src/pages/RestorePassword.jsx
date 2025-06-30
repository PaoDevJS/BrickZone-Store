import RestPassword from "../components/RestPassword";
import SendEmail from "../components/SendEmail";
import SendOpt from "../components/SendOpt";
import { useState } from "react";

const RestorePassword = () => {
  const [page, setPage] = useState(1)
  const [email, setEmail] = useState("")

  if (page === 1) {
    return <SendEmail setPage={setPage} setEmail={setEmail} email={email} />;
  } else if (page === 2) {
    return <SendOpt email={email} setPage={setPage} />;
  } else if (page === 3) {
    return <RestPassword email={email}/>;
  }
};

export default RestorePassword;
