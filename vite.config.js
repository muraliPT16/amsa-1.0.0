import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

// Function to generate the expanded gallery JSON
function generateExpandedGallery() {
  const srcPath = path.resolve(__dirname, 'src/data/gallery.json');
  const destPath = path.resolve(__dirname, 'src/data/gallery.expanded.json');

  if (!fs.existsSync(srcPath)) {
    return;
  }

  try {
    const rawData = fs.readFileSync(srcPath, 'utf8');
    const albums = JSON.parse(rawData);

    const expandedAlbums = albums.map(album => {
      let images = [];

      if (typeof album.images === 'string') {
        const relativeFolder = album.images;
        const physicalFolder = path.join(__dirname, 'public', relativeFolder);

        if (fs.existsSync(physicalFolder) && fs.statSync(physicalFolder).isDirectory()) {
          const files = fs.readdirSync(physicalFolder);
          const imageExtensions = /\.(jpe?g|png|gif|svg|webp|bmp|tiff|heic)$/i;

          images = files
            .filter(file => imageExtensions.test(file))
            .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
            .map(file => {
              // Ensure URL matches forward slash formatting
              return `${relativeFolder.replace(/\/$/, '')}/${file}`;
            });
        } else {
          console.warn(`[Gallery Plugin] Folder not found: ${physicalFolder}`);
        }
      } else if (Array.isArray(album.images)) {
        images = album.images;
      }

      let coverImage = album.coverImage;
      if (!coverImage && images.length > 0) {
        coverImage = images[0];
      }

      return {
        ...album,
        coverImage,
        images
      };
    });

    fs.writeFileSync(destPath, JSON.stringify(expandedAlbums, null, 2), 'utf8');
    console.log('[Gallery Plugin] Successfully generated gallery.expanded.json');
  } catch (error) {
    console.error('[Gallery Plugin] Error generating expanded gallery:', error);
  }
}

// Run it once immediately when the config is loaded
generateExpandedGallery();

function galleryWatcherPlugin() {
  return {
    name: 'gallery-watcher-plugin',
    configureServer(server) {
      const srcPath = path.resolve(__dirname, 'src/data/gallery.json');
      const galleryImagesPath = path.resolve(__dirname, 'public/images/gallery');

      const onChange = () => {
        generateExpandedGallery();
        server.ws.send({ type: 'full-reload' });
      };

      server.watcher.add([srcPath, galleryImagesPath]);
      server.watcher.on('add', (filePath) => {
        if (filePath.startsWith(galleryImagesPath) || filePath === srcPath) {
          onChange();
        }
      });
      server.watcher.on('unlink', (filePath) => {
        if (filePath.startsWith(galleryImagesPath) || filePath === srcPath) {
          onChange();
        }
      });
      server.watcher.on('change', (filePath) => {
        if (filePath === srcPath) {
          onChange();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss(), galleryWatcherPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
