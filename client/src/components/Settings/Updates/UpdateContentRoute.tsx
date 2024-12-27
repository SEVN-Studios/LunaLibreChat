type ChangeLogItem = {
  version: string;
  changes: string[];
};

export default function UpdateContentRoute() {
  const changeLog: ChangeLogItem[] = [
    {
      version: '0.6.1',
      changes: ['Fork LibreChat App to Luna AI'],
    },
  ];

  return (
    <div>
      <div className="w-full py-7">
        <div className="w-full border-b border-b-[#333] pb-5">
          <h2 className="text-black dark:text-white text-3xl mb-1">What we cookin&apos;</h2>
          <p className="text-[#828282] text-base">Read some of our updates we&apos;ve dropped into Luna.</p>
        </div>
      </div>
      <div className="flex flex-col pb-10 overflow-y-auto">
        {changeLog.map((item, i) => (
          <div className="border-l last:border-l-0 border-l-[#333] pl-9 pb-[50px] ml-6 relative" key={i}>
            <img className="absolute top-0 left-0 -translate-x-1/2" src="/assets/changelog-icon.svg" alt="" />
            <p className="font-bold text-black dark:text-white text-sm mb-2">{item.version}</p>
            <p className="text-[#828282] text-sm">{item.changes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
