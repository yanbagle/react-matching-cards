import "../App.css";

export default function Card({ children, onClick }) {
  return (
    <button className="Card" onClick={onClick}>
      {children}
    </button>
  );
}
