import PropTypes from "prop-types";
import "./Boton.css";



export function Button({ text }) {
  console.log(text);
  
  return (
    <button type="submit"
      className="boton"
      style={{ position: "absolute", top: "600px", left: "70px" }}
    >
      {text}
    </button>
  );
}
Button.propTypes = {
  text: PropTypes.string.isRequired,
};
11