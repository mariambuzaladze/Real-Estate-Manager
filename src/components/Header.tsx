import RedberryLogo from "/images/redberry logo.png";

export default function Header({ showAgent }: { showAgent: boolean }) {
  return (
    <div
      className={`border border-gray-300 py-10 px-40 ${
        showAgent ? "opacity-50" : ""
      }`}
    >
      <img src={RedberryLogo} alt="redberry logo" />
    </div>
  );
}
