"""Tell IndexNow search engines (Bing, which also feeds ChatGPT search, Copilot and DuckDuckGo; Yandex; Seznam; Naver)
which pages changed, so they recrawl within minutes instead of weeks. Google does not use IndexNow; it reads sitemap.xml.

Usage: python .github/scripts/indexnow.py <before-commit>
Sends the pages whose HTML changed between <before-commit> and HEAD (all pages if the commit is unknown).
The key file <key>.txt in the site root proves the site owns this key."""
import glob, json, os, subprocess, sys, urllib.request

SITE = "https://sabbir0sojib.github.io/"
HOST = "sabbir0sojib.github.io"

keys = [f for f in glob.glob("*.txt") if len(f) == 36 and open(f).read().strip() == f[:-4]]
if not keys:
    sys.exit("No IndexNow key file found")
key = keys[0][:-4]

before = sys.argv[1] if len(sys.argv) > 1 else ""
files = []
if before and subprocess.run(["git", "cat-file", "-e", before], capture_output=True).returncode == 0:
    out = subprocess.run(["git", "diff", "--name-only", before, "HEAD", "--", ":(glob)*.html", ":(glob)maps/*.html"], capture_output=True, text=True).stdout
    files = [f for f in out.split() if os.path.exists(f)]
else:
    files = glob.glob("*.html") + glob.glob("maps/*.html")
skip = {"404.html"}
urls = sorted({SITE if f == "index.html" else SITE + f for f in files if f not in skip and not f.startswith("google")})
if not urls:
    print("No page changed; nothing to send.")
    sys.exit(0)

body = json.dumps({"host": HOST, "key": key, "keyLocation": f"{SITE}{key}.txt", "urlList": urls}).encode()
req = urllib.request.Request("https://api.indexnow.org/indexnow", data=body, headers={"Content-Type": "application/json; charset=utf-8"})
try:
    with urllib.request.urlopen(req, timeout=30) as r:
        print("IndexNow:", r.status, "for", len(urls), "pages")
except Exception as e:  # never fail the site build over a ping
    print("IndexNow ping did not go through:", e)
for u in urls:
    print(" ", u)
