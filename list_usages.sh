#!/bin/bash

# Colors

RED="\033[91m"
GREEN="\033[92m"
BLUE="\033[94m"
NC="\033[0m"


# Setting work dir to the script dir

workDir=${0%/*}
cd ${workDir}


# Linking files

libs=$(find . -type f -a -not -name relink.sh -a -not -name *package*.json -a -not -name .git)

for lib in ${libs}; do
	libName=${lib##*/}
	echo -e Found library ${GREEN}${libName}${NC}. Looking for usages...

	usages=$(find ../ -name ${libName} -a -not -path "../lib*" -a -not -path "*node_modules*")
	echo -e Found library usages: ${BLUE}${usages}${NC}.

	echo 

done

