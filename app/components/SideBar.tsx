'use client';

import Image from 'next/image';

const mainMenus = ['Dashboard', 'Project', 'Setting'];
const projects = ['Moonlit Alley', 'City Rope Scene'];

export default function SideBar() {
  return (
    <div className="flex h-full flex-col justify-between bg-[#0d1220] px-4 py-5 text-[#c5cdec]">
      <div>
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-[#2d344b] bg-[#12182a] p-3">
          <Image src="/logo.png" alt="CINEROPE" width={42} height={42} className="rounded-md object-cover" />
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#7d86a8]">ROPE BASED STUDIO</p>
            <h1 className="text-lg font-semibold text-[#edf1ff]">CINEROPE</h1>
          </div>
        </div>

        <nav className="mb-6 space-y-2">
          {mainMenus.map((menu) => (
            <button
              key={menu}
              className="w-full rounded-lg border border-transparent bg-transparent px-3 py-2 text-left text-sm text-[#aeb7da] transition hover:border-[#3d4562] hover:bg-[#131a2e] hover:text-[#e6ebff]"
            >
              {menu}
            </button>
          ))}
        </nav>

        <section className="rounded-xl border border-[#2c344c] bg-[#111729] p-3">
          <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-[#7b84a7]">Projects</p>
          <div className="space-y-2">
            {projects.map((project) => (
              <div key={project} className="rounded-lg border border-dashed border-[#384160] bg-[#0f1527] px-3 py-2 text-sm">
                {project}
              </div>
            ))}
            <button className="w-full rounded-lg border border-[#3c4460] bg-[#161d32] px-3 py-2 text-sm text-[#d2d9f6] transition hover:bg-[#1c2540]">
              + 프로젝트 추가
            </button>
          </div>
        </section>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-[#2f3851] bg-[#11182c] p-3">
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="프로필" width={28} height={28} className="rounded-full object-cover" />
            <p className="text-sm text-[#e2e8ff]">KIM JUNSOO</p>
          </div>
          <span className="rounded-full border border-[#5f6888] px-2 py-0.5 text-[10px] text-[#bdc7eb]">PLUS</span>
        </div>

        <button className="w-full rounded-lg border border-[#39415b] bg-[#131b2f] px-3 py-2 text-sm text-[#bec7e9] transition hover:bg-[#1a233c]">
          Log Out
        </button>
      </div>
    </div>
  );
}
