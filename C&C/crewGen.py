import json
templateList = open("C&C/crew-template.txt", "r").readlines()
crewmembers = json.load(open("C&C/crewmembers.json", "r"))
unnecessaryData = [""]

templateString = ""
for line in templateList:
        templateString += line
print(templateString)
prefabs = {
        "role":['''                                                        ''','''<a href = "../roles.html#ROLE">ROLE</a>,\n'''],
        "aboutTab":"                                    <br>",
        "titleCard": "<a class = 'titleCard' style='width:100%'></a>"
}
elements = ["css", "script", ""]


for crew in crewmembers["Array"]:
        outString = templateString
        crewmember = crewmembers[crew]
        output = open(f"C&C/{crew}.html", "w")
        print(crewmember)
        for value in crewmember:
                print(value.upper())
                if value not in unnecessaryData:
                        if value == "titleCard":
                                if crewmember[value] == True:
                                        titleLine = '''<h1 style = "margin-top:0; font-size: 28px;">TITLE</h1>'''
                                        outString = outString.replace(titleLine, prefabs["titleCard"])
                        elif value == "roles":
                                lines = ""
                                for role in crewmember[value]:
                                        line = ""
                                        if role == crewmember[value][0]:
                                                line = prefabs["role"][1]
                                        else:
                                                line = prefabs["role"][0] + prefabs["role"][1]
                                                #if role == crewmember["roles"][2]:
                                                #        line = line[:-1]
                                        line = line.replace("ROLE", role.lower(), 1)
                                        line = line.replace("ROLE", role, 1)
                                        lines += line
                                outString = outString.replace(value.upper(), lines)
                        elif value == "about":
                                lines = ""
                                for line in crewmember[value]:
                                        x = 0
                                        for character in line:
                                                characterLink = ""
                                                if character == "{":
                                                        while line[x] != "}":
                                                                characterLink += line[x]
                                                                x += 1
                                                        characterLink += line[x]
                                                        line = line.replace(characterLink, f"<a href='../characters/{characterLink[1:-1]}.html'>{characterLink[1:-1]}</a>")
                                                x += 1
                                        if line in crewmember[value][1:]:
                                                line = prefabs["aboutTab"] + line
                                        if line != crewmember[value][-1]:
                                                line += "\n"
                                        lines += line
                                outString = outString.replace(value.upper(), lines)
                        elif value == "socials":
                                pass
                        else:
                                replacement = crewmember[value]
                                outString = outString.replace(value.upper(), replacement)

        for element in elements:
                outString = outString.replace(element.upper(), "")
        output.write(outString)
