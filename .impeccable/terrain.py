# Builds assets/img/terrain.svg, the topographic background of the green bands:
# contour lines and soft elevation bands of the Chittagong Hill Tracts, Bangladesh.
# Elevation: SRTM via Mapzen Terrain Tiles on AWS Open Data (terrarium PNG, zoom 11).
# Run: pip install numpy matplotlib scipy pillow && python3 .impeccable/terrain.py assets/img/terrain.svg
import os, urllib.request
import numpy as np, math, sys
from PIL import Image

def fetch_mosaic(z=11, W=91.6, E=92.8, S=21.9, N=23.0, cache="/tmp/terrain-tiles"):
    os.makedirs(cache, exist_ok=True)
    tx = lambda lon: (lon + 180) / 360 * 2**z
    def ty(lat):
        r = math.radians(lat); return (1 - math.log(math.tan(r) + 1 / math.cos(r)) / math.pi) / 2 * 2**z
    x0, x1, y0, y1 = int(tx(W)), int(tx(E)), int(ty(N)), int(ty(S))
    m = np.zeros(((y1 - y0 + 1) * 256, (x1 - x0 + 1) * 256), dtype=np.float32)
    for x in range(x0, x1 + 1):
        for y in range(y0, y1 + 1):
            f = f"{cache}/{z}_{x}_{y}.png"
            if not os.path.exists(f):
                urllib.request.urlretrieve(f"https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png", f)
            a = np.asarray(Image.open(f).convert("RGB")).astype(np.float32)
            m[(y - y0) * 256:(y - y0 + 1) * 256, (x - x0) * 256:(x - x0 + 1) * 256] = a[..., 0] * 256 + a[..., 1] + a[..., 2] / 256 - 32768
    return m, (z, x0, y0)

import matplotlib; matplotlib.use("Agg")
import matplotlib.pyplot as plt
from scipy.ndimage import gaussian_filter

W,E,S,N = 91.85, 92.85, 22.16, 22.58
SIGMA = 4.6
FILLS = [(90, "#123F27"), (240, "#15462C"), (450, "#194E31")]
LINE_STEP = 75
TOL = 1.1
OUT = sys.argv[1]

m,(z,x0,y0)=fetch_mosaic(); m=np.clip(m,0,None)
def px_x(lon): return ((lon+180)/360*2**z - x0)*256
def px_y(lat):
    r=math.radians(lat); return ((1-math.log(math.tan(r)+1/math.cos(r))/math.pi)/2*2**z - y0)*256
a=m[int(px_y(N)):int(px_y(S)), int(px_x(W)):int(px_x(E))]
a=gaussian_filter(a,SIGMA)
h,w=a.shape

def rdp(pts,eps):
    if len(pts)<3: return pts
    st=[(0,len(pts)-1)]; keep=np.zeros(len(pts),bool); keep[0]=keep[-1]=True
    while st:
        i,j=st.pop()
        if j<=i+1: continue
        p,q=pts[i],pts[j]; d=q-p; n=math.hypot(*d)
        seg=pts[i+1:j]
        dist=np.abs(d[0]*(seg[:,1]-p[1])-d[1]*(seg[:,0]-p[0]))/n if n else np.hypot(*(seg-p).T)
        k=int(np.argmax(dist))
        if dist[k]>eps: keep[i+1+k]=True; st+=[(i,i+1+k),(i+1+k,j)]
    return pts[keep]

def pathd(segs, closed):
    out=[]
    for s in segs:
        s=rdp(np.asarray(s),TOL)
        if len(s)<3 or (not closed and math.hypot(*(s[-1]-s[0]))<4 and len(s)<6): continue
        c=[f"{x:.1f} {y:.1f}" for x,y in s]
        out.append("M"+"L".join(c)+("Z" if closed else ""))
    return "".join(out)

fig,ax=plt.subplots()
parts=[]
for lvl,col in FILLS:
    cs=ax.contourf(a,levels=[lvl,1e5])
    segs=[]
    for p in cs.get_paths():
        for poly in p.to_polygons(): segs.append(poly)
    parts.append(f'<path fill="{col}" d="{pathd(segs,True)}"/>')
lines=ax.contour(a,levels=list(range(LINE_STEP,1600,LINE_STEP)))
segs=[]
for p in lines.get_paths():
    for poly in p.to_polygons(closed_only=False): segs.append(poly)
parts.append(f'<path fill="none" stroke="#FFFFFF" stroke-opacity="0.1" stroke-width="1" vector-effect="non-scaling-stroke" d="{pathd(segs,False)}"/>')
svg=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" preserveAspectRatio="xMaxYMid slice">'
     f'<!-- Chittagong Hill Tracts, Bangladesh ({W} to {E} E, {S} to {N} N). Elevation: SRTM via Mapzen Terrain Tiles, AWS Open Data. Contours every {LINE_STEP} m. -->'
     + "".join(parts) + "</svg>")
open(OUT,"w").write(svg)
print(OUT, len(svg)//1024, "KB", w, h)
