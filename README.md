This repo contains slides and the demo application I presented at French Touch Dreamin' 19.

Slides: FTD19-LWC_UI-API.pdf

Demo: 
This is a standard Salesforce DX project - be sure to have Salesforce CLI in place and an authenticated DevHub

Installation:
checkout repo locally and navigate into the main folder
create a default scratch org: sfdx force:org:create -s -a ftd-demo -f ./config/project-scratch-def.json 
push source: sfdx force:source:push
assign permission: sfdx force:user:permset:assign -n accountSpecialDetails
open scratch org