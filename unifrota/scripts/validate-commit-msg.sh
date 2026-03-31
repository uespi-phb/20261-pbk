#!/bin/bash
#
# This script validates commit messages to comply to
# Git Conventional Commits
#
# It should be copied to .git/hooks directory of each
# git repository
#
minlen=10
message=$(cat "$1")

normal="\033[0m"
red="\033[0;31m"
yellow="\033[1;33m"
green="\033[0;32m"
white="\033[1;97m"
grey="\033[0;37m"

regex='^(chore|docs|feat|fix|refactor|test): ([a-z].*[^.])$'

if ! [[ "$message" =~ $regex ]]; then
  echo
  echo -e "${red}####################################"
  echo -e "${red}#    Invalid Git Commit Message    #"
  echo -e "${red}####################################"
  echo
  echo -e "Your commit message was rejected because it does not follow the expected format."
  echo
  echo -e "${white}commit message: ${red}${message}"
  echo -e "${white}correct format: ${green}<type>: <subject>"
  echo
  echo -e "${yellow}type:"
  echo -e "${yellow}  ${green}feat     ${grey}A new feature."
  echo -e "${yellow}  ${green}fix      ${grey}A bug fix."
  echo -e "${yellow}  ${green}docs     ${grey}Documentation only changes."
  echo -e "${yellow}  ${green}refactor ${grey}A code change that neither fixes a bug nor adds a feature."
  echo -e "${yellow}  ${green}test     ${grey}Adding missing tests or correcting existing ones."
  echo -e "${yellow}  ${green}chore    ${grey}Changes to build process or auxiliary tooling."
  echo
  exit 1
fi

subject="${message#*: }"

if [ "${#subject}" -lt "$minlen" ]; then
  echo
  echo -e "${red}Commit subject too short.${normal}"
  echo -e "${grey}Minimum length: ${green}${minlen}${grey} characters"
  echo
  exit 1
fi

exit 0
