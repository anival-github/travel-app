import blr from '../../assets/polygons/belarus.json';
import pol from '../../assets/polygons/poland.json';

const getPolygon = (id: string) => {
  switch (id) {
    case 'BLR':
      return blr;
    default:
      return pol;
  }
};

export default getPolygon;
