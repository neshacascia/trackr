import { SignedIn } from '@clerk/nextjs';
import Navbar from './Navbar';

export default function Layout(props) {
  return (
    <div className="font-spartan">
      <SignedIn>
        <Navbar />
      </SignedIn>
      <main className="h-full">{props.children}</main>
    </div>
  );
}
