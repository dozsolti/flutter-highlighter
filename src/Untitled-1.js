// prefix:
/Padding\(.+?(?=child)/gis

|(Column|Row)

((Padding|Center|Expanded|Container)\(.+?(?=child)child:\s*)|
((Column|Row)\(.+?(?=children)children:[^[]*)|
((Scaffold)\(.+?(?=appBar)appBar:\s*)
