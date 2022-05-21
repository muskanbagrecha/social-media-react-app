import "./Filter.css";
export const Filter = () => {
  const filters = ["Latest", "Oldest", "Trending"];
  return (
    <div className="flex justify-center h-12">
      {filters.map((filter) => (
        <div className="btn btn-chip">{filter}</div>
      ))}
    </div>
  );
};
