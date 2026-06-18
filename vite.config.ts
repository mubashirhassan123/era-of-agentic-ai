import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig, type PluginOption } from "vite"

// The Kimi react-inspect plugin is an optional editor-only dev aid. Load it if
// it is installed, but don't let a missing/partial install block the dev server.
async function optionalInspectPlugin(): Promise<PluginOption[]> {
  try {
    const mod = await import('kimi-plugin-inspect-react')
    return [mod.inspectAttr()]
  } catch {
    return []
  }
}

// https://vite.dev/config/
// VITE_BASE is injected by the GitHub Actions deploy workflow so the built
// assets use the correct sub-path (/era-of-agentic-ai/) on GitHub Pages.
// Falls back to './' for local development.
export default defineConfig(async () => ({
  base: process.env.VITE_BASE ?? './',
  plugins: [...(await optionalInspectPlugin()), react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
