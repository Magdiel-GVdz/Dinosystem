import "./CTexto.css";

export function CuadroTexto(prop) {
  const { posicion } = prop;
  return (
    <div
      style={{ position: "absolute", top: posicion.top, left: posicion.left }}
    >
      <input type="text" className="Text" />
    </div>
  );
}
