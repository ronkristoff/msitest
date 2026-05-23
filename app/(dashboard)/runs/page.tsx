import { IconPlayerPlay } from "@tabler/icons-react";

export default function RunsPage() {
  return (
    <div className="max-w-[1200px] mx-auto p-8">
      <h1 className="text-[32px] leading-tight font-bold text-pitch-black mb-1">Test Runs</h1>
      <p className="text-inkwell mb-8">
        View and manage your Playwright test run history.
      </p>
      <div className="border border-oatmeal rounded-cards bg-ghost-white p-12 flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-cloud-gray flex items-center justify-center text-platinum-gray">
          <IconPlayerPlay size={20} stroke={1.5} />
        </div>
        <div className="text-center">
          <p className="text-base font-medium text-pitch-black mb-1">Coming soon</p>
          <p className="text-sm text-inkwell max-w-xs">
            Test runs will appear here once you run your first test suite.
          </p>
        </div>
      </div>
    </div>
  );
}
