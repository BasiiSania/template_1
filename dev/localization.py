#!/usr/bin/env python3

# The source (be translated) file must have lines order same as traslations pairs are in the json file. So it works as some check-test for you also.

import json
import os.path as path


realPath = path.realpath(__file__)
dirPath = path.dirname(realPath)

def main():
    with open(path.abspath(path.join(dirPath,"localization.json"))) as dt:
        replacing_pairs = json.load(dt)

    rusHtml = open(path.abspath(path.join(dirPath,"../rus.html")),'w')
    sr = open(path.abspath(path.join(dirPath,"../index.html")), 'r')
    source = sr.read()
    sr.close()
    #filedata = sr.read()
    #printline
    #printlinecounter = 0
    #a,b = replacing_pairs[0]
    #print(a,b)
    #print(replacing_pairs[0:5])
    #return

    #print(replacing_pairs)#print_pairs(replacing_pairs, 10)
    #         /printline
    NEED_next_pair = True
    for line in source.splitlines():
    #printline
    #    if printlinecounter<10:
    #        print('line:', line); printlinecounter += 1
    #          /printline
        if len(replacing_pairs) > 0:
            if NEED_next_pair:
                orig, to = replacing_pairs.pop(0)
                NEED_next_pair = False
            if orig in line:
                line = line.replace(orig, to)
                NEED_next_pair = True 
        rusHtml.write(line)
    rusHtml.close()
    print_pairs(replacing_pairs, 1)

def print_pairs(p1_pairs, p2_cntr):
    if len(p1_pairs)>0:
        for key, val in p1_pairs:
            print(key[:75],"-->", val[:75])
            p2_cntr -= 1
            if p2_cntr==0: print("..."); break
            
main()

