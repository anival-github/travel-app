import blr from '../../assets/polygons/belarus.json';
import rus from '../../assets/polygons/russia.json';
import fr from '../../assets/polygons/france.json';
import uk from '../../assets/polygons/uk.json';
import ukr from '../../assets/polygons/ukraine.json';
import nth from '../../assets/polygons/netherlands.json';
import sp from '../../assets/polygons/spain.json';
import it from '../../assets/polygons/italy.json';

const getPolygon = (id: string) => {
  switch (id) {
    case 'BLR':
      return blr;
    case 'RUS':
      return rus;
    case 'FR':
      return fr;
    case 'GBR':
      return uk;
    case 'UA':
      return ukr;
    case 'NL':
      return nth;
    case 'SPN':
      return sp;
    case 'IT':
      return it;
    default:
      return blr;
  }
};

export default getPolygon;
