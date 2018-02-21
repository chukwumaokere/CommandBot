#!/bin/bash 
# make-run.sh 
# make sure a process is always running.  
# Add the following to the crontab (i.e. crontab -e)
# */5 * * * * /home/cokere/nodeprojects/CommandBot/make-run.sh

process="node"
makerun="/home/cokere/nodeprojects/CommandBot/runjob.sh"

if ps ax | grep -v grep | grep $process > /dev/null         
then                 
  exit         
else         
  $makerun &
fi 
