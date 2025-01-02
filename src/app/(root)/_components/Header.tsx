import { currentUser } from '@clerk/nextjs/server'
import { ConvexHttpClient } from 'convex/browser';
import { api } from '../../../../convex/_generated/api';
import { Blocks, Sparkles } from 'lucide-react';
import { MdSnippetFolder } from 'react-icons/md';
import Link from 'next/link';
import { SignedIn } from '@clerk/nextjs';
import RunButton from './RunButton';
import HeaderProfileButton from './HeaderProfileButton';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';

const Header = async () => {
  const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)
  const user = await currentUser();
  const convexUser = await convex.query(api.users.getUser, {
    userId: user?.id || "",
  });

  // console.log({ convexUser });

  return (
    <div className=" mb-4">
      <div className="relative">
        <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        <div className="py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-[98%] mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 group">
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm flex items-center justify-center border border-white/5 transition-all duration-300 group-hover:scale-105">
                  <Blocks className="size-6 text-blue-400 transform -rotate-6 transition-all duration-500 group-hover:rotate-0 group-hover:scale-110" />
                </div>
                <div className=' cursor-pointer'>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-400 via-blue-300 to-purple-400 text-transparent bg-clip-text tracking-tight">
                    Reflex
                  </h1>
                  <p className="text-sm font-medium text-blue-400/50 transition-all duration-300 group-hover:text-blue-400/70">
                    Interactive code editor
                  </p>
                </div>
                <div className=' text-center'>
                  <NavButton icon={<MdSnippetFolder className="size-6" />} text="Snippets" />
                </div>
              </div>

              <div className="hidden md:flex items-center gap-6">
                <div className='flex items-center gap-9'>
                  <ThemeSelector />
                  <LanguageSelector hasAccess={Boolean(convexUser?.isPro)} />
                </div>
                {!convexUser?.isPro && (
                  <Link href={'/pricing'} className='px-4 py-2 bg-yellow-600/30 rounded-lg border border-yellow-600  transition-all duration-300 text-sm font-medium flex items-center gap-2'>
                    <Sparkles className='size-4 ' />
                    Pro
                  </Link>
                )}

                <SignedIn>
                  <RunButton />
                </SignedIn>

                <div className='pl-3 border-l border-gray-800 '>
                  <HeaderProfileButton />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      </div>
    </div>
  )
}

export default Header

function NavButton({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-400 hover:text-white transition-colors duration-200 text-sm">
      {icon}
      <span>{text}</span>
    </button>
  );
}