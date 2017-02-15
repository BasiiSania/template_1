#!/usr/bin/env python3
import json
import os.path as path

realPath = path.realpath(__file__)
dirPath = path.dirname(realPath)

with open(path.abspath(path.join(dirPath,"localization.json"))) as dt:
    replacing_txts = json.load(dt)

ruIndexHtml = open(path.abspath(path.join(dirPath,"../rus.html")),'w')
sr = open(path.abspath(path.join(dirPath,"../index.html")), 'r')
source = sr.read()
sr.close()
#filedata = sr.read()
#printline
#printlinecounter = 0
#         /printline
for line in source.splitlines():
#printline
#    if printlinecounter<10:
#        print('line:', line); printlinecounter += 1
#          /printline
    #YES = False
    for orig in replacing_txts:
        if orig in line:
            line = line.replace(orig, replacing_txts[orig])
            #print('replacing_txts[orig]:', replacing_txts[orig])
            del replacing_txts[orig]
            #YES = True
            break
    #if YES: print('line:', line)
    ruIndexHtml.write(line)
ruIndexHtml.close()
if len(replacing_txts)>0:
    print('Mistake appeared! Untreplaced items listed below.')
    for key, val in replacing_txts.items():
        print(key[:75],"-->", val[:75])


