#!/usr/bin/env bash

# There is no Nix derivation for aws-sam-cli, so we need to install it manually.
# This is a workaround and not the Nix way to install dependencies.

set -euo pipefail

declare -r YELLOW='\033[33m'
declare -r ORANGE='\033[38;5;208m'
declare -r RED='\033[38;5;208m'
declare -r RESET='\033[0m'

REPO_ROOT=$(git rev-parse --show-toplevel)

if [ -f "$REPO_ROOT/.bin/aws-sam-cli/sam" ]; then
  echo -e "${YELLOW}[debug]✅ AWS SAM CLI is already installed.${RESET}"
  exit 0
fi

if [ ! -f /tmp/aws-sam-cli-macos.pkg ]; then
  echo -e "${ORANGE}[debug]🛠️ AWS SAM CLI installer download will start.${RESET}"
  curl -L -o /tmp/aws-sam-cli-macos.pkg \
    https://github.com/aws/aws-sam-cli/releases/download/v1.131.0/aws-sam-cli-macos-x86_64.pkg
  echo -e "${YELLOW}[debug]✅ AWS SAM CLI installer download did end.${RESET}"
else
  echo -e "${YELLOW}[debug]✅ AWS SAM CLI already downloaded.${RESET}"
fi

cat <<EOF > /tmp/install-aws-sam-cli.xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <array>
    <dict>
      <key>choiceAttribute</key>
      <string>customLocation</string>
      <key>attributeSetting</key>
      <string>$REPO_ROOT/.bin</string>
      <key>choiceIdentifier</key>
      <string>default</string>
    </dict>
  </array>
</plist>
EOF

mkdir -p "$REPO_ROOT"/.bin

echo -e "${ORANGE}[debug]🛠️ AWS SAM CLI installation will start.${RESET}"

installer -pkg /tmp/aws-sam-cli-macos.pkg \
  -target CurrentUserHomeDirectory \
  -applyChoiceChangesXML /tmp/install-aws-sam-cli.xml

exit_code=$?

echo -e "${YELLOW}[debug]✅ AWS SAM CLI installation did complete.${RESET}"

if [ $exit_code -eq 0 ]; then
  echo -e "${YELLOW}[debug]✅ AWS SAM CLI installation succeeded.${RESET}"
else
  echo -e "${RED}[debug]🔴 AWS SAM CLI installation failed.${RESET}"
fi
