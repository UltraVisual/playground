#!/usr/bin/python

import sys
import os
from distutils.dir_util import copy_tree

# usage python create.py adventures/april-2017/ 20170415 'Playing with fire'

src = '_templates/'
date = sys.argv[2]
dst =  sys.argv[1]
title = sys.argv[3]

def copy_files():
	copy_tree(src, dst)
	parse_files()

def parse_files():
	openFile = open(dst + 'adventure-template.html', 'r')
	file_str = openFile.read()
	file_str = file_str.replace('<% title %>', title).replace('<% date %>', date)
	openFile = open(dst + 'adventure-template.html', 'w')
	openFile.write(file_str)
	os.rename(dst + 'adventure-template.html', dst + 'adventure-' + date + '.html')
	os.rename(dst + 'adventureTemplate.js', dst + 'adventure' + date + '.js')

copy_files()