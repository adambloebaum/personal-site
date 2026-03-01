import { useEffect, useRef, useCallback } from "react";

type Variant = "starfield" | "constellation" | "topographic" | "matrix" | "voronoi";

/* ──────────────────────────────────────────────
   Shared canvas hook
   ────────────────────────────────────────────── */
function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, mouse: { x: number; y: number }) => void,
  init?: (w: number, h: number) => void
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const dims = useRef({ w: 0, h: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.round(rect.width);
      const height = Math.round(rect.height);
      if (!width || !height) return;
      if (width === Math.round(dims.current.w) && height === Math.round(dims.current.h)) {
        return;
      }
      dims.current.w = width;
      dims.current.h = height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init?.(width, height);
    };

    resize();

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => {
      mouse.current = { x: -9999, y: -9999 };
    };

    const frame = (t: number) => {
      const { w, h } = dims.current;
      ctx.clearRect(0, 0, w, h);
      draw(ctx, w, h, t, mouse.current);
      animId = requestAnimationFrame(frame);
    };

    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);
    animId = requestAnimationFrame(frame);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(animId);
    };
  }, [draw, init]);

  return canvasRef;
}

/* ──────────────────────────────────────────────
   1. Starfield (parallax depth + shooting stars)
   ────────────────────────────────────────────── */
function Starfield() {
  const stars = useRef<{ x: number; y: number; z: number; r: number }[]>([]);
  const shootingStars = useRef<
    { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[]
  >([]);

  const initFn = useCallback((w: number, h: number) => {
    stars.current = Array.from({ length: 300 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: Math.random(),
      r: Math.random() * 1.5 + 0.3,
    }));
  }, []);

  const drawFn = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, mouse: { x: number; y: number }) => {
      const time = t * 0.001;
      const mx = mouse.x > -999 ? (mouse.x / w - 0.5) * 30 : 0;
      const my = mouse.y > -999 ? (mouse.y / h - 0.5) * 20 : 0;

      for (let i = 0; i < 3; i++) {
        const nx = w * (0.2 + i * 0.3) + Math.sin(time * 0.3 + i * 2) * 40;
        const ny = h * (0.3 + i * 0.15) + Math.cos(time * 0.2 + i) * 30;
        const gr = ctx.createRadialGradient(nx, ny, 0, nx, ny, 200);
        gr.addColorStop(0, `rgba(55,185,145,${0.03 + Math.sin(time + i) * 0.01})`);
        gr.addColorStop(1, "rgba(55,185,145,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(nx, ny, 200, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const s of stars.current) {
        const speed = 0.05 + s.z * 0.15;
        s.y += speed;
        if (s.y > h + 10) {
          s.y = -10;
          s.x = Math.random() * w;
        }
        const px = s.x + mx * s.z;
        const py = s.y + my * s.z;
        const alpha = 0.2 + s.z * 0.5 + Math.sin(time * 2 + s.x) * 0.1;
        const size = s.r * (0.5 + s.z * 0.5);
        ctx.fillStyle = `rgba(200,230,220,${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (Math.random() < 0.005) {
        shootingStars.current.push({
          x: Math.random() * w,
          y: Math.random() * h * 0.3,
          vx: 3 + Math.random() * 4,
          vy: 1.5 + Math.random() * 2,
          life: 0,
          maxLife: 40 + Math.random() * 30,
        });
      }
      shootingStars.current = shootingStars.current.filter((s) => s.life < s.maxLife);
      for (const s of shootingStars.current) {
        s.x += s.vx;
        s.y += s.vy;
        s.life++;
        const alpha = Math.max(0, 1 - s.life / s.maxLife) * 0.6;
        ctx.strokeStyle = `rgba(200,240,220,${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.stroke();
      }
    },
    []
  );

  const ref = useCanvas(drawFn, initFn);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ──────────────────────────────────────────────
   2. Constellation (drift-fixed)
   ────────────────────────────────────────────── */
function Constellation() {
  const particles = useRef<
    { x: number; y: number; vx: number; vy: number; r: number; baseVx: number; baseVy: number }[]
  >([]);

  const initFn = useCallback((w: number, h: number) => {
    const count = Math.min(120, Math.floor((w * h) / 9000));
    particles.current = Array.from({ length: count }, () => {
      const vx = (Math.random() - 0.5) * 0.4;
      const vy = (Math.random() - 0.5) * 0.4;
      return {
        x: Math.random() * w, y: Math.random() * h,
        vx, vy, baseVx: vx, baseVy: vy,
        r: Math.random() * 2 + 0.8,
      };
    });
  }, []);

  const drawFn = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, _t: number, mouse: { x: number; y: number }) => {
      const pts = particles.current;
      const linkDist = 150;
      const mouseRadius = 140;

      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < mouseRadius && d > 0) {
          const f = ((mouseRadius - d) / mouseRadius) * 0.02;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.baseVx - p.vx) * 0.01;
        p.vy += (p.baseVy - p.vy) * 0.01;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w;
        if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h;
        if (p.y > h) p.y -= h;
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * 0.22;
            ctx.strokeStyle = `rgba(55,185,145,${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        const gr = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        gr.addColorStop(0, "rgba(55,200,155,0.25)");
        gr.addColorStop(1, "rgba(55,200,155,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(90,220,175,0.7)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );

  const ref = useCanvas(drawFn, initFn);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ──────────────────────────────────────────────
   3. Topographic Contour Lines
   ────────────────────────────────────────────── */
function Topographic() {
  const drawFn = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => {
      const time = t * 0.0003;
      const step = 6;
      const contourLevels = 12;
      const cols = Math.ceil(w / step) + 1;
      const rows = Math.ceil(h / step) + 1;
      const field: number[][] = [];

      for (let r = 0; r < rows; r++) {
        field[r] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * step;
          const y = r * step;
          field[r][c] =
            Math.sin(x * 0.008 + time) * Math.cos(y * 0.006 + time * 0.7) +
            Math.sin(x * 0.015 - time * 0.5 + y * 0.01) * 0.5 +
            Math.cos(y * 0.02 + x * 0.005 + time * 1.2) * 0.3;
        }
      }

      for (let level = 0; level < contourLevels; level++) {
        const threshold = -1.5 + (level * 3) / contourLevels;
        const alpha = 0.06 + (level % 3 === 0 ? 0.06 : 0);
        ctx.strokeStyle = `rgba(55,185,145,${alpha})`;
        ctx.lineWidth = level % 3 === 0 ? 1.2 : 0.6;
        ctx.beginPath();

        for (let r = 0; r < rows - 1; r++) {
          for (let c = 0; c < cols - 1; c++) {
            const tl = field[r][c] >= threshold ? 1 : 0;
            const tr = field[r][c + 1] >= threshold ? 1 : 0;
            const br = field[r + 1][c + 1] >= threshold ? 1 : 0;
            const bl = field[r + 1][c] >= threshold ? 1 : 0;
            const idx = tl * 8 + tr * 4 + br * 2 + bl;
            if (idx === 0 || idx === 15) continue;

            const x = c * step;
            const y = r * step;
            const interp = (a: number, b: number) => {
              const d = b - a;
              return Math.abs(d) < 0.001 ? 0.5 : (threshold - a) / d;
            };

            const top = x + interp(field[r][c], field[r][c + 1]) * step;
            const bottom = x + interp(field[r + 1][c], field[r + 1][c + 1]) * step;
            const left = y + interp(field[r][c], field[r + 1][c]) * step;
            const right = y + interp(field[r][c + 1], field[r + 1][c + 1]) * step;

            if (idx === 1 || idx === 14) { ctx.moveTo(x, left); ctx.lineTo(bottom, y + step); }
            else if (idx === 2 || idx === 13) { ctx.moveTo(bottom, y + step); ctx.lineTo(x + step, right); }
            else if (idx === 3 || idx === 12) { ctx.moveTo(x, left); ctx.lineTo(x + step, right); }
            else if (idx === 4 || idx === 11) { ctx.moveTo(top, y); ctx.lineTo(x + step, right); }
            else if (idx === 6 || idx === 9) { ctx.moveTo(top, y); ctx.lineTo(bottom, y + step); }
            else if (idx === 7 || idx === 8) { ctx.moveTo(x, left); ctx.lineTo(top, y); }
            else if (idx === 5) {
              ctx.moveTo(x, left); ctx.lineTo(top, y);
              ctx.moveTo(bottom, y + step); ctx.lineTo(x + step, right);
            } else if (idx === 10) {
              ctx.moveTo(top, y); ctx.lineTo(x + step, right);
              ctx.moveTo(x, left); ctx.lineTo(bottom, y + step);
            }
          }
        }
        ctx.stroke();
      }
    },
    []
  );

  const ref = useCanvas(drawFn);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ──────────────────────────────────────────────
   4. Matrix Rain (hex / technical chars)
   ────────────────────────────────────────────── */
const MATRIX_CHARS = "0123456789ABCDEFabcdef+-=<>{}[]|/\\&#%∑∂∫πΔλΩ→←↑↓≈≠∞";

function Matrix() {
  const columns = useRef<
    { x: number; chars: { y: number; char: string; speed: number; alpha: number }[] }[]
  >([]);

  const initFn = useCallback((w: number, h: number) => {
    const colWidth = 18;
    const numCols = Math.ceil(w / colWidth);
    columns.current = Array.from({ length: numCols }, (_, i) => ({
      x: i * colWidth + colWidth / 2,
      chars:
        Math.random() > 0.4
          ? Array.from({ length: Math.floor(Math.random() * 15) + 5 }, () => ({
              y: Math.random() * h,
              char: MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)],
              speed: 0.3 + Math.random() * 0.8,
              alpha: Math.random() * 0.3 + 0.05,
            }))
          : [],
    }));
  }, []);

  const drawFn = useCallback(
    (ctx: CanvasRenderingContext2D, _w: number, h: number) => {
      ctx.font = "13px JetBrains Mono, monospace";
      for (const col of columns.current) {
        for (const ch of col.chars) {
          ch.y += ch.speed;
          if (ch.y > h + 20) {
            ch.y = -20;
            ch.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          }
          if (Math.random() < 0.005) {
            ch.char = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          }
          ctx.fillStyle = `rgba(55,200,155,${ch.alpha})`;
          ctx.fillText(ch.char, col.x, ch.y);
        }
      }
    },
    []
  );

  const ref = useCanvas(drawFn, initFn);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ──────────────────────────────────────────────
   5. Voronoi / Delaunay Mesh
   ────────────────────────────────────────────── */
function VoronoiMesh() {
  const points = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);

  const initFn = useCallback((w: number, h: number) => {
    const count = Math.min(80, Math.floor((w * h) / 15000));
    points.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  const triangulate = (pts: { x: number; y: number }[], w: number, h: number) => {
    const superPts = [
      { x: -w, y: -h },
      { x: 2 * w, y: -h },
      { x: w / 2, y: 3 * h },
    ];
    const allPts = [...pts, ...superPts];
    const si = pts.length;
    let tris: [number, number, number][] = [[si, si + 1, si + 2]];

    const circumscribes = (tri: [number, number, number], p: { x: number; y: number }) => {
      const [a, b, c] = tri.map((i) => allPts[i]);
      const ax = a.x - p.x, ay = a.y - p.y;
      const bx = b.x - p.x, by = b.y - p.y;
      const cx = c.x - p.x, cy = c.y - p.y;
      return (
        (ax * ax + ay * ay) * (bx * cy - cx * by) -
        (bx * bx + by * by) * (ax * cy - cx * ay) +
        (cx * cx + cy * cy) * (ax * by - bx * ay) > 0
      );
    };

    for (let i = 0; i < pts.length; i++) {
      const bad: [number, number, number][] = [];
      for (const tri of tris) {
        if (circumscribes(tri, pts[i])) bad.push(tri);
      }
      const edges: [number, number][] = [];
      for (const tri of bad) {
        const e: [number, number][] = [[tri[0], tri[1]], [tri[1], tri[2]], [tri[2], tri[0]]];
        for (const edge of e) {
          const shared = bad.some(
            (other) => other !== tri && other.includes(edge[0]) && other.includes(edge[1])
          );
          if (!shared) edges.push(edge);
        }
      }
      tris = tris.filter((t) => !bad.includes(t));
      for (const [a, b] of edges) tris.push([a, b, i]);
    }

    return tris.filter((tri) => tri.every((i) => i < si));
  };

  const drawFn = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number, _t: number, mouse: { x: number; y: number }) => {
      const pts = points.current;
      const mouseRadius = 160;

      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < mouseRadius && d > 0) {
          const f = ((mouseRadius - d) / mouseRadius) * 0.015;
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx *= 0.99;
        p.vy *= 0.99;
        if (Math.abs(p.vx) < 0.08) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.08) p.vy += (Math.random() - 0.5) * 0.02;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x += w + 40;
        if (p.x > w + 20) p.x -= w + 40;
        if (p.y < -20) p.y += h + 40;
        if (p.y > h + 20) p.y -= h + 40;
      }

      const tris = triangulate(pts, w, h);
      for (const [a, b, c] of tris) {
        const pa = pts[a], pb = pts[b], pc = pts[c];
        const area = Math.abs((pb.x - pa.x) * (pc.y - pa.y) - (pc.x - pa.x) * (pb.y - pa.y)) / 2;
        if (area > 40000) continue;
        ctx.strokeStyle = `rgba(55,185,145,${Math.max(0.04, 0.15 - area / 40000)})`;
        ctx.lineWidth = 0.6;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.lineTo(pc.x, pc.y);
        ctx.closePath();
        ctx.stroke();
      }

      for (const p of pts) {
        ctx.fillStyle = "rgba(90,220,175,0.5)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    },
    []
  );

  const ref = useCanvas(drawFn, initFn);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/* ──────────────────────────────────────────────
   Exported component
   ────────────────────────────────────────────── */
const variantMap: Record<Variant, React.FC> = {
  starfield: Starfield,
  constellation: Constellation,
  topographic: Topographic,
  matrix: Matrix,
  voronoi: VoronoiMesh,
};

const AnimatedBackground = ({ variant }: { variant: Variant }) => {
  const Bg = variantMap[variant];
  return (
    <div className="absolute inset-0 z-0">
      <Bg />
    </div>
  );
};

export default AnimatedBackground;
