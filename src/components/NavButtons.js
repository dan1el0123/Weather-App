import Button from "./Button";
import {
  FaMapMarkerAlt,
  FaHome,
  FaSave,
  FaChartBar,
  FaSyncAlt,
} from "react-icons/fa";
import "./NavButtons.css";

const NavButtons = ({ handleReload, handleUnitChange }) => {
  return (
    <nav className="navButtons fade-in">
      <Button
        title="Get Location"
        label="Get the current weather conditions for your current location"
        handleClick={() => {}}
      >
        <FaMapMarkerAlt />
      </Button>
      <Button
        title="Home weather"
        label="Get the current weather conditions for your home location"
        handleClick={() => {}}
      >
        <FaHome />
      </Button>
      <Button
        title="Save location"
        label="Save the current location as your home location"
        handleClick={() => {}}
      >
        <FaSave />
      </Button>
      <Button
        title="Toggle measurement units"
        label="Toggle between metric and imperial measurement units"
        handleClick={handleUnitChange}
      >
        <FaChartBar />
      </Button>
      <Button
        title="Refresh weather"
        label="Refresh the current weather conditions"
        handleClick={handleReload}
      >
        <FaSyncAlt />
      </Button>
    </nav>
  );
};

export default NavButtons;
