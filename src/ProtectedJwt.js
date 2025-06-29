import { Navigate } from "react-router-dom";

export default function ProtectedJwt({ value, children }) {
  return value ? children : <Navigate to="/" />;
}
