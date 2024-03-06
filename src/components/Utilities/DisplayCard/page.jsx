
const DisplayCard = ({ icon, title, desc }) => {
  return (
    <div className="relative group flex flex-col items-center w-60 h-60 bg-neutral-700/40 p-4 hover:bg-neutral-700 rounded-3xl">
        <div className="relative flex flex-col justify-center items-center pt-8 ">
          <img
            src={icon}
            height={100}
            width={100}
            alt="Loading Icon"
          />
          <div className="text-xl font-bold pt-2">{title}</div>
          <div className="self-stretch my-2 text-center opacity-90">{desc}</div>
        </div>
    </div>
  );
};

export default DisplayCard