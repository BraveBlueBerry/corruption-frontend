import BeltImage from './plaatjes/Belt.jpg';
import BootsImage from './plaatjes/Boots.jpg';
import GlovesImage from './plaatjes/Gloves.jpg';
import PantsImage from './plaatjes/Pants.jpg';
import RingImage from './plaatjes/Ring.jpg';
import WeaponImage from './plaatjes/Weapon.jpg';
import WristImage from './plaatjes/Wrist.jpg';
import MaytotoImg from './plaatjes/Maytoto.jpg';
import MaysunnyImg from './plaatjes/Maysunny.jpg';
import EeyoreloverImg from './plaatjes/Eeyorelover.jpg';
import DefaultImg from './plaatjes/defaultchar.jpg';
import RemoveIcon from './plaatjes/removeicon.png';

const config = {
	"slots": [
		"wrist",
		"gloves",
		"belt",
		"pants",
		"boots",
		"ring",
		"weapon",
	],
	"images": {
		"wrist": WristImage,
		"gloves": GlovesImage,
		"belt": BeltImage,
		"pants": PantsImage,
		"boots": BootsImage,
		"ring": RingImage,
		"weapon": WeaponImage,
	},
	"baseURL": "http://127.0.0.1:8000/api/",
	"charImg": {
		"Maytoto": MaytotoImg,
		"Maysunny": MaysunnyImg,
		"Eeyorelover": EeyoreloverImg,
		"default": DefaultImg,
	},
	"removeIcon": RemoveIcon,
};

export default config;
