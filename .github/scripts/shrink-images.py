"""Shrink images uploaded through Pages CMS so the website stays fast.

Usage: python shrink-images.py [image paths...]
JPG and PNG become WebP (the original is removed and every reference in
content/*.json and *.html is updated). Big WebP files are re-encoded in place.
Images are fitted inside MAX x MAX pixels, which is still sharp for "View full size".
"""
import pathlib
import re
import sys

from PIL import Image, ImageOps

MAX = 2400
QUALITY = 82
KEEP = {"assets/img/sabbir-portrait.jpg", "assets/img/share-card.jpg"}  # link preview images must stay JPG

renamed = {}
for arg in sys.argv[1:]:
    path = pathlib.Path(arg)
    rel = path.as_posix()
    ext = path.suffix.lower()
    if rel in KEEP or not path.is_file() or ext not in {".jpg", ".jpeg", ".png", ".webp"}:
        continue
    before = path.stat().st_size
    with Image.open(path) as im:
        im = ImageOps.exif_transpose(im)
        big = max(im.size) > MAX
        if ext == ".webp" and not big and before < 1_500_000:
            continue
        im.thumbnail((MAX, MAX), Image.LANCZOS)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGBA" if "A" in im.getbands() or "transparency" in im.info else "RGB")
        out = path.with_suffix(".webp")
        n = 1
        while out != path and out.exists():
            out = path.with_name(f"{path.stem}-{n}.webp")
            n += 1
        im.save(out, "WEBP", quality=QUALITY, method=6)
    if out != path:
        path.unlink()
        renamed[rel] = out.as_posix()
    print(f"{rel}: {before // 1024} KB -> {out.as_posix()} {out.stat().st_size // 1024} KB")

# Point content and pages at the new file names. This also repairs entries saved
# later that still name the original upload (Pages CMS saves the image first and
# the entry afterwards), by switching any missing JPG/PNG to its WebP twin.
def newest_twin(p):
    """The WebP made from p most recently: name.webp, or name-1.webp, name-2.webp... when an older
    upload with the same name was converted first (the loop above takes the next free number)."""
    twin, n = None, 0
    cand = p.with_suffix(".webp")
    while cand.exists():
        twin = cand
        n += 1
        cand = p.with_name(f"{p.stem}-{n}.webp")
    return twin

files = list(pathlib.Path("content").glob("*.json")) + list(pathlib.Path(".").glob("*.html"))
ref = re.compile(r"assets/img/[^\"'\s]+?\.(?:jpe?g|png)", re.IGNORECASE)
for f in files:
    text = f.read_text(encoding="utf-8")
    new = text
    for old, rep in renamed.items():
        new = new.replace(old, rep)
    for m in set(ref.findall(new)):
        twin = newest_twin(pathlib.Path(m))
        if twin and not pathlib.Path(m).exists():
            new = new.replace(m, twin.as_posix())
    if new != text:
        f.write_text(new, encoding="utf-8")
        print(f"updated {f}")
