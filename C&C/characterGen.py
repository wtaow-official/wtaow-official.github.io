import json
templateList = open("C&C/crew-template.txt", "r").readlines()
crewmembers = json.load(open("C&C/crewmembers.json", "r"))
unnecessaryData = [""]

templateString = ""
for line in templateList:
        templateString += line

print(templateString)


for char in crewmembers["Array"]:
        #if char == "angelbot_model_1-0":
        #        break
        outString = templateString
        character = crewmembers[char]
        output = open(f"C&C/{char}.html", "w")
        print(character)
        for value in character:
                print(value.upper())
                if value not in unnecessaryData:
                        if value == "image":
                                replacement = f"assets/{character[value]}"
                                outString = outString.replace(value.upper(), replacement)

                        elif value == "VA":
                                if not type(character[value]) == "<class list>":
                                        replacement = character[value].replace(" ", "-")
                                        outString = outString.replace("VA.html", replacement)
                                        replacement = character[value]
                                        outString = outString.replace(value.upper(), replacement)
                                        outString = outString.replace("vas", "VAs")
                                else:
                                        pass

                        else:
                                replacement = character[value]
                                outString = outString.replace(value.upper(), replacement)

                        print("Replaced")
                outString = outString.replace("\n                SCRIPT","")
        output.write(outString)
