// Datos de DnD para las tiradas
const BODY_PARTS = [
  "Cabeza", "Cuello", "Hombro derecho", "Hombro izquierdo",
  "Torso", "Abdomen", "Brazo derecho", "Brazo izquierdo",
  "Mano derecha", "Mano izquierda", "Pierna derecha", "Pierna izquierda",
  "Rodilla derecha", "Pie derecho", "Pie izquierdo", "Una nalga", "la entrepierna",
  "Ojo", 
];


const TRAPS = [
  "Dardo envenenado (1d4 + veneno)", "Foso oculto (2d6 caída)",
  "Bola de fuego activada (3d6)", "Rejas de cuchillas (2d8)",
  "Suelo eléctrico (2d4 rayo)", "Lluvia de flechas (1d6 x2)",
  "Bola rodante", "Arenas movedizas (inmovilizado)",
  "Gas somnífero (dormido 1h)", "Espejo maldito (maldición aleatoria)",
];

const ITEMS = [
  { id: "sword", name: "Espada Larga", type: "weapon", damage: "1d8", desc: "Daño cortante. +2 STR en combate." },
  { id: "dagger", name: "Daga", type: "weapon", damage: "1d4", desc: "Arma ligera. Puede lanzarse." },
  { id: "axe", name: "Hacha de Batalla", type: "weapon", damage: "1d8", desc: "Daño cortante pesado." },
  { id: "bow", name: "Arco Largo", type: "weapon", damage: "1d8", desc: "Rango 30m. Daño perforante." },
  { id: "staff", name: "Báculo Arcano", type: "weapon", damage: "1d6", desc: "+2 INT. Canaliza magia." },
  { id: "mace", name: "Maza", type: "weapon", damage: "1d6", desc: "Daño contundente sagrado." },
  { id: "shield", name: "Escudo", type: "armor", desc: "+2 CA. Protección básica." },
  { id: "leather", name: "Armadura de Cuero", type: "armor", desc: "+2 CA. Ligera y silenciosa." },
  { id: "potion_hp", name: "Poción de Vida", type: "consumable", desc: "Restaura 20 HP al usar." },
  { id: "potion_str", name: "Poción de Fuerza", type: "consumable", desc: "+4 STR por 1 hora." },
  { id: "antidote", name: "Antídoto", type: "consumable", desc: "Cura venenos y enfermedades." },
  { id: "torch", name: "Antorcha", type: "gift", desc: "Ilumina 6m. 1h de duración." },
  { id: "rope", name: "Cuerda", type: "gift", desc: "15m. Uso variado." },
  { id: "gem", name: "Gema Rara", type: "gift", desc: "Vende por 50 de oro." },
  { id: "ring_power", name: "Anillo del Poder", type: "gift", desc: "+5 a todos los ataques." },
  { id: "boots", name: "Botas de Rapidez", type: "armor", desc: "+2 DEX. +3m movimiento." },
  { id: "cloak", name: "Capa de Sombras", type: "armor", desc: "-2 a detectar sigilo." },
  { id: "map", name: "Mapa Antiguo", type: "gift", desc: "Revela mazmorra oculta." },
];

// Función segura de aleatoriedad
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

// POST /api/dice/roll  — tira un dado genérico { sides, count }
export function rollDice(req, res) {
  const { sides = 20, count = 1 } = req.body;

  if (sides < 2 || sides > 100 || count < 1 || count > 20) {
    return res.status(400).json({ error: "Parámetros de dado inválidos" });
  }

  const rolls = [];
  for (let i = 0; i < count; i++) {
    rolls.push(randomInt(1, sides));
  }
  const total = rolls.reduce((a, b) => a + b, 0);

  res.json({ sides, count, rolls, total, rolledBy: req.user.email });
}

// GET /api/dice/body-part — parte del cuerpo
export function rollBodyPart(req, res) {
    console.log(`🎲 [${req.user.email}] tiró dado de parte del cuerpo`);
  res.json({ result: pickRandom(BODY_PARTS), type: "body-part" });
}

// GET /api/dice/trap — trampa
export function rollTrap(req, res) {
    console.log(`🎲 [${req.user.email}] tiró dado de trampa`);
  res.json({ result: pickRandom(TRAPS), type: "trap" });
}

// GET /api/dice/gold — oro encontrado (2-30 monedas)
export function rollGold(req, res) {
    console.log(`🎲 [${req.user.email}] tiró dado de oro`);
  res.json({ result: randomInt(2, 30), type: "gold" });
}
// GET /api/dice/item — objeto aleatorio de la enciclopedia
export function rollItem(req, res) {
  console.log(`🎲 [${req.user.email}] tiró dado de objeto`);
  res.json({ result: pickRandom(ITEMS), type: "item" });
}