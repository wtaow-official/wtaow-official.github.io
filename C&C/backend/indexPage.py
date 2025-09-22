import json
crewmembers = json.load(open("C&C/backend/crewmembers.json", "r"))
unnecessaryData = [""]

outString = ""
output = open("C&C/backend/index.txt", "w")
for crew in crewmembers["Array"]:
        if crew == "mr-sane":
                title = "Mr Sane"
        else:
                name = crew
                title = name.capitalize()
        outString += f'''
                        <div class = 'tile {name}' onclick = "link('{name}.html')">
                                <a class = 'image' id = "{name}" href="{name}.html" tabindex="0"></a>
                                <a>{title}<span class = "mobile"><br></span></a>
                        </div>
'''
output.write(outString)