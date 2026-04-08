import Navbar from './Navbar';

export default function PageWrapper({ children }) {
  return (
    <div className="page">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
