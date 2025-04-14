import json
templateList = open("characters/character-template.txt", "r").readlines()
characters = json.load(open("characters/characters.json", "r"))
unnecessaryData = ["class", ""]

templateString = ""
for line in templateList:
        templateString += line

print(templateString)


for char in characters["Array"]:
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
                                if str(type(character[value])) != "<class 'list'>":
                                        replacement = character[value].replace(" ", "-").lower() + ".html"
                                        outString = outString.replace("VA.html", replacement)
                                        replacement = character[value]
                                        outString = outString.replace(value.upper(), replacement)
                                else:
                                        VAlistLines = ""
                                        anchorPrefab = '''                                                        <a href="../C&C/VA.html">VA</a>\n'''
                                        for VA in character[value]:
                                                tempLine = anchorPrefab
                                                replacement = VA.replace(" ", "-").lower() + ".html"
                                                tempLine = tempLine.replace("VA.html", replacement)
                                                replacement = VA
                                                tempLine = tempLine.replace(value.upper(), replacement)
                                                VAlistLines += tempLine
                                        print(VAlistLines)
                                        outString = outString.replace(anchorPrefab, VAlistLines)



                        else:
                                replacement = character[value]
                                outString = outString.replace(value.upper(), replacement)

                        print("Replaced")
                outString = outString.replace("\n                SCRIPT","")
                outString = outString.replace("�","o")
        output.write(outString)
