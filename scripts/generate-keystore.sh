#!/bin/bash

# Script to generate a keystore for Android
# Usage: ./generate-keystore.sh [keystore_name] [alias] [password]

KEYSTORE_NAME=${1:-"srma24-release.keystore"}
ALIAS=${2:-"srma24-key"}
PASSWORD=${3:-"srma24password"}

echo "Generating keystore: $KEYSTORE_NAME"
echo "Alias: $ALIAS"

keytool -genkey -v -keystore "$KEYSTORE_NAME" \
  -alias "$ALIAS" \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000 \
  -storepass "$PASSWORD" \
  -keypass "$PASSWORD" \
  -dname "CN=SRMA 24, OU=Kediri, O=SRMA, L=Kediri, ST=Jawa Timur, C=ID"

echo "--------------------------------------------------"
echo "Keystore generated successfully: $KEYSTORE_NAME"
echo "--------------------------------------------------"
echo "IMPORTANT: Keep this file safe and do not lose the password!"
echo "You will need to upload this to GitHub Secrets for signed builds."
