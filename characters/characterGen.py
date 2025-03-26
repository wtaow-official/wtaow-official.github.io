import json
templateList = open("characters/character-template.txt", "r").readlines()
characters = json.load(open("characters/characters.json", "r"))
unnecessaryData = ["class", ""]

templateString = ""
for line in templateList:
        templateString += line

print(templateString)


for char in characters["Array"]:
        #if char == "angelbot_model_1-0":
        #        break
        outString = templateString
        character = characters[char]
        output = open(f"characters/{char}.html", "w")
        print(character)
        for value in character:
                print(value.upper())
                if value not in unnecessaryData:
                        if value == "image":
                                replacement = f"assets/{character[value]}"
                                outString = outString.replace(value.upper(), replacement)

                        elif value == "VA":
                                replacement = character[value].replace(" ", "-")
                                outString = outString.replace("VA.html", replacement)
                                replacement = character[value]
                                outString = outString.replace(value.upper(), replacement)
                                outString = outString.replace("vas", "VAs")

                        else:
                                replacement = character[value]
                                outString = outString.replace(value.upper(), replacement)

                        print("Replaced")
        output.write(outString)
