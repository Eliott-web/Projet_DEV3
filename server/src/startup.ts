import packageJson from '../package.json';

export const displayBanner = () => {
    const date = new Date().toLocaleString();
    
    console.clear(); // Optionnel : Nettoie la console pour que ce soit propre
    console.log("==========================================");
    console.log(`  PROJET : ${packageJson.name.toUpperCase()}`);
    console.log(`  VERSION: ${packageJson.version}`);
    console.log(`  STATUS : En cours de développement 🛠️`);
    console.log(`  HEURE  : ${date}`);
    console.log("==========================================");
    console.log("🛰️  En attente de modifications...");
    console.log("");
};