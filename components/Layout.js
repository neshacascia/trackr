import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div className="font-spartan">
      <Navbar />
      <main>{props.children}</main>
    </div>
  );
}
