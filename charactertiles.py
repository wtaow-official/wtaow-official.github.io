names = ["fireboa", "bloom", "jade", "kirachi", "aurora", "tookie", "mrSane", "owen", "sophia", "thea"]

for name in names:
        #print(f".tile.{name}"+" .image{background-image: image-set('"f"assets/{name}.png'"+");}")
        print(f"<div class = 'tile {name}' onclick = 'link('{name}.html')'>\n<a class = 'image'></a>\n<a>{name.capitalize()}</a>\n</div>")