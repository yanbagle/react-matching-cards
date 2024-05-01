import "../App.css";

export default function Card({ children, onClick, index }) {
  return (
    <button
      className="Card"
      onClick={() => {
        onClick(index);
      }}
    >
      {children}
    </button>
  );
}
