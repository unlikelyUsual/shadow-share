import Navbar from "../Navbar/Navbar";

const PageNotFound = () => {
  return (
    <div>
      <div
        className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden"
        style={{ fontFamily: '"Spline Sans", "Noto Sans", sans-serif' }}
      >
        <Navbar />
        <div className="layout-container flex h-full grow flex-col">
          <div className="px-40 flex flex-1 justify-center py-5">
            <div className="layout-content-container flex flex-col w-full max-w-[512px] py-5 flex-1">
              <img src="/img/404.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
