import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function extractAssets() {
  const outputDir = path.resolve('public/images');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('Extracting Hero 3D Bowl from target_design_hero.png...');
  const heroPath = path.resolve('public/images/target_design_hero.png');
  const fullPagePath = path.resolve('public/images/target_full_page.png');

  // 1. Crop 3D Hero Bowl from the 1024x613 hero screenshot
  // The bowl is situated on the right half of the image
  await sharp(heroPath)
    .extract({ left: 420, top: 60, width: 600, height: 540 })
    .toFile(path.join(outputDir, 'hero-3d-bowl-exact.png'));

  console.log('Extracting Category Cards from target_full_page.png...');
  // 2. Crop 5 Category Food Items
  // Dimensions of fullPage: 485 x 1024
  // Categories are around y: 390-480
  await sharp(fullPagePath)
    .extract({ left: 25, top: 390, width: 80, height: 80 })
    .toFile(path.join(outputDir, 'cat_breakfast.png'));

  await sharp(fullPagePath)
    .extract({ left: 115, top: 390, width: 80, height: 80 })
    .toFile(path.join(outputDir, 'cat_lunch.png'));

  await sharp(fullPagePath)
    .extract({ left: 205, top: 390, width: 80, height: 80 })
    .toFile(path.join(outputDir, 'cat_dinner.png'));

  await sharp(fullPagePath)
    .extract({ left: 295, top: 390, width: 80, height: 80 })
    .toFile(path.join(outputDir, 'cat_snacks.png'));

  await sharp(fullPagePath)
    .extract({ left: 385, top: 390, width: 80, height: 80 })
    .toFile(path.join(outputDir, 'cat_desserts.png'));

  console.log('Extracting Popular Recipes...');
  // 3. Crop 4 Popular Recipe images around y: 535-620
  await sharp(fullPagePath)
    .extract({ left: 20, top: 535, width: 105, height: 80 })
    .toFile(path.join(outputDir, 'recipe_pasta.png'));

  await sharp(fullPagePath)
    .extract({ left: 133, top: 535, width: 105, height: 80 })
    .toFile(path.join(outputDir, 'recipe_ramen.png'));

  await sharp(fullPagePath)
    .extract({ left: 247, top: 535, width: 105, height: 80 })
    .toFile(path.join(outputDir, 'recipe_pancakes.png'));

  await sharp(fullPagePath)
    .extract({ left: 360, top: 535, width: 105, height: 80 })
    .toFile(path.join(outputDir, 'recipe_buddha.png'));

  console.log('Extracting AI Robot Chef Banner & Tips...');
  // 4. Crop AI Robot
  await sharp(fullPagePath)
    .extract({ left: 250, top: 680, width: 220, height: 110 })
    .toFile(path.join(outputDir, 'ai_robot_scene.png'));

  // 5. Crop 3 Handy Cooking Tips
  await sharp(fullPagePath)
    .extract({ left: 22, top: 825, width: 60, height: 60 })
    .toFile(path.join(outputDir, 'tip_clock.png'));

  await sharp(fullPagePath)
    .extract({ left: 167, top: 825, width: 60, height: 60 })
    .toFile(path.join(outputDir, 'tip_knife.png'));

  await sharp(fullPagePath)
    .extract({ left: 317, top: 825, width: 60, height: 60 })
    .toFile(path.join(outputDir, 'tip_steak.png'));

  // 6. Crop Stats 3D Icons
  await sharp(fullPagePath)
    .extract({ left: 30, top: 290, width: 65, height: 50 })
    .toFile(path.join(outputDir, 'stat_book.png'));

  await sharp(fullPagePath)
    .extract({ left: 168, top: 290, width: 65, height: 50 })
    .toFile(path.join(outputDir, 'stat_plate.png'));

  await sharp(fullPagePath)
    .extract({ left: 320, top: 290, width: 65, height: 50 })
    .toFile(path.join(outputDir, 'stat_brain.png'));

  console.log('All exact 3D assets extracted successfully!');
}

extractAssets().catch(err => {
  console.error('Error slicing assets:', err);
});
