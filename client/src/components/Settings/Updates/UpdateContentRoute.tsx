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
    <div className="flex flex-col pb-10 overflow-y-auto">
      {changeLog.map((item, i) => (
        <div className="border-l last:border-l-0 border-l-[#333] pl-9 pb-[50px] ml-6 relative" key={i}>
          <img className="absolute top-0 left-0 -translate-x-1/2" src={''} alt="" />
          <p className="font-bold text-black dark:text-white text-sm mb-2">{item.version}</p>
          <p className="text-[#828282] text-sm">{item.changes}</p>
        </div>
      ))}
    </div>
  );
}
