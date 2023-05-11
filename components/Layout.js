import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div className="font-spartan">
      <Navbar />
      <main className="h-full">{props.children}</main>
    </div>
  );
}
