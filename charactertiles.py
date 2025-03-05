names = ["griffon", "kit", "lettia", "maria", "marissa", "medusa", "milo", "owen", "sophia", "thea"]

for name in names:
        #print(f".tile.{name}"+" .image{background-image: image-set('"f"assets/{name}.png'"+");}")
        print(f"<div class = 'tile {name}' onclick = 'link('{name}.html')'><a class = 'image'></a><a>{name.capitalize()}</a></div>")