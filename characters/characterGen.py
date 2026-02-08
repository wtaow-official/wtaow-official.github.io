import json, time
from tqdm import trange
templateList:list[str] = open("characters/character-template.txt", "r").readlines()
characters:dict = json.load(open("characters/characters.json", "r"))
crewmembers:dict = json.load(open("C&C/backend/crewmembers.json",))

unnecessaryData = ["class", "generate"]
matroyshkaData = ["age"]
rootVariables = ["page-colour", "text-colour", "highlight"]
prefabs = {
        "styleTab": "\n                                "
}

templateString = ""
for line in templateList:
        templateString += line

# print(templateString)


for i in trange(len(characters.keys()), desc="Character Pages", leave=True):
        char = list(characters.keys())[i]
        outString = templateString
        character = characters[char]
        if not character["generate"]:
                continue
        output = open(f"characters/{char}.html", "w")
        # print(f"\n{character}\n")
        for j in trange(len(character.keys()), desc=f"{character["title"]}", leave=False):
                value = list(character.keys())[j]
                if value not in unnecessaryData:
                        if value == "image":
                                replacement = f"'assets/{character[value]}'"
                                outString = outString.replace(value.upper(), replacement)

                        elif value in matroyshkaData:
                                replacement = ">" + character[value]
                                outString = outString.replace(">" + value.upper(), replacement)

                        elif character[value] == "default":
                                replacement = ""
                                outString = outString.replace(f"{prefabs["styleTab"]}--{value}: {value.upper()};", replacement)


                        elif value == "VA":
                                if isinstance(character[value],str):
                                        replacement = character[value] + ".html" if character[value] != "VA" else "va.html"
                                        outString = outString.replace("VA.html", replacement)

                                        replacement = character[value] if character[value]=="VA" else crewmembers[character[value]]["title"]
                                        outString = outString.replace(value.upper(), replacement)
                                else:
                                        VAlistLines = ""
                                        anchorPrefab = '''                                                        <a href="../C&C/VA.html">VA</a>\n'''
                                        for VA in character[value]:
                                                tempLine = anchorPrefab
                                                replacement = VA + ".html"
                                                tempLine = tempLine.replace("VA.html", replacement)
                                                replacement = crewmembers[VA]["title"]
                                                tempLine = tempLine.replace(value.upper(), replacement)
                                                VAlistLines += tempLine
                                        # print(VAlistLines)
                                        outString = outString.replace(anchorPrefab, VAlistLines)



                        else:
                                replacement = character[value]
                                outString = outString.replace(value.upper(), replacement)

                        # print("Replaced")
                outString = outString.replace("�","o")
        outString = outString.replace("\n                SCRIPT","")
        output.write(outString)
        time.sleep(0.01)           
