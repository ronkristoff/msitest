import { IconFolder, IconPlayerPlay, IconServer, IconSettings } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-oatmeal bg-ghost-white flex flex-col">
        <div className="h-12 flex items-center px-4 border-b border-oatmeal">
          <span className="text-sm font-semibold text-pitch-black">MSI Test</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          <SidebarItem icon={IconFolder} label="Projects" active />
          <SidebarItem icon={IconPlayerPlay} label="Test Runs" />
          <SidebarItem icon={IconServer} label="Workers" />
          <SidebarItem icon={IconSettings} label="Settings" />
        </nav>
        <div className="p-3 border-t border-oatmeal">
          <div className="flex items-center gap-2 px-3 py-2 rounded-interactiveelements text-inkwell text-sm">
            <div className="w-5 h-5 rounded-full bg-platinum-gray" />
            <span className="truncate">User</span>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-[1200px] mx-auto p-8">
          <h1 className="text-[32px] leading-tight font-bold text-pitch-black mb-2">Projects</h1>
          <p className="text-inkwell max-w-prose mb-8">
            Create and manage your E2E test projects. Each project links to a target app and stores its test plans, runs, and results.
          </p>

          {/* Empty state */}
          <div className="border border-oatmeal rounded-cards p-12 flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-cloud-gray flex items-center justify-center text-platinum-gray">
              <IconFolder size={20} stroke={1.5} />
            </div>
            <div className="text-center">
              <p className="text-base font-medium text-pitch-black mb-1">No projects yet</p>
              <p className="text-sm text-inkwell max-w-xs">
                Create your first project by providing a target URL and uploading a PRD.
              </p>
            </div>
            <button className="h-9 px-4 bg-pitch-black text-ghost-white rounded-buttons text-sm font-medium hover:bg-neutral-800 transition-colors">
              Create Project
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  active,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
}) {
  return (
    <button
      className={`w-full flex items-center gap-2.5 text-left h-9 px-3 rounded-interactiveelements text-sm transition-colors ${
        active
          ? "bg-clay-violet/10 text-clay-violet font-medium"
          : "text-inkwell hover:bg-cloud-gray"
      }`}
    >
      <Icon size={18} stroke={1.5} />
      {label}
    </button>
  );
}
