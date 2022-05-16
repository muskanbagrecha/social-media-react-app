import { Link } from "react-router-dom";
import { Pencil } from "../../../../assets";
export const MainProfile = () => {
  return (
    <div className="w-full md:w-3/5 lg:w-3/5 flex flex-col gap-4 rounded  child:mx-auto mt-2">
      <div className="flex gap-6 items-center">
        <div className="h-32 w-32">
          <img
            src="https://images.unsplash.com/photo-1606143412458-acc5f86de897?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80"
            alt=""
            className="img-rounded img-responsive"
          />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="large-title text-2xl md:text-3xl lg:text-2xl">
              Muskan Bagrecha
            </h1>
            <span className="text-base text-gray-500 cursor-pointer">
              <Pencil />
            </span>
          </div>
          <button
            type="button"
            className="font-medium text-gray-900 rounded  bg-primary-100 hover:text-primary-500 flex items-center justify-center px-4 py-1 text-base"
          >
            Follow
          </button>
          <Link to="/" className="text-primary-500 text-sm">
            muskanbagrecha04@gmail.com
          </Link>
        </div>
      </div>
      <div className="flex text-sm gap-8">
        <div className="flex flex-col items-center">
          <span>10</span>
          <span>Followers</span>
        </div>
        <div className="flex flex-col items-center">
          <span>10</span>
          <span>Following</span>
        </div>
        <div className="flex flex-col items-center">
          <span>10</span>
          <span>Posts</span>
        </div>
      </div>
      <p className="text-sm md:text-base lg:text-base text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam,
        tenetur.
      </p>
      <hr />
    </div>
  );
};
