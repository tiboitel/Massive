const WavePatterns = {
  line(scene, count) {
    const positions = [];
    const width = scene.sys.game.config.width;
    const spacing = 64;
    const startX = (width - spacing * count) / 2;

    for (let i = 0; i < count; i++) {
      positions.push({
        x: startX + i * spacing,
        y: -32 // spawn just above the screen
      });
    }
    return positions;
  },

  v(scene, count) {
    const positions = [];
    const width = scene.sys.game.config.width;
    const startX = width / 2;
    const spacing = 64;

    for (let i = 0; i < count; i++) {
      const offset = (i - Math.floor(count / 2)) * spacing;
      positions.push({
        x: startX + offset,
        y: -32 - Math.abs(offset)
      });
    }
    return positions;
  },

  cross(scene, count) {
    const positions = [];
    const width = scene.sys.game.config.width;
    const height = scene.sys.game.config.height;

    // Simple cross: vertical + horizontal
    for (let i = 0; i < count; i++) {
      positions.push({ x: width / 2, y: -32 - i * 32 });
      positions.push({ x: i * (width / count), y: -32 });
    }
    return positions.slice(0, count); // trim if too many
  }
};

export default WavePatterns;

