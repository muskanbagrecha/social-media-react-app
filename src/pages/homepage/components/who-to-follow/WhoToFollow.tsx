export const WhoToFollow = () => {
  const data = new Array(5).fill({
    name: "Dwight Schrute",
    username: "@dwight",
    avatar: "https://i.pravatar.cc/300?img=8",
  });
  return (
    <div className="w-1/5 dark:bg-gray-800 rounded-lg mx-2 hidden md:flex lg:flex">
      <div className="overflow-y-auto p-3 md:py-4 lg:py-4 bg-gray-50 dark:bg-gray-800 rounded-lg sticky top-20 w-full">
        <p className="dark:text-white transition duration-75 text-base font-normal text-center">
          Who to follow?
        </p>
        <div>
          {data.map((user) => (
            <div className="flex px-2 w-full rounded-lg hover:cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700">
              <img src={user.avatar} alt="" className="avatar avatar-xs" />
              <div className="">
                <span className="text-sm text-gray-500">{user.username}</span>
                <p className="text-sm text-gray-200">{user.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
