import os
import re
from datetime import datetime
from collections import OrderedDict

rootDir = "adventures"
fileSet = set()
linkFiles = set()
orderedLinkFiles = {}
linksKey = 'links'
titleKey = 'title'

def list_files():
	for dir_, _, files in os.walk(rootDir):
	    for fileName in files:
	        relDir = os.path.relpath(dir_, rootDir)
	        relFile = os.path.join(relDir, fileName)
	        fileSet.add(relFile)

def extract_html():
	for fileName in fileSet:
		if ".html" in fileName	:
			linkFiles.add(rootDir + "/" + fileName)

def arrange_by_date():
	for linkFile in linkFiles:
		query = re.search('adventure-(.+?).html', linkFile)
		linkDate = datetime.strptime(query.group(1), '%Y%m%d').strftime("%Y-%m")

		try: 
			orderedLinkFiles[linkDate][linksKey].append(linkFile)
		except:
			linkObject = {}
			linkObject[titleKey] = datetime.strptime(query.group(1), '%Y%m%d').strftime("%B %Y")
			linkObject[linksKey] = []
			orderedLinkFiles[linkDate] = linkObject
			orderedLinkFiles[linkDate][linksKey].append(linkFile)

def write_links():
	linksTemplate = open('_includes/links.md', 'w')
	linkText = 'Link';
	for key in orderedLinkFiles:
		linksTemplate.write('\n')
		linksTemplate.write('### ' + orderedLinkFiles[key][titleKey] + '\n')
		for link in orderedLinkFiles[key][linksKey]:
			openFile = open(link, 'r')
			data = list(openFile)
			for line in data:
				query = re.search('<title>(.+?)</title>', line)
				if query:
					linkText = query.group(1)
			linksTemplate.write('- [' + linkText + '](' + link + ')\n')
	linksTemplate.close()

list_files()
extract_html()
arrange_by_date()
write_links()

