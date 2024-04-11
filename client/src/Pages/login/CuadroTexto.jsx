import "./CTexto.css";

export function CuadroTexto(prop) {
  const { posicion, placeholder, name, type, value} = prop;

  return (
    <div
      style={{ position: "absolute", top: posicion.top, left: posicion.left }}
    >
      <input
        type={type}
        value={value}
        className="Text"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
}
