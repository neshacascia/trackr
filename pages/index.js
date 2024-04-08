import Head from 'next/head';
import Image from 'next/image';
import { useEffect } from 'react';
import { SignInButton, SignUpButton, useSignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import preview from '../public/assets/preview.png';

export default function LandingPage() {
  const router = useRouter();

  const { isLoaded, signIn, setActive } = useSignIn();
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      router.replace('/dashboard');
    }
  }, [isSignedIn, router]);

  async function handleDemoLogin(e) {
    e.preventDefault();

    if (!isLoaded) {
      return;
    }

    try {
      const res = await signIn.create({
        identifier: process.env.NEXT_PUBLIC_DEMO_EMAIL,
        password: process.env.NEXT_PUBLIC_DEMO_PASSWORD,
      });

      if (res.status === 'complete') {
        console.log(res);
        await setActive({ session: res.createdSessionId });
        router.push('/dashboard');
      } else {
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <Head>
        <title>trackr</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <nav className="bg-white w-full h-[72px] flex items-center fixed z-50 border-b">
        <div className="bg-nav bg-no-repeat w-20 h-full flex">
          <Image
            src="/assets/logo.svg"
            alt=""
            width={34}
            height={36}
            className="mx-4"
          />
        </div>

        <h1 className="text-[#2a2e49] font-medium text-[28px] tracking-wider ml-6 mr-auto md:mr-20">
          trackr
        </h1>

        <div className="text-lg tracking-wider flex gap-8 ml-auto mr-6">
          <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
            <button className="text-[#2a2e49] hover:text-hoverPurple">
              Login
            </button>
          </SignInButton>

          <SignUpButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
            <button className="text-white bg-brightPurple rounded py-2 px-6 hover:bg-hoverPurple">
              Signup
            </button>
          </SignUpButton>
        </div>
      </nav>

      <main className="bg-white w-screen h-full flex flex-col pt-10 mb-48 lg:pt-[72px] xl:mb-0 md:h-screen">
        <section className="w-full h-screen flex flex-col justify-around items-center gap-10 pt-[72px] px-6 md:px-12 md:mt-8 lg:-mt-4 xl:flex-row xl:gap-0">
          <div className="flex flex-col items-center xl:items-start gap-4 lg:gap-6">
            <h1 className="font-home text-transparent text-5xl text-center lg:text-6xl font-semibold tracking-wider leading-[65px] xl:text-left gradient">
              Tracking made easy.
            </h1>
            <p className="text-[#292929] font-spartan text-xl text-center md:text-2xl xl:text-left w-[550px] lg:w-[645px]">
              Whether you&apos;re an individual, small business owner, or
              freelancer, Trackr allows you to manage your invoices and expenses
              all in one place.
            </p>

            <div className="flex items-center gap-8 pt-10">
              <SignUpButton
                afterSignInUrl="/dashboard"
                afterSignUpUrl="/dashboard"
              >
                <button className="text-white text-lg tracking-wider bg-brightPurple flex items-center gap-2 rounded py-4 px-8 hover:bg-hoverPurple md:text-xl">
                  Get Started
                </button>
              </SignUpButton>
              <button
                onClick={handleDemoLogin}
                className="text-brightPurple text-lg tracking-wider border-brightPurple border-2 flex items-center gap-2 rounded py-4 px-8 hover:border-hoverPurple hover:text-hoverPurple md:text-xl"
              >
                View Demo
                <FontAwesomeIcon icon={faCircleArrowRight} />
              </button>
            </div>
          </div>

          <Image
            src={preview}
            alt="Preview of app's components"
            className="w-fit mb-10"
          />
        </section>
      </main>
    </>
  );
}
