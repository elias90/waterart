function EntryInfoStats({
  lastMonth,
  entries,
  findClientNameById,
  setEntryToView,
  reverseDate,
  title,
  monthsToView,
  monthExclude,
  bgColor,
  activeSidebar,
}) {
  return (
    <>
      <div className={`flex flex-col ${bgColor} p-5 rounded-lg gap-2`}>
        <h3 className="text-xl font-bold">{title}</h3>
        {lastMonth(entries, monthsToView, monthExclude).map((el) => (
          <div
            key={el._id}
            className="flex flex-row p-2 bg-white rounded-lg text-xs justify-between hover:border-b-2 hover:border-slate-700 border-b-2 border-slate-100 cursor-pointer"
            onClick={() => activeSidebar(el)}
          >
            <div className="flex flex-col">
              <span>{findClientNameById(el.clientId)}</span>
              <span>{el._id}</span>
            </div>
            <div className="flex flex-col justify-center">
              {reverseDate(el.dateEntry)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default EntryInfoStats;
