import { CollisionPlugin } from "../CollisionResolver";

import projectileDestroy from "./projectileDestroy";

const registeredPlugins: CollisionPlugin[] = [projectileDestroy];

export default registeredPlugins;
