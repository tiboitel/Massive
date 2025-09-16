class ColorsHelper {
    getColorGradient(range, color1, color2) {
        var colorscheme = [0x37E2D5, 0xC70A80];
      
        // Extract RGB components of each color
        var r1 = (color1 >> 16) & 0xFF;
        var g1 = (color1 >> 8) & 0xFF;
        var b1 = color1 & 0xFF;
      
        var r2 = (color2 >> 16) & 0xFF;
        var g2 = (color2 >> 8) & 0xFF;
        var b2 = color2 & 0xFF;
      
        // Calculate the intermediate color
        var r = Math.round(r1 + (r2 - r1) * range);
        var g = Math.round(g1 + (g2 - g1) * range);
        var b = Math.round(b1 + (b2 - b1) * range);
      
        // Convert RGB components to hexadecimal
        var hex = ((r << 16) | (g << 8) | b);
      
        return '0x' + hex.toString(16).padStart(6, '0').toUpperCase();      
      }
}

export default ColorsHelper;
